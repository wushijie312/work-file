
<template>
        <router-view></router-view>
</template>

<script>
// import { mapMutations } from "vuex";
export default {
  mounted() {
    try {
      //进入程序加载本地的登录信息
       localStorage.setItem('token', this.$cookies.get('easypnp_access') );
//       let userInfo = localStorage.getItem("userInfo");
//       this.GET_USER_INF_SUCCESS();
//       this.$store.commit("GET_USER_INFO_SUCCESS", JSON.parse(userInfo));
    } catch (e) {
      // console.log(e);
    }
  },
  // methods:{
  //     ...mapMutations(['GET_USER_INF_SUCCESS'])    
  // }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>


