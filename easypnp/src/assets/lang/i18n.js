import Vue from "vue";
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
import LangEn from './en'
import LangCHS from './zhCHS'
export default new VueI18n({
    //定义默认语言
    locale: 'zhCHS', 
    messages:{
      'en':LangEn,
      'zhCHS':LangCHS
    }
  })