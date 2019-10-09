<template>
  <div class="register">

     <a-skeleton :loading="loading">
      <div>
        <h4>Ant Design Vue, a design language</h4>
        <p>We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.</p>
      </div>
    </a-skeleton>
    <a-button @click="showSkeleton">
      Show Skeleton
    </a-button>
    <!-- <a-button @click="showSkeleton">Show Skeleton</a-button>
    <a-button type="primary">userInfo：{{userInfo}}</a-button> -->
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "register",
  data() {
    return {
      
      loading: false
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.register.userInfo
    })
  },
  mounted() {
    const userinfo = {
      username: "wushi3",
      password: "11",
      password1: "11",
      type: "dashen"
    };
    this.$store.dispatch("getRegister", userinfo);
  },
  methods:{
    showSkeleton() {
        this.loading = true
        setTimeout(() => {
          this.loading = false
        }, 3000);
      }
    // showSkeleton: function() {
    //   var self=this;
    //   console.log(this);
    //   self.$set('loading',true);
    //   console.log(this);
    //   setTimeout(() => {
    //     self.$set('loading',false);
    //     // self.loading=false;
    //   }, 3000);
    // }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
