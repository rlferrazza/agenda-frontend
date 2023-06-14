<template>
  <div class="align-center border-right md-12 mh-6">
    <div class="align-center md-12 mh-2">
      <Title msg="Bem vindo, novamente!" />
      <Subtitle msg="insira suas credenciais para acessar a plataforma" />
    </div>
  </div>

  <div class="align-center md-12 mh-12">
    <div class="formInputs align-center md-6 mh-4">
      <input
        class="md-12 mh-3 input"
        autocomplete="off"
        v-model="username"
        type="text"
        placeholder="usuário"
      />

      <input
        class="md-12 mh-3 input"
        autocomplete="off"
        v-model="password"
        type="password"
        placeholder="senha"
      />

      <div class="md-12 checkbox">
        <input v-model="rememberMe" type="checkbox" />
        <label for="remember">Lembrar-me</label>
      </div>

      <button
        :disabled="!isValid"
        :class="{ 'link hint--bottom': !isValid, link: isValid }"
        aria-label="Antes de continuar, preencha os campos acima!"
        name="submit"
        @click="userLogin"
      ></button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import Title from '@/components/Title.vue'
import Subtitle from '@/components/Subtitle.vue'
import store from '@/auth'

let urlLogin
let token
let userId
urlLogin = 'https://demometaway.vps-kinghost.net:8485/api/auth/login'
let jsonData

export default {
  components: { Subtitle, Title },
  data() {
    return {
      username: '',
      password: '',
      rememberMe: false
    }
  },
  computed: {
    isValid() {
      return this.username !== '' && this.password !== '' && this.password.length >= 8
    }
  },
  mounted() {
    const savedUsername = localStorage.getItem('username')
    const savedPassword = localStorage.getItem('password')
    const savedRememberMe = localStorage.getItem('rememberMe')

    if (savedUsername && savedPassword) {
      this.username = savedUsername
      this.password = savedPassword
    }

    if (savedRememberMe) {
      this.rememberMe = savedRememberMe === 'true'
    }
  },
  methods: {
    userLogin() {
      if (this.rememberMe) {
        localStorage.setItem('username', this.username.toString())
        localStorage.setItem('password', this.password.toString())
        localStorage.setItem('rememberMe', this.rememberMe.toString())
      } else {
        localStorage.removeItem('username')
        localStorage.removeItem('password')
        localStorage.removeItem('rememberMe')
      }

      jsonData = {
        username: this.username.toString(),
        password: this.password.toString()
      }

      axios
        .post(urlLogin, jsonData)
        .then((response) => {
          if (response.status === 200) {
            token = response.data.accessToken
            userId = response.data.id
            const userRole = response.data.tipo
            const payload = { token, userId, userRole }
            store.dispatch('login', payload)

            let timerInterval
            Swal.fire({
              title: 'Redirecionando para a página inicial. Bem vindo!',
              html: 'a página carregará automáticamente.',
              timer: 500,
              timerProgressBar: true,
              didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                  b.textContent = Swal.getTimerLeft()
                }, 500)
              },
              willClose: () => {
                clearInterval(timerInterval - 1000)
              }
            }).then((result) => {
              console.log(result)
            })
            this.$router.push('/home')
          }
        })
        .catch((error) => {
          console.log(error.response.status)
          if (error.response.status === 401) {
            Swal.fire('Oops!', 'Credenciais inválidas. Verifique-as novamente!', 'error')
          } else if (error.response.status === 403) {
            Swal.fire('Oops!', 'Algo deu errado! Entre em contato com o suporte.', 'warning')
          }
          return
        })
    }
  }
}
</script>

<style scoped>
.formInputs input {
  border: 0.5px solid lightgray !important;
  transition: 0.5s;
  box-sizing: border-box;
  outline: none;
}

.formInputs input:hover {
  border: 1.5px solid gray !important;
  transition: 0.5s;
}

.formInputs input:focus-visible {
  transition: 0.5s;
  border: 1.5px solid gray !important;
}

.formInputs button {
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
  border: 15px solid transparent;
  background-image: url('../components/icons/login.svg');
  background-repeat: no-repeat;
  margin-top: 1rem;
}

.formInputs .checkbox input {
  margin-right: 0.5rem;
  display: block;
  min-width: 1.5rem;
  min-height: 1.5rem;
  margin-left: 0.2rem;
}

.formInputs .checkbox input {
  margin-right: 0.5rem;
  display: block;
  min-width: 1.5rem;
  min-height: 1.5rem;
  margin-left: 0.2rem;
}

.checkbox {
  display: flex;
  align-items: center;
  color: gray;
  border-color: gray;
  font-size: 1rem;
  justify-content: flex-start;
  flex-wrap: nowrap;
  transition: 0.5s;
}

.checkbox:hover {
  color: #000000a8;
  transition: 0.5s;
}
</style>
