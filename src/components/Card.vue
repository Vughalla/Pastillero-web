<template lang="html">

  <div class="src-components-card">
    <div class="title">
      <h4 :class="!!this.subtitle ? 'title-name' : null">{{title}}</h4>
      <span v-if="this.subtitle">{{subtitle}}</span>
    </div>
    <Loader 
      :loading="loading"
      :size="'small'"
    />
    <p v-if="!loading">{{number}}</p>
  </div>

</template>

<script lang="js">
  import Loader from './Loader.vue';

  export default  {
    name: 'src-components-card',
    props: [
      'title',
      'subtitle',
      'number',
      'loading'
    ],
    components: {
      Loader
    },
    mounted () {

    },
    data () {
      return {

      }
    },
    methods: {

    },
    computed: {

    }
}


</script>

<style scoped lang="css">

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  .src-components-card {
    text-align: center;
  }

  h4 {
    font-size: 18px;
    font-weight: 600;
  }

  .title {
    background-color: #8ac344;
    border: 2px solid #8ac344;
    border-top: none;
    border-radius: 4px 4px 0 0;
    font-size: 14px;
    padding: 10px;
    min-height: 101px;
  }

  .title-name {
    padding-bottom: 8px;
    border-bottom: 1px solid #00000036;
  }

  .title > span {
    margin-top: 2px;
    font-size: 18px;
  }

  p {
    border: 2px solid #cecece;
    border-top: none;
    border-radius: 0 0 4px 4px;
    padding: 10px;
    font-size: 30px;
    font-weight: 600;
  }

</style>
