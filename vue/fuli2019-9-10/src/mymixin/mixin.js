import Vue from 'vue'
const mixin=Vue.mixin({
    data(){
        return {
            test1:{
                name:'world',
                sex:1
            }
        }
    },
  created: function () {
    this.kk();
  },
  methods: {
      kk(){
          console.log(this.test1);
      }
  },
  
})
export default {
    mixin
}