<template>
  <div >
    <div class="header" v-bind:style="{ background:change_head_color  }">
      <i class="fa fa-twitter fa-fw"></i>
      <span v-if="!isCollapse" style="white-space: nowrap;">{{$t('menus.zhicai')}}</span>
    </div>

    <el-menu
      class="menu_head"
      router
      unique-opened
      @open="handleOpen"
      @close="handleClose"
      :backgroundColor="change_bg_color"
      text-color="#fff"
      default-active="/"
      active-text-color="#18ff00"
      :collapse="isCollapse"
    >
      <el-menu-item index="/">
        <!-- <i class="fa fa-bandcamp fa-fw icon_color"></i> -->
        <i class="fa fa-home fa-fw icon_color"></i>
        <span slot="title">{{$t('menus.home')}}</span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="fa fa-truck fa-fw icon_color"></i>
          <span>{{$t('menus.caigouguanli')}}</span>
        </template>
        <ul class="over-hide menu_bg" >
          <el-menu-item index="goodslist" >{{$t('menus.shangpin')}}</el-menu-item>
          <el-menu-item index="basicontainer" >{{$t('menus.addShangpin')}}</el-menu-item>
        </ul>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="fa fa-file-text fa-fw icon_color"></i>
          <span>{{$t('menus.dingdan')}}</span>
        </template>
        <ul class="over-hide menu_bg" >
          <el-menu-item index="formRadio" >{{$t('menus.dingdanLists')}}</el-menu-item>
          <el-menu-item index="formCheckbox" >{{$t('menus.dandingSet')}}</el-menu-item>
        </ul>
      </el-submenu>
    </el-menu>
  </div>
</template>

<style scoped>

.over-hide {
  overflow: hidden;
}
.icon_color {
  color: #fff;
}
.menu_head {
  border: 0;
}

.header {
  background-color: #473c8b;
  color: #fff;
  line-height: 60px;
  text-align: center;
}

</style>

<script>
// import menu from "@/config/menu-config";
import { mapState } from "vuex";

export default {
  data() {
    return {
      
    };
  },
  computed: {
    // isCollapse() {
    //   return this.$store.state.isCollapse;
    // },
    ...mapState({"isCollapse":state=>state.basic.isCollapse,"change_bg_color":state=>state.themeColor.change_bg_color,"change_head_color":state=>state.themeColor.change_head_color})
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>