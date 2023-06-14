<template>
  <div class="modal-content">
    <h3 class="title">Meu perfil</h3>
    <div class="inputInfoPhoto">
      <label for="fotor">Foto</label>
      <input id="foto" name="foto" type="file" />
    </div>
    <div class="inputInfo">
      <div class="inputInfo-left">
        <label for="nome">Nome</label>
        <input id="nome" type="text" v-model="nome" />

        <label for="nomeUsuario">Nome de usuário</label>
        <input id="nomeUsuario" type="text" v-model="username" />

        <label for="dtNascimento">Data de nascimento</label>
        <input
          v-model="dtNascimento"
          id="dataNascimento"
          class="input"
          type="text"
          placeholder="dd/mm/yyyy"
          v-mask="['##/##/####']"
        />
      </div>
      <div class="inputInfo-right">
        <label for="email">E-mail</label>
        <input id="email" placeholder="contato@contato.com" type="text" v-model="email" />

        <label for="telefone">Número para contato</label>
        <input
          v-model="tel"
          id="telefone"
          class="input"
          type="tel"
          placeholder="(00) 1234-5678"
          v-mask="['(##) ####-####', '(##) #####-####']"
        />

        <label for="cpf">CPF</label>
        <input
          v-model="cpf"
          id="cpf"
          class="input"
          type="text"
          placeholder="000.000.000-00"
          v-mask="['###.###.###-##']"
        />
      </div>
    </div>
    <div class="inputPassword">
      <h3>Gerenciar senha</h3>
      <div>
        <label for="actualpassword">Senha atual</label>
        <input v-model="actualpassword" id="actualpassword" class="input" type="password" />

        <label for="newpassword">Nova senha</label>
        <input v-model="newpassword" id="newpassword" class="input" type="password" />

        <label for="confirmnewpassword">Confirmar nova senha</label>
        <input v-model="confirmnewpassword" id="confirmnewpassword" class="input" type="password" />
      </div>
    </div>
    <div class="actionSaveBtns">
      <button @click="saveProfile" id="salvar">Salvar</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import store from '@/auth'
import Swal from 'sweetalert2'

const base_url = 'https://demometaway.vps-kinghost.net:8485'
let token
let userId
let userRole

export default {
  name: 'Profile',
  methods: {
    getAuthInfo() {
      token = store.state.token
      userId = store.state.userId
      userRole = store.state.userRole
    },
    validatePassword() {
      return this.newpassword === this.confirmnewpassword
    },
    saveProfile() {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }

      const updateProfileAPI = base_url + '/api/usuario/atualizar'

      if (this.newpassword && this.confirmnewpassword) {
        if (this.validatePassword()) {
          const jsonUpdatePassword = {
            newPassword: this.newpassword,
            password: this.actualpassword,
            username: this.username
          }

          Swal.fire({
            title: 'Em desenvolvimento...',
            html: 'Aguarde'
          })

          return

          // Inicio chamada att senha
          // axios
          //   .post(`${base_url}/api/usuario/alterarSenha`, jsonUpdatePassword, { headers })
          //   .then((response) => {
          //     console.log(response)
          //   })
          //   .catch((response) => {
          //     console.log(response)
          //   })
        } else {
          Swal.fire({
            title: 'Senhas não conferem!',
            html: 'Verifique-as novamente.'
          })
          return
        }
      }

      Swal.fire({
        title: 'Em desenvolvimento...',
        html: 'Aguarde'
      })
      return

      const jsonUpdateUserInfo = {
        id: userId,
        cpf: this.cpf,
        telefone: this.tel,
        email: this.email,
        dataNascimento: this.dtNascimento,
        username: this.username,
        nome: this.nome
      }

      // Inicio chamada att dados cadastrais
      // Swal.fire({
      //   title: 'Você será deslogado!',
      //   html: 'Deseja continuar?.',
      //   confirmButtonText: 'Sim',
      //   cancelButtonText: 'Cancelar',
      //   showCancelButton: true,
      //   showLoaderOnConfirm: true
      // }).then((result) => {
      //   if (result.isConfirmed) {
      //     axios
      //       .put(`${base_url}/api/usuario/atualizar`, jsonUpdateUserInfo, { headers })
      //       .then(() => {
      //         let timerInterval
      //         Swal.fire({
      //           title: 'Você será deslogado!',
      //           html: 'efetuando logoff',
      //           timer: 500,
      //           timerProgressBar: true,
      //           didOpen: () => {
      //             Swal.showLoading()
      //             const b = Swal.getHtmlContainer().querySelector('b')
      //             timerInterval = setInterval(() => {
      //               b.textContent = Swal.getTimerLeft()
      //             }, 500)
      //           },
      //           willClose: () => {
      //             clearInterval(timerInterval - 1000)
      //           }
      //         }).then(() => {
      //           this.$route.push('/')
      //         })
      //       })
      //       .catch(() => {
      //         let timerInterval
      //         Swal.fire({
      //           title: 'Oops! Algo de errado aconteceu...',
      //           html: 'efetuando logoff',
      //           timer: 500,
      //           timerProgressBar: true,
      //           didOpen: () => {
      //             Swal.showLoading()
      //             const b = Swal.getHtmlContainer().querySelector('b')
      //             timerInterval = setInterval(() => {
      //               b.textContent = Swal.getTimerLeft()
      //             }, 500)
      //           },
      //           willClose: () => {
      //             clearInterval(timerInterval - 1000)
      //           }
      //         }).then(() => {
      //           this.$route.push('/')
      //         })
      //       })
      //   } else if (result.isDismissed) {
      //     Swal.fire('As mudanças não foram salvas.', '', 'info')
      //   }
      // })
    },
    getProfileData() {
      this.getAuthInfo()
      const urlProfileAPI = base_url + `/api/usuario/buscar/${userId}`
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }

      axios
        .get(urlProfileAPI, { headers: headers })
        .then((response) => {
          const user = response.data.object.usuario
          this.cpf = user.cpf.toString()
          this.tel = user.telefone.toString()
          this.email = user.email.toString()
          this.dtNascimento = user.dataNascimento.toString()
          this.username = user.username.toString()
          this.nome = user.nome.toString()
        })
        .catch((error) => {
          console.error('Erro:', error.response.status)
        })
    }
  },
  mounted() {
    this.getProfileData()
  },
  data() {
    return {
      nome: '',
      dtNascimento: '',
      actualpassword: '',
      tel: '',
      email: '',
      username: '',
      password: '',
      newpassword: '',
      confirmnewpassword: ''
    }
  }
}
</script>

<style scoped>
.inputPassword div input {
  width: 100%;
  height: 3rem;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  border-radius: 10px;
  border: 1px solid lightgray;
  padding-left: 1rem;
}

.inputPassword div {
  width: 100%;
  padding-left: 1rem;
  height: fit-content;
  display: flex;
  flex-wrap: wrap;
  align-items: self-start;
  justify-content: flex-start;
}

.inputPassword {
  width: 100%;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: start;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.inputPassword h3 {
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.actionSaveBtns button {
  width: 40%;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: 1px solid lightgray;
  color: white;
}

#salvar {
  background: #3e8e41;
}

.actionSaveBtns {
  width: 25%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: fit-content;
  float: right;
}

input[type='file'] {
  border: none !important;
  margin-top: 0.8rem;
}

.title {
  width: 100%;
}

.inputInfo-left,
.inputInfo-right {
  width: 100%;
  height: fit-content;
  padding-left: 2%;
  display: flex;
  flex-wrap: wrap;
  align-items: self-start;
  justify-content: flex-start;
}

.inputInfo-left input,
.inputInfo-right input,
.inputInfo-left select {
  width: 100%;
  height: 3rem;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  border-radius: 10px;
  border: 1px solid lightgray;
  padding-left: 1rem;
}

.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0 0 0 / 31%);
  z-index: 9999;
}

.modal-content {
  width: fit-content;
  height: fit-content;
  background-color: #fff;
  padding: 2rem;
}

.inputInfoPhoto label {
  width: 100%;
}

.inputInfo {
  width: 100%;
  display: grid;
  grid-auto-flow: column;
}

.inputInfoPhoto {
  width: 100%;
  padding-left: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: start;
  align-items: center;
}

button:active {
  background-color: #3e8e41;
  box-shadow: 0 5px transparent;
  transform: translateY(2px);
}

#att img {
  width: 2rem;
}

.title {
  width: 100%;
  margin-bottom: 2%;
}
</style>
