<template>
    <div>
        <router-link to="/demovuex" >demovuex</router-link>
    <router-link to="/demovuex1" >demovuex1</router-link>
        {{msg}}
    </div>
</template>
<style scoped>

</style>
<script>
  import {mapState} from 'vuex';
    export default{
      name:'uemovuex1',
      data(){
        return {}
      },
      computed:{...mapState(['msg'])}

    }
</script>