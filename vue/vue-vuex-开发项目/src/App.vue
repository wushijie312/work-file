<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-link to="/index" >首页</router-link>
    <router-link to="/page1" >页面1</router-link>
    <router-link to="/page2/123" >页面2</router-link>
    <div @click="clickme">页面3</div>
    <router-view/>
    <router-link to="/demovuex" >demovuex</router-link>
    <router-link to="/demovuex1" >demovuex1</router-link>
  </div>
</template>

<script>
 export default{
        name: 'App',
        data(){
            return{
                data:'page1'
            }
        },
        methods:{
          clickme:function(){
            this.$router.push({ path: 'user/1/age', query: { id: 'user', name: 'John', age: 'John' }})
          }
        }
    }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
