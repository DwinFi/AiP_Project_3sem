<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" lg="6">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark>
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <v-form v-model="valid" ref="form" validate-on="input">
              <v-text-field
                prepend-icon="mdi-account"
                label="Email"
                type="email"
                v-model="email"
                :rules="emailRules"
              ></v-text-field>

              <v-text-field
                prepend-icon="mdi-lock"
                label="Password"
                type="password"
                v-model="password"
                :rules="passwordRules"
              ></v-text-field>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              @click="onSubmit"
              :disabled="!valid || loading"
              :loading="loading"
            >
              Login
            </v-btn>
          </v-card-actions>
        </v-card>

        <v-snackbar
          v-model="snackbar"
          color="error"
          timeout="3000"
        >
          {{ errorMessage }}
        </v-snackbar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from '@/api'

export default {
  data() {
    return {
      email: '',
      password: '',
      valid: false,
      loading: false,
      snackbar: false,
      errorMessage: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Password must be more or equal than 6 characters'
      ]
    }
  },
  methods: {
    async onSubmit() {
      const result = await this.$refs.form.validate()
      if (!result.valid) return

      this.loading = true

      try {
        const data = await api.login(this.email, this.password)

        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        window.dispatchEvent(new Event('auth-changed'))

        this.$router.push('/')
      } catch (error) {
        this.errorMessage = error.message
        this.snackbar = true
      } finally {
        this.loading = false
      }
    }
  }
}
</script>