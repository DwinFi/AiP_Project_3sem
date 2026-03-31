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
                name="email"
                label="Email"
                type="email"
                v-model="email"
                :rules="emailRules"
              ></v-text-field>

              <v-text-field
                prepend-icon="mdi-lock"
                name="password"
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
          :model-value="!!error"
          color="error"
          timeout="3000"
          @update:modelValue="closeError"
        >
          {{ error }}
        </v-snackbar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      valid: false,
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
  computed: {
    loading() {
      return this.$store.getters.loading
    },
    error() {
      return this.$store.getters.error
    }
  },
  methods: {
    async onSubmit() {
      const result = await this.$refs.form.validate()

      if (result.valid) {
        const user = {
          email: this.email,
          password: this.password
        }

        try {
          await this.$store.dispatch('loginUser', user)

          this.email = ''
          this.password = ''
          this.$refs.form.resetValidation()

          this.$router.push('/')
        } catch (e) {
          // Ошибка уже положена в store, snackbar покажется сам
        }
      }
    },
    closeError(value) {
      if (!value) {
        this.$store.dispatch('clearError')
      }
    }
  }
}
</script>