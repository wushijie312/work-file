<template>
    <div>
        <ul id="container">
            <li v-for="(img,index) in list" :key='index'>
                <img v-lazy="img" style="width:200px;height:200px;">
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "pic",
  data () {
      return {
            list: [
              'http://hbimg.b0.upaiyun.com/75cdb7cfd53c1eeead7f5333e673e9e669e456d5752e-RNtNWd_fw658',
              'http://i0.hdslb.com/bfs/article/f9321b20c7cf75c1271dd992a8a01c84dbc216cf.jpg',
              'http://pic.rmb.bdstatic.com/fcd9555bd33f379035bcc05e71be30d2.jpeg',
              'http://b-ssl.duitang.com/uploads/blog/201307/13/20130713124056_jB8hn.jpeg',
              'http://cdn.duitang.com/uploads/item/201412/03/20141203134605_trMfV.thumb.700_0.jpeg',
              'http://pic.rmb.bdstatic.com/f775f16cbda22b2fd7903480a06e44a0.jpeg',
              'http://img4q.duitang.com/uploads/item/201507/02/20150702211241_zfn4r.jpeg',
              'http://b-ssl.duitang.com/uploads/item/201504/24/20150424H3609_NFWrs.jpeg',
              'http://i0.hdslb.com/bfs/article/949d1ae418ef728b2d61b39a40af13e6c3d72461.jpg',
              'http://cdn.duitang.com/uploads/item/201401/01/20140101114101_QCiHf.thumb.700_0.jpeg',
              'http://img5.duitang.com/uploads/item/201408/15/20140815210748_ihZ5T.png',
          ]
      }
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
