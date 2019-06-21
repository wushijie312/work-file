// const domain = 'http://127.0.0.1:7001'; //后台接口主机地址
const domain = 'https://zhicai.yangguangqicai.com'; //后台接口主机地址
//后台接口主机地址

const URL = {
  
  //获取用户信息
  URL_GET_USER_INF: `${domain}/user/getUser`,
  
  // 一、商品管理相关接口
  //1获取商品列表
  URL_GOODSLIST: `${domain}/product/search`,
   //商品分类
   URL_PRODECT_RELTENANTCATWEGORY: `${domain}/product/reltenantcategory`,
   //2.商品上下架
   URL_PRODECT_OFFSHELVES: `${domain}/product/onoroffshelves`,
  //3.修改商品是否推荐
  URL_IS_RECOMMEND: `${domain}/product/isrecommend`,
  // 二、SKU管理相关接口
  //1.通过商品ID获取sku列表
  URL_GET_SKU_PRODUCT: `${domain}/sku/getskubyproduct`,
  //2.sku上下架
  URL_SKU_OFFSHELVES: `${domain}/sku/onoroffshelves`,
  //获取商品列表  
  URL_GOODSLIST2: `${domain}/product/search`,
  //获取用户消息
  URL_GET_USER_NEWS: `${domain}/home/searchmc`,
  //获取用户消息已读
  URL_NEWS_SETREADMSG: `${domain}/home/setreadmsg`,
  
}
export { URL }