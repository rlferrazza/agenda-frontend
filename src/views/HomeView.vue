<template>
  <VueSidebarMenuAkahon
    :isMenuOpen="true"
    menuTitle="Agenda"
    :menuItems="[
      { link: '/home', name: 'Início', tooltip: 'inicio', icon: 'bx-building-house' },
      { link: '/profile', name: 'Meu cadastro', tooltip: 'perfil', icon: 'bxs-user-account' },
      { link: '/users', name: 'Usuários', tooltip: 'usuarios', icon: 'bx-group' },
      { link: '/group', name: 'Pessoas', tooltip: 'inicio', icon: 'bx-user' },
      { link: '/contacts', name: 'Contatos', tooltip: 'inicio', icon: 'bxs-contact' },
      { link: '/logff', name: 'Sair', tooltip: 'sair', icon: 'bx-log-out' }
    ]"
    :isSearch="false"
    profileName=""
    :isExitButton="false"
    profileRole="Rodrigo Luan Ferrazza"
  />
  <div class="contacts">
    <div class="searchbar align-center">
      <input
        type="text"
        id="searchInput"
        v-model="input"
        placeholder="Por quem você procura hoje? Faça sua busca"
      />
    </div>
    <div class="contactList">
      <h1 class="title">Contatos</h1>

      <div class="geralList">
        <div class="subtitle">
          <h3>Geral</h3>
          <div class="actionBtns">
            <button @click="updateContactsList" data-hint="atualizar" class="hint--bottom" id="att">
              <img src="../assets/img/update.png" />
            </button>
            <button id="add" @click="openModal" data-hint="adicionar novo" class="hint--bottom">
              add +
            </button>
          </div>
        </div>
        <contactListItem />
      </div>

      <div class="favList">
        <h3 class="subtitle">Favoritos</h3>
      </div>
    </div>
  </div>

  <div class="modal" id="add-modal">
    <div class="modal-content">
      <h3 class="title">Adicionar novo</h3>
      <div class="inputInfo">
        <div class="inputInfo-left">
          <label for="fotor">Foto</label>
          <input id="foto" name="foto" type="file" />

          <label for="nomeUsuario">Nome</label>
          <input id="nomeUsuario" type="text" v-model="nome" />

          <label for="email">E-mail</label>
          <input id="email" placeholder="contato@contato.com" type="text" v-model="email" />

          <label for="formaContato">Forma de contato</label>
          <select id="formaContato" data-hint="form" v-model="formaContato">
            <option value="1">celular</option>
            <option value="2">telefone</option>
            <option value="3">e-mail</option>
          </select>
        </div>
        <div class="inputInfo-right">
          <label for="tel">Número para contato</label>
          <input
            v-model="tel"
            id="tel"
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

          <label for="dtNascimento">Data de nascimento</label>
          <input
            v-model="dtNascimento"
            id="dtNascimento"
            class="input"
            type="text"
            placeholder="dd/mm/yyyy"
            v-mask="['##/##/####']"
          />
        </div>
      </div>

      <h3 class="title">Endereço</h3>
      <div class="inputInfo">
        <div class="inputInfo-left">
          <label for="pais">País</label>
          <input v-model="pais" id="pais" class="input" type="text" />

          <label for="logradouro">Rua</label>
          <input v-model="rua" id="logradouro" class="input" type="text" />

          <label for="bairro">Bairro</label>
          <input v-model="bairro" id="bairro" class="input" type="text" />
        </div>
        <div class="inputInfo-right">
          <label for="estado">Estado</label>
          <input v-model="estado" id="estado" class="input" type="text" />

          <label for="cidade">Cidade</label>
          <input v-model="cidade" id="cidade" class="input" type="text" />

          <label for="cep">CEP</label>
          <input v-model="cep" id="cep" class="input" type="text" />
        </div>
      </div>

      <div class="actionSaveCancelBtns">
        <button @click="addContact" id="salvar">Salvar</button>
        <button @click="fecharModal" id="cancelar">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script>
import VueSidebarMenuAkahon from 'vue-sidebar-menu-akahon'
import contactListItem from '../components/contactListItem.vue'
import axios from 'axios'
import { mask } from 'vue-the-mask'
import store from '@/auth'

let jsonPhotoData
let jsonAddressData
let jsonPeopleData
let urlUploadPhoto
let token
let urlContatosAPI
let base_url
let userId
base_url = 'https://demometaway.vps-kinghost.net:8485'

export default {
  name: 'Menu',
  directives: { mask },
  data() {
    return {
      nome: '',
      tel: '',
      email: '',
      cpf: '',
      formaContato: '',
      dtNascimento: '',
      cep: '',
      bairro: '',
      cidade: '',
      estado: '',
      pais: '',
      rua: '',
      numero: ''
    }
  },
  components: {
    VueSidebarMenuAkahon,
    contactListItem
  },
  mounted() {
    this.getAuthInfo()
    urlContatosAPI = base_url + `/api/contato/listar/`
    console.log(urlContatosAPI)
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }

    axios
      .get(urlContatosAPI, { headers: headers })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        // A solicitação falhou
        console.error('Erro:', error.response.status)
      })
  },
  methods: {
    getAuthInfo() {
      token = store.state.token
      userId = store.state.userId
    },
    uploadPhoto(id) {
      const fileInput = document.getElementById('foto')
      const file = fileInput.files[0]

      const formData = new FormData()
      formData.append('photo', file)
      this.getAuthInfo()

      urlUploadPhoto = 'https://demometaway.vps-kinghost.net:8485/api/foto/upload/' + id
      const headers = {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }

      jsonPhotoData = {
        foto: formData.get('photo')
      }

      axios
        .post(urlUploadPhoto, jsonPhotoData, { headers })
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    openModal() {
      const addModal = document.getElementById('add-modal')
      addModal.classList.add('fade-in')
      addModal.style.display = 'flex'
    },
    addContact() {
      this.getAuthInfo()

      jsonAddressData = {
        bairro: this.bairro.toString(),
        cep: this.cep.toString(),
        cidade: this.cidade.toString(),
        estado: this.estado.toString(),
        logradouro: this.rua.toString(),
        pais: this.pais.toString()
      }

      jsonPeopleData = {
        nome: this.nome,
        cpf: this.cpf,
        endereco: jsonAddressData
      }

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }

      axios
        .post(base_url + '/api/pessoa/salvar', jsonPeopleData, { headers })
        .then((response) => {
          const personId = response.data.object.id
          jsonPeopleData['id'] = personId
          console.log('Pessoa inserida com sucessos! Rs.: 200')

          axios
            .get(base_url + `/api/usuario/buscar/${userId}`, { headers })
            .then((response) => {
              const user = response.data.object.usuario
              console.log(user)

              axios.post(base_url + '/api/pessoa/salvar', jsonPeopleData, { headers }).then(() => {
                var formaContatoStr = ''
                if (this.formaContato == '1') {
                  formaContatoStr = 'CELULAR'
                } else if (this.formaContato == '2') {
                  formaContatoStr = 'TELEFONE'
                } else {
                  formaContatoStr = 'EMAIL'
                }

                const jsonContactData = {
                  tipoContato: formaContatoStr,
                  email: this.email.toString(),
                  pessoa: jsonPeopleData,
                  telefone: this.tel.toString(),
                  usuario: user
                }

                axios
                  .post(base_url + '/api/contato/salvar', jsonContactData, { headers })
                  .then(() => {
                    console.log('contato inserido com sucessos!')
                    this.fecharModal()
                  })
                  .catch((error) => {
                    console.log(error)
                  })
              })
            })
            .catch((error) => {
              console.log(error)
            })

          this.fecharModal()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    fecharModal() {
      const closeModal = document.getElementById('add-modal')
      closeModal.classList.remove('fade-in')
      closeModal.classList.remove('fade-out')
      setTimeout(() => {
        closeModal.style.display = 'none'
      }, 300)
    }
  }
}
</script>

<style>
.actionSaveCancelBtns button {
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

#cancelar {
  background: #1a3c4d;
  color: white;
}

.actionSaveCancelBtns {
  width: 25%;
  display: flex;
  align-items: center;
  justify-content: space-around;
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
  opacity: 0;
}

.modal.fade-in {
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
}

.modal-content {
  width: 60%;
  height: fit-content;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  animation: slide-up 0.3s ease;
}

.inputInfo {
  width: 100%;
  display: grid;
  grid-auto-flow: column;
}

@keyframes slide-up {
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

button:active {
  background-color: #3e8e41;
  box-shadow: 0 5px transparent;
  transform: translateY(2px);
}

.actionBtns {
  display: flex;
  width: 20%;
  align-content: center;
  justify-content: space-around;
  align-items: center;
}

#add:hover {
  cursor: pointer;
}

#att:hover {
  cursor: pointer;
  transition: 0.5s;
}

#att {
  display: flex;
  transition: 0.5s;
  align-items: center;
  justify-content: center;
  align-content: center;
  width: auto;
  height: auto;
  padding: 1%;
  border: none;
  background-color: white;
}

#att img {
  width: 2rem;
}

#add {
  width: auto;
  height: auto;
  padding: 0.5rem;
  display: flex;
  border-radius: 10px;
  align-items: center;
  font-size: 1rem;
  color: white;
  border: 1px solid black;
  background-color: #11101d;
  justify-content: center;
}

.title {
  width: 100%;
  margin-bottom: 2%;
}

.subtitle {
  width: 100%;
  place-content: space-between;
  display: flex;
  margin-bottom: 1.2rem;
  height: 100%;
  justify-content: space-between;
  align-items: center;
}

.contactList {
  display: flex;
  align-items: start;
  width: 100%;
  padding: 1%;
  align-content: flex-start;
  height: 80%;
  flex-wrap: wrap;
}

#searchInput {
  width: 80%;
  height: 50%;
  padding-left: 1.1rem;
  transition: 0.5s;
  font-size: 1.2rem;
  border-radius: 1rem;
  border: 1px solid lightgray;
}

.searchbar {
  width: 100%;
  height: 15%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid lightgray;
}

.contacts {
  display: flex;
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  align-content: start;
  padding: 2%;
}

.geralList {
  margin-right: 2%;
}

.geralList,
.favList {
  width: 48%;
  align-content: flex-start;
  min-height: 50%;
  margin-bottom: auto;
  margin-top: 0;
  display: flex;
  flex-wrap: wrap;
  padding: 1%;
  border: 1px solid lightgray;
}
</style>
