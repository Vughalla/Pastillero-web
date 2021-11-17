<template lang="html">

  <div class="src-components-loader">
      <div v-if="loading" :class="size === 'small' ? ['loader', 'loader--small'] : null">
        <div :class="size === 'small' ? ['mask', 'mask--small'] : null"></div>
        <div :class="size === 'small' ? ['white', 'white--small'] : null"></div>
      </div>
  </div>

</template>

<script lang="js">

  export default  {
    name: 'src-components-loader',
    props: [
      'loading',
      'size'
    ],
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
  .src-components-loader {
    display: flex;
    justify-content: center;
  }

  .loader-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .loader {
    background-color: #8ac344;
    height: 100px;
    width: 100px;
    border-radius: 50%;
    position: relative;
    margin: 10px;
    animation: spin 800ms linear infinite;
  }

  .loader--small {
    height: 50px;
    width: 50px;
  }

  .mask {
    position: absolute;
    top: 50%;
    left: 50%;
    height: 80px;
    width: 80px;
    transform: translate(-50%, -50%);
    background-color: #ffffff;
    border-radius: 50%;
  }

  .mask--small {
    height: 40px;
    width: 40px;
  }

  .white {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
    background-color: #ffffff;
    height: 40px;
    width: 40px;
    z-index: 40;
  }

  .white--small {
    height: 20px;
    width: 20px;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

</style>
