<template lang="html">

  <section class="src-components-meds">

    <div @click="cancelEditMed()" v-if="prepareToEditMed || prepareToAddMed || showCommentsActive" class="overlay"></div>
    <h1>Listado de medicamentos</h1>
    <button :disabled="prepareToEditMed" class="add-med-button add-med-button--form" @click="prepareAddMed()">Agregar medicamento</button>

    <!-- ! Add Form -->
    <div v-if="prepareToAddMed" class="add-med-form">
      <vue-form class="edit-form" :state="formState" @submit.prevent="addMed()">
        <h4>Agregar medicamento</h4>
        <validate>
          <input type="text"
            class="add-input"
            name="imgUrl"
            id="imgUrl"
            autocomplete="off"
            placeholder="imgUrl"
            v-model.trim="formData.imgUrl"
            required
          >
          <!-- ! mensajes de validación -->
        </validate>
        <validate>
          <input type="text"
            class="add-input"
            name="co_id"
            id="co_id"
            autocomplete="off"
            placeholder="co_id"
            v-model.trim="formData.co_id"
            required
          >
          <!-- ! mensajes de validación -->
        </validate>
        <validate>
          <input type="text"
            class="add-input"
            name="name"
            id="name"
            autocomplete="off"
            placeholder="Nombre"
            v-model.trim="formData.name"
            required
          >
        </validate>
        <validate>
          <input type="number"
            class="add-input"
            name="amount"
            id="amount"
            autocomplete="off"
            placeholder="Cantidad"
            v-model.trim="formData.amount"
            required
            :minlength="minAmount"
          >
          <!-- ! mensajes de validación -->
        </validate>
        <validate>
          <input type="text"
            class="add-input"
            name="type"
            id="type"
            autocomplete="off"
            placeholder="Unidad"
            v-model.trim="formData.type"
            required
          >
        </validate>
        <validate>
          <input type="text"
            class="add-input"
            name="lab"
            id="lab"
            autocomplete="off"
            placeholder="Laboratorio"
            v-model.trim="formData.lab"
            required
          >
        </validate>
        <validate>
          <input type="text"
            class="add-input"
            name="genericName"
            id="genericName"
            autocomplete="off"
            placeholder="Nombre Genérico"
            v-model.trim="formData.genericName"
            required
          >
        </validate>
        <validate>
          <input type="text"
            class="add-input"
            name="ean_code"
            id="ean_code"
            autocomplete="off"
            placeholder="Código EAN"
            v-model.trim="formData.ean_code"
            required
          >
        </validate>
        <validate>
          <input type="text"
            class="add-input"
            name="comments"
            id="comments"
            autocomplete="off"
            placeholder="Comentarios"
            v-model.trim="formData.comments"
          >
        </validate>
        <div class="buttons-wrapper">
          <button class="add-med-button" :disabled="formState.$invalid" type="submit">Enviar</button>
          <button class="cancel-med-button" @click="cancelPrepareAddMed()" type="button">Cancelar</button>
        </div>
      </vue-form>
    </div>

    <!-- ! Edit Form -->
    <div class="edit-form" v-if="prepareToEditMed">
      <h4>Editar medicamento</h4>
      <label v-if="!loadingMed">Url de la imagen</label>
      <input type="text" v-model="currentMed.imgUrl" v-if="!loadingMed">
      <label v-if="!loadingMed">co_id</label>
      <input type="text" v-model="currentMed.co_id" v-if="!loadingMed">
      <label v-if="!loadingMed">Nombre</label>
      <input disabled="true" type="text" :value="currentMed.name" v-if="!loadingMed">
      <label v-if="!loadingMed">Cantidad</label>
      <input disabled="true" type="number" :value="currentMed.amount" v-if="!loadingMed">
      <label v-if="!loadingMed">Unidad</label>
      <input type="text" v-model="currentMed.type" v-if="!loadingMed">
      <label v-if="!loadingMed">Laboratorio</label>
      <input type="text" v-model="currentMed.lab" v-if="!loadingMed">
      <label v-if="!loadingMed">Nombre genérico</label>
      <input type="text" v-model="currentMed.genericName" v-if="!loadingMed">
      <label v-if="!loadingMed">Codigo Ean</label>
      <input type="text-area" v-model="currentMed.ean_code" v-if="!loadingMed">
      <label v-if="!loadingMed">Comentarios</label>
      <input type="text-area" v-model="currentMed.comments" v-if="!loadingMed">
      <div class="edit-form__button-wrapper" v-if="!loadingMed">
        <button @click="editMed(editedMed.id)">Aceptar</button>
        <button class="cancel-edit" @click="cancelEditMed()">Cancelar</button>
      </div>
      <!-- ! Loader -->
      <Loader
        :loading="loadingMed"
      :size="'large'"
      />
    </div>

    <!-- ! Comments Modal -->
    <div class="edit-form edit-form--comments-modal" v-if="showCommentsActive">
      <button class="hide-comments-button" @click="initializeData()">
        <img src="../assets/close.svg" alt="Cerrar" title="Cerrar">
      </button>
      <h4>Comentarios</h4>
      <p v-if="!loadingMed" class="comments">{{currentMed.comments}}</p>
      <!-- ! Loader -->
      <Loader
        :loading="loadingMed"
      :size="'large'"
      />
    </div>

    <!-- ! Search -->
    <div class="view-options-wrapper">
      <div class="search-wrapper">
        <input :disabled="prepareToEditMed" type="text" class="search" v-model="medsSearch" placeholder="Buscar medicamento">
        <div class="active-checkbox">
          <label>
            <input class="checkbox" type="checkbox" @click="selectShowArchived()" v-model="showActiveMeds">
            <span class="checkbox-visible"></span>
            <span>Activos</span>
          </label>
        </div>
        <div class="active-checkbox">
          <label>
            <input class="checkbox" type="checkbox" @click="selectShowArchived()" v-model="showArchivedMeds">
            <span class="checkbox-visible"></span>
            <span>Archivados</span>
          </label>
        </div>
      </div>
    </div>

    <!-- ! Table -->
    <h5>Medicamentos: <strong>{{getAmountOfMeds}}</strong></h5>
    <table class="content-table">
      <thead>
        <tr>
          <th>co_id</th>
          <th>Nombre comercial</th>
          <th>Cant X envase</th>
          <th>Unidad</th>
          <th>Laboratorio</th>
          <th>Codigo Ean</th>
          <th>Nombre genérico</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in filterMeds" :key="index" :class="[(currentMedId === item.id ? 'med-is-being-edited' : null), (item.data().archived ? 'archived-med' : null)]">
          <td>{{ item.data().co_id }}</td>
          <td>{{ item.data().name }}</td>
          <td>{{ item.data().amount }}</td>
          <td>{{ item.data().type }}</td>
          <td>{{ item.data().lab }}</td>
          <td>{{ item.data().ean_code }}</td>
          <td>{{ item.data().genericName }}</td>
          <th class="buttons-wrapper buttons-wrapper--actions">
            <button @click="preEditMed(item.id)">
              <img src="../assets/edit.svg" alt="edit" title="Editar">
            </button>
            <button v-if="!item.data().archived" @click="archiveMed(item.id)">
              <img src="../assets/archive.svg" alt="Archivar" title="Archivar">
            </button>
            <button v-if="item.data().archived" @click="moveMedToList(item.id)">
              <img src="../assets/moveToList.svg" alt="Mover a la lista" title="Mover a la lista">
            </button>
            <button @click="showComments(item.id)" class="comments-button" v-if="item.data().comments.length > 0" title="Ver comentarios">!</button>
          </th>
        </tr>
      </tbody>
    </table>

    <!-- ! Loader -->
    <Loader
      :loading="loading"
      :size="'large'"
    />

  </section>

</template>

<script lang="js">
  import { db } from '../firebase/db';
  import Loader from './Loader.vue';

  export default  {
    name: 'src-components-meds',
    props: [],
    components: {
      Loader
    },
    mounted () {
      this.getAll();
    },
    data () {
      return {
        formData: this.getInicialData(),
        prepareToAddMed: false,
        prepareToEditMed: false,
        showCommentsActive: false,
        loading: true,
        loadingMed: true,
        showArchivedMeds: false,
        showActiveMeds: true,
        minAmount: 1,
        medsSearch: '',
        currentMedId: '',
        commentsToShow: '',
        currentMed: {},
        formState: {},
        actualMeds: [],
        archivedMeds: [],
        docs: [],
        editedMed: {
          imgUrl: '',
          co_id: '',
          name: '',
          amount: '',
          type: '',
          lab: '',
          genericName: '',
          comments: '',
          ean_code: ''
        }
      }
    },
    methods: {
      selectShowArchived() {

      },
      selectShowMeds(e) {
        console.log(e);
      },
      initializeData() {
        this.currentMed = {};
        this.currentMedId = '';
        this.loading = true;
        this.loadingMed = true;
        this.prepareToEditMed = false;
        this.prepareToAddMed = false;
        this.showCommentsActive = false;
        this.formData = this.getInicialData();
        this.getAll();
      },
      getInicialData() {
        return {
          imgUrl: '',
          co_id: '',
          name: '',
          amount: 0,
          type: '',
          lab: '',
          genericName: '',
          comments: ''
        }
      },
      getAll() {
        this.loading = true;
        this.actualMeds = [];
        db.collection('meds').orderBy('co_id').get().then(
          (snapshot) => {
            snapshot.docs.forEach(doc => {
              this.actualMeds.push(doc);
              this.docs.push(doc);
            });
            this.loading = false;
          }
        );
      },
      getCurrentMed(id) {
        this.currentMedId = id;
        db.collection('meds').doc(id).get().then(
          (snapshot) => {
            this.currentMed = snapshot.data();
            this.loadingMed = false;
          }
        );
      },
      prepareAddMed() {
        this.prepareToAddMed = true;
      },
      cancelPrepareAddMed() {
        this.initializeData();
      },
      async addMed() {
        const payload = {
          imgUrl: this.formData.imgUrl,
          co_id: this.formData.co_id,
          name: this.formData.name,
          amount: this.formData.amount,
          type: this.formData.type,
          lab: this.formData.lab,
          genericName: this.formData.genericName,
          comments: this.formData.comments,
          ean_code: this.formData.ean_code,
          archived: false
        }
        db.collection('meds').add(payload);
        this.formData = this.getInicialData();
        this.prepareToAddMed = false;
        this.getAll();
      },
      preEditMed(id) {
        this.prepareToEditMed = true;
        this.getCurrentMed(id);
      },
      editMed() {
        db.collection('meds').doc(this.currentMedId).update(this.currentMed);
        this.initializeData();
      },
      cancelEditMed() {
        this.initializeData();
      },
      archiveMed(id) {
        db.collection('meds').doc(id).update({archived: true});
        this.getAll();
      },
      moveMedToList(id) {
        db.collection('meds').doc(id).update({archived: false});
        this.getAll();
      },
      showComments(id) {
        this.getCurrentMed(id);
        this.showCommentsActive = true;
      }
    },
    firestore: {
      meds: db.collection('meds')
    },
    computed: {
      filterMeds() {
        return this.actualMeds.filter((med) => {
          let completeData = `${med.data().co_id}${med.data().name}${med.data().amount}${med.data().type}${med.data().lab}${med.data().genericName}-archived:${med.data().archived}`;

          if((this.showArchivedMeds && this.showActiveMeds) || (!this.showArchivedMeds && !this.showActiveMeds)) {
            return completeData.toLowerCase().includes(this.medsSearch.toLowerCase() && completeData.toLowerCase().includes('-archived:false') && completeData.toLowerCase().includes('-archived:true'));
          }
          if(this.showActiveMeds) {
            return completeData.toLowerCase().includes(this.medsSearch.toLowerCase()) && completeData.toLowerCase().includes('-archived:false');
          }
          if(this.showArchivedMeds) {
            return completeData.toLowerCase().includes(this.medsSearch.toLowerCase()) && completeData.toLowerCase().includes('-archived:true');
          }
        });
      },
      getAmountOfMeds(){
        return this.filterMeds.length < this.actualMeds.length ? `${this.filterMeds.length}/${this.actualMeds.length}` : this.actualMeds.length;
      }
    }
}


</script>

<style scoped lang="css">

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .src-components-meds {
    text-align: start;
  }

  h1 {
    margin-bottom: 20px;
  }

  .active-checkbox {
    display: flex;
    align-items: center;
    margin-right: 30px;
    cursor: pointer;
    font-size: 18px;
  }

  .active-checkbox > label {
    display: flex;
    align-items: center;
  }

  .active-checkbox:last-of-type {
    margin: 0;
  }

  .active-checkbox input {
    display: none;
  }

  .checkbox-visible {
    display: block;
    height: 20px;
    width: 20px;
    border-radius: 4px;
    border: 2px solid #919191;
    margin-right: 8px;
  }

  .active-checkbox label {
    cursor: pointer;
  }

  .checkbox:checked + .checkbox-visible {
    background-color: #8ac344;
    border: 2px solid #8ac344;
    color: #ffffff;
    background-image: url("../assets/check.svg");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
  }

  .archived-med {
    background-color: #cecece;
    opacity: 0.8;
  }
  
  .search-wrapper {
    margin-bottom: 20px;
    display: flex;
  }

  .hide-comments-button {
    position: absolute;
    top: 10px;
    right: 10px;
  }

  .hide-comments-button img {
    height: 30px;
  }

  .comments {
    font-size: 20px;
    text-align: start;
    max-height: 80vh;
    overflow: auto;
  }

  .add-input {
    width: 100%;
    margin-bottom: 10px;
    border-radius: 4px;
    border: 1px solid #818181;
  }

  .overlay {
    background-color: #00000081;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 60;
  }

  .edit-form {
    position: fixed;
    top: 50%;
    left: 50%;
    display: flex;
    flex-direction: column;
    max-width: 500px;
    width: 100%;
    text-align: center;
    box-shadow: 4px 4px 10px #cecece;
    border-radius: 4px;
    padding: 20px;
    background-color: #ffffff;
    z-index: 80;
    transform: translate(-50%, -50%);
    max-height: 80vh;
    overflow: auto;
  }

  .edit-form--comments-modal {
    max-width: 700px;
  }

  .edit-form h4 {
    font-size: 28px;
    margin-bottom: 20px;
    font-weight: 600;
  }

  .edit-form label {
    text-align: start;
  }

  .edit-form input {
    border: 1px solid #cecece !important;
    border-radius: 4px;
    margin-bottom: 18px !important;
    padding: 4px 10px;
    font-size: 20px;
  }

  .edit-form input:disabled {
    background-color: #cecece;
    cursor: not-allowed;
  }

  .edit-form__button-wrapper {
    margin-top: 20px;
    display: flex;
    align-items: stretch;
    justify-content: space-between;
  }

  .edit-form__button-wrapper button {
    padding: 4px 10px;
    background-color: #8ac344;
    color: #ffffff;
    font-weight: 600;
    font-size: 20px;
    border-radius: 4px;
  }

  .cancel-edit {
    background-color: #ff3939 !important;
  }

  .edit-form input:last-of-type {
    margin: 0;
  }

  .med-is-being-edited {
    border-radius: 4px;
    background-color: #ccff8f;
    pointer-events: none;
    opacity: 0.8;
  }

  .search {
    padding: 2px 8px;
    border-radius: 4px;
    border: 2px solid #cecece;
    max-width: 300px;
    width: 100%;
    margin-right: 20px;
  }

  .search::placeholder {
    color: #999999;
  }

  .search:focus {
    outline: none;
    border: 2px solid #8ac344;
  }

  .buttons-wrapper--actions {
    margin-bottom: 0 !important;
    justify-content: flex-start !important;
  }

  .add-med-button--form {
    margin-bottom: 40px;
  }

  .cancel-med-button {
    background-color: #ff3939;
    padding: 4px 10px;
    color: #ffffff;
    font-weight: 600;
    font-size: 20px;
    border-radius: 4px;
  }

  .buttons-wrapper {
    display: flex;
    align-items: stretch;
    justify-content: space-between;
  }

  .buttons-wrapper > button {
    margin-right: 10px;
  }

  .buttons-wrapper > button:last-of-type {
    margin: 0;
  }

  .add-med-form {
    width: 30%;
  }

  .form {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }

  .form input {
    width: 100%;
  }

  .vf-field-pristine,
  .vf-field-touched,
  .vf-field-focused {
    /* width: 100%;
    margin-bottom: 10px;
    border-radius: 4px;
    border: 1px solid #818181; */
  }

  .vf-field-pristine:focus,
  .vf-field-touched:focus {
    border: 1px solid #8ac344;
  }

  .add-med-button {
    padding: 4px 10px;
    background-color: #8ac344;
    color: #ffffff;
    font-weight: 600;
    font-size: 20px;
    border-radius: 4px;
  }

  button {
    border: none;
    background-color: transparent;
  }

  td {
    text-align: start;
  }

  .add-med-button {
    background-color: #8ac344;
    padding: 4px 10px;
  }

  .add-med-button:disabled {
    background-color: #8ac3447c;
    cursor: not-allowed;
  }

  .buttons-wrapper {
    display: flex;
    align-items: center;
    margin-bottom: 40px;
  }

  .buttons-wrapper button {
    margin-right: 8px;
  }

  .comments-button {
    font-weight: 800;
    color: #488301;
    font-size: 24px;
  }

  .buttons-wrapper button:last-of-type {
    margin: 0;
  }

  .content-table {
    border-collapse: collapse;
    margin: 25px 0;
    min-width: 100%;
  }

  .content-table thead {
    border-radius: 4px;
  }

  .content-table thead tr {
    background-color: #373737;
    color: #ffffff;
    text-align: start;
  }

  .content-table th,
  .content-table td {
    padding: 12px 15px;
  }

  .content-table tbody tr {
    border-bottom: 1px solid lightgrey;
  }

</style>
