<template>
  <div class="contact">
    <div @click="openContactInfo" class="name">Rodrigo Luan Ferrazza</div>
    <div class="phone-number">(54) 99246-1614</div>
    <div class="actions">
      <button class="hint--bottom" data-hint="remover" id="remove">
        <img src="../assets/img/delete.png" alt="remover" />
      </button>
      <button class="hint--bottom" data-hint="editar" id="edit">
        <img src="../assets/img/edit.png" alt="editar" />
      </button>
      <button @click="fav()" class="hint--bottom" data-hint="favoritar" id="fav">
        <img :class="classeFav" src="../assets/img/star.png" alt="add fav" />
      </button>
    </div>
  </div>

  <div class="modal" id="info-modal">
    <div class="modal-content">
      <h3 class="title">Informações de contato</h3>
      <div class="info-container">
        <div class="infoGeral">
          <div class="infoUser">
            <img id="fotoUsuario" src="../assets/img/star.png" />
            <div class="contact-prop">
              <p>Rodrigo Luan Ferrazza</p>
              <p>E-mail: contato@contato.com</p>
              <p>Telefone: (54) 99999-9999</p>
              <p>Data de nascimento: 30/04/2001</p>
            </div>
          </div>
        </div>

        <h3>Endereço</h3>
        <div class="endereco">
          <div class="inputInfo">
            <div class="inputInfo-left">
              <label for="pais">País</label>
              <input disabled id="pais" type="text" class="inputViewRonly" value="Brasil" />

              <label for="cidade">Cidade</label>
              <input
                disabled
                id="cidade"
                type="text"
                class="inputViewRonly"
                value="Caxias do Sul"
              />

              <label for="numero">Número</label>
              <input disabled id="numero" type="text" class="inputViewRonly" value="107" />
            </div>

            <div class="inputInfo-right">
              <label for="bairro">Bairro</label>
              <input disabled type="text" class="inputViewRonly" value="Cruzeiro" id="bairro" />

              <label for="rua">Rua</label>
              <input disabled id="rua" type="text" class="inputViewRonly" value="Tucano" />
            </div>
          </div>
        </div>
      </div>

      <div class="actionCancelBtns">
        <button @click="fecharModalInfo" id="cancelar">Fechar</button>
      </div>
    </div>
  </div>
</template>
<script>
let favFlag

export default {
  name: 'contactListItem',
  data() {
    return {}
  },
  components: {},
  methods: {
    fecharModalInfo() {
      const closeModal = document.getElementById('info-modal')
      closeModal.classList.remove('fade-in')
      closeModal.classList.remove('fade-out')
      setTimeout(() => {
        closeModal.style.display = 'none'
      }, 300)
    },
    openContactInfo() {
      const contactInfoModal = document.getElementById('info-modal')
      contactInfoModal.classList.add('fade-in')
      contactInfoModal.style.display = 'flex'
    },
    fav() {
      const element = document.getElementById('fav')
      console.log(favFlag)
      console.log(element)
      if (favFlag == 0) {
        element.classList.remove('not-fav')
        element.classList.add('already-fav')
        favFlag = 1
      } else {
        element.classList.remove('already-fav')
        element.classList.add('not-fav')
        favFlag = 0
      }
    }
  }
}
</script>

<style scoped>
button:hover {
  cursor: pointer;
}

.actionCancelBtns button {
  width: 40%;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: 1px solid lightgray;
  color: white;
}

.actionCancelBtns {
  width: 25%;
  display: flex;
  align-items: center;
  justify-content: end;
  height: fit-content;
  float: right;
}

.endereco {
  width: 100%;
  height: fit-content;
  display: flex;
  flex-wrap: wrap;
  padding-left: 1rem;
}

#fotoUsuario {
  height: fit-content;
  width: 6rem;
  border: 1px solid lightgray;
  border-radius: 50%;
  padding: 0.5rem;
}
.infoUser {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-flow: nowrap;
  width: 100%;
  height: fit-content;
}

.contact-prop p {
  width: 100%;
  margin-right: auto;
}

.contact-prop {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding-left: 1rem;
}

.infoGeral {
  display: flex;
  width: 100%;
  height: fit-content;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.infoUser .contact {
  display: flex;
  width: 100%;
  height: 100%;
}

.name {
  padding-left: 0.5rem;
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.phone-number {
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

#remove:hover,
#edit:hover {
  transition: 0.5s;
  background-color: #11101d;
}

.contact {
  display: flex;
  width: 100%;
  flex-wrap: nowrap;
  border-bottom: 1px solid lightgray;
  align-items: center;
  height: min-content;
  transition: 0.5s;
}

.not-fav img {
  transition: 0.5s;
  filter: invert(1);
}

.already-fav img {
  transition: 0.5s;
  filter: invert(0);
}

.contact .actions button:hover img {
  transition: 0.5s;
  filter: invert(1);
}
.contact .actions button:hover {
  cursor: pointer;
  transition: 0.5s;
}

.contact:hover {
  background-color: #d3d3d34d;
  transition: 0.5s;
  cursor: pointer;
}

.contact .actions button {
  transition: 0.5s;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: white;
}

.contact .actions button img {
  width: 2rem;
}

.actions {
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: white;
}
</style>
