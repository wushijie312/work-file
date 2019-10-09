<template>
    <div>
       <Hello />
    </div>
</template>

<script>
import { mapState } from "vuex";
const Hello = () => import('@/components/hello')
export default {
  name: "zujian",
  data () {
      return {
            
      }
  },
    components:{
        Hello
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
