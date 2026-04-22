require('dotenv').config({ path: './server/.env' })

const express = require('express')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const { ObjectId } = require('mongodb')

const connectDB = require('./db')
const auth = require('./middleware/auth')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

const uploadsDir = path.join(__dirname, 'uploads')
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir)
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname)
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1e9) + ext)
  }
})

const upload = multer({ storage })

app.get('/', (req, res) => {
  res.send('MotoSalon API with MongoDB is running')
})

async function ensureIndexes() {
  const db = await connectDB()
  await db.collection('users').createIndex({ email: 1 }, { unique: true })
}

async function seedAds() {
  const db = await connectDB()
  const adsCount = await db.collection('ads').countDocuments()

  if (adsCount === 0) {
    await db.collection('ads').insertMany([
      {
        title: 'Indian Chief Vintage ABS Remus',
        desc: 'Премиальный круизер с мощным двигателем.',
        promo: true,
        src: `http://localhost:${PORT}/uploads/indian-chief.jpg`,
        userId: 'seed-user',
        createdAt: new Date()
      },
      {
        title: 'Мотоцикл OXO VENOM 300 (GN-050)',
        desc: 'Надёжный городской мотоцикл с отличной динамикой.',
        promo: true,
        src: `http://localhost:${PORT}/uploads/oxo-venom-300.png`,
        userId: 'seed-user',
        createdAt: new Date()
      },
      {
        title: 'BMW RnineT Scrambler',
        desc: 'Стильный scrambler с классическим дизайном.',
        promo: true,
        src: `http://localhost:${PORT}/uploads/bmw-rninet-scrambler.jpg`,
        userId: 'seed-user',
        createdAt: new Date()
      },
      {
        title: 'Питбайк TMBK PITSTER SP2 125 (17/14) Orange/Purple',
        desc: 'Компактный питбайк для бездорожья и тренировок.',
        promo: true,
        src: `http://localhost:${PORT}/uploads/pitbike-tmbk.jpg`,
        userId: 'seed-user',
        createdAt: new Date()
      }
    ])
  }
}

app.post('/api/auth/register', async (req, res) => {
  try {
    const db = await connectDB()
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email и пароль обязательны' })
    }

    const existingUser = await db.collection('users').findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'Пользователь уже существует' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const result = await db.collection('users').insertOne({
      email,
      password: hashedPassword,
      createdAt: new Date()
    })

    const user = {
      id: result.insertedId.toString(),
      email
    }

    const token = jwt.sign(user, process.env.JWT_SECRET)

    res.json({ token, user })
  } catch (error) {
    console.error('REGISTER ERROR:', error)
    res.status(500).json({ message: 'Ошибка регистрации' })
  }
})

app.post('/api/auth/login', async (req, res) => {
  try {
    const db = await connectDB()
    const { email, password } = req.body

    const user = await db.collection('users').findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Неверный email или пароль' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Неверный email или пароль' })
    }

    const payload = {
      id: user._id.toString(),
      email: user.email
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET)

    res.json({ token, user: payload })
  } catch (error) {
    console.error('LOGIN ERROR:', error)
    res.status(500).json({ message: 'Ошибка логина' })
  }
})

app.get('/api/ads', async (req, res) => {
  try {
    const db = await connectDB()
    const ads = await db.collection('ads').find().sort({ createdAt: -1 }).toArray()

    res.json(
      ads.map(ad => ({
        ...ad,
        _id: ad._id.toString()
      }))
    )
  } catch (error) {
    console.error('GET ADS ERROR:', error)
    res.status(500).json({ message: 'Ошибка получения мотоциклов' })
  }
})

app.get('/api/ads/my', auth, async (req, res) => {
  try {
    const db = await connectDB()
    const ads = await db
      .collection('ads')
      .find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .toArray()

    res.json(
      ads.map(ad => ({
        ...ad,
        _id: ad._id.toString()
      }))
    )
  } catch (error) {
    console.error('GET MY ADS ERROR:', error)
    res.status(500).json({ message: 'Ошибка получения моих мотоциклов' })
  }
})

app.get('/api/ads/:id', async (req, res) => {
  try {
    const db = await connectDB()

    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Неверный id мотоцикла' })
    }

    const ad = await db.collection('ads').findOne({ _id: new ObjectId(req.params.id) })

    if (!ad) {
      return res.status(404).json({ message: 'Мотоцикл не найден' })
    }

    res.json({
      ...ad,
      _id: ad._id.toString()
    })
  } catch (error) {
    console.error('GET AD ERROR:', error)
    res.status(500).json({ message: 'Ошибка получения мотоцикла' })
  }
})

app.post('/api/ads', auth, upload.single('image'), async (req, res) => {
  try {
    const db = await connectDB()
    const { title, desc, promo } = req.body

    if (!title || !desc) {
      return res.status(400).json({ message: 'Название и описание обязательны' })
    }

    const src = req.file
      ? `http://localhost:${PORT}/uploads/${req.file.filename}`
      : ''

    const result = await db.collection('ads').insertOne({
      title,
      desc,
      promo: promo === 'true',
      src,
      userId: req.user.id,
      createdAt: new Date()
    })

    const newAd = await db.collection('ads').findOne({ _id: result.insertedId })

    res.json({
      ...newAd,
      _id: newAd._id.toString()
    })
  } catch (error) {
    console.error('CREATE AD ERROR:', error)
    res.status(500).json({ message: 'Ошибка создания мотоцикла' })
  }
})

app.put('/api/ads/:id', auth, async (req, res) => {
  try {
    const db = await connectDB()
    const { title, desc } = req.body

    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Неверный id мотоцикла' })
    }

    const ad = await db.collection('ads').findOne({ _id: new ObjectId(req.params.id) })

    if (!ad) {
      return res.status(404).json({ message: 'Мотоцикл не найден' })
    }

    if (ad.userId !== req.user.id) {
      return res.status(403).json({ message: 'Нет прав на редактирование' })
    }

    await db.collection('ads').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { title, desc } }
    )

    const updated = await db.collection('ads').findOne({ _id: new ObjectId(req.params.id) })

    res.json({
      ...updated,
      _id: updated._id.toString()
    })
  } catch (error) {
    console.error('UPDATE AD ERROR:', error)
    res.status(500).json({ message: 'Ошибка обновления мотоцикла' })
  }
})

app.get('/api/orders', auth, async (req, res) => {
  try {
    const db = await connectDB()
    const orders = await db
      .collection('orders')
      .find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .toArray()

    res.json(
      orders.map(order => ({
        ...order,
        _id: order._id.toString()
      }))
    )
  } catch (error) {
    console.error('GET ORDERS ERROR:', error)
    res.status(500).json({ message: 'Ошибка получения заказов' })
  }
})

app.post('/api/orders', auth, async (req, res) => {
  try {
    const db = await connectDB()
    const { name, phone, adId } = req.body

    const result = await db.collection('orders').insertOne({
      name,
      phone,
      adId,
      userId: req.user.id,
      done: false,
      createdAt: new Date()
    })

    const order = await db.collection('orders').findOne({ _id: result.insertedId })

    res.json({
      ...order,
      _id: order._id.toString()
    })
  } catch (error) {
    console.error('CREATE ORDER ERROR:', error)
    res.status(500).json({ message: 'Ошибка создания заказа' })
  }
})

app.put('/api/orders/:id', auth, async (req, res) => {
  try {
    const db = await connectDB()
    const { done } = req.body

    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Неверный id заказа' })
    }

    await db.collection('orders').updateOne(
      { _id: new ObjectId(req.params.id), userId: req.user.id },
      { $set: { done: !!done } }
    )

    const order = await db.collection('orders').findOne({ _id: new ObjectId(req.params.id) })

    if (!order) {
      return res.status(404).json({ message: 'Заказ не найден' })
    }

    res.json({
      ...order,
      _id: order._id.toString()
    })
  } catch (error) {
    console.error('UPDATE ORDER ERROR:', error)
    res.status(500).json({ message: 'Ошибка обновления заказа' })
  }
})

async function start() {
  try {
    await connectDB()
    await ensureIndexes()
    await seedAds()

    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('START ERROR:', error)
    process.exit(1)
  }
}

start()