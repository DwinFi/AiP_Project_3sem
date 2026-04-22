const API_URL = 'http://localhost:3000/api'

function getToken() {
  return localStorage.getItem('token')
}

function authHeaders(isJson = true) {
  const headers = {}

  const token = getToken()
  if (token) {
    headers['x-auth-token'] = token
  }

  if (isJson) {
    headers['Content-Type'] = 'application/json'
  }

  return headers
}

async function handleResponse(res) {
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.message || 'Request error')
  }
  return data
}

export default {
  getToken,

  async register(email, password) {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ email, password })
    })
    return await handleResponse(res)
  },

  async login(email, password) {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ email, password })
    })
    return await handleResponse(res)
  },

  async getAds() {
    const res = await fetch(`${API_URL}/ads`)
    return await handleResponse(res)
  },

  async getAd(id) {
    const res = await fetch(`${API_URL}/ads/${id}`)
    return await handleResponse(res)
  },

  async getMyAds() {
    const res = await fetch(`${API_URL}/ads/my`, {
      headers: authHeaders(false)
    })
    return await handleResponse(res)
  },

  async createAd(formData) {
    const res = await fetch(`${API_URL}/ads`, {
      method: 'POST',
      headers: authHeaders(false),
      body: formData
    })
    return await handleResponse(res)
  },

  async updateAd(id, payload) {
    const res = await fetch(`${API_URL}/ads/${id}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(payload)
    })
    return await handleResponse(res)
  },

  async getOrders() {
    const res = await fetch(`${API_URL}/orders`, {
      headers: authHeaders(false)
    })
    return await handleResponse(res)
  },

  async createOrder(order) {
    const res = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(order)
    })
    return await handleResponse(res)
  },

  async updateOrderStatus(id, done) {
    const res = await fetch(`${API_URL}/orders/${id}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify({ done })
    })
    return await handleResponse(res)
  }
}