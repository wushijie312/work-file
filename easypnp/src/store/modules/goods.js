
import { post, get } from '@/utils/request';
import { URL } from '@/utils/const';
import { Message } from 'element-ui';
import { endLoading } from '@/utils/loading';
export default {
    state: {
        //商品列表
        goodsList: [],
        //货品id
        goodsId: '',
        // 商品分类
        goodsfl2: '',
        goodsfl1: '',
        classifyList1: [],
        classifyList2: [],
        // 搜索状态
        goodsState: '',
        // pagination分页
        currentPage: 1,
        sizePage: 10,
        // 获取sku列表
        skuList: [],
        // dialog 弹框
        skuOpen: false,
    },
    getters: {
        // 类似计算属性...
    },
    mutations: {
        // 获取商品列表  
        ['GET_GOODS_LIST_SUCCESS'](state, { sizePage, currentPage, goodsList }) {
            state.goodsList = goodsList;
            state.sizePage = sizePage;
            state.currentPage = currentPage;
        },
        // 获取商品分类
        ['GET_GOODS_RELTENANTCATWEGORY_SUCCESS'](state, val) {
            state.classifyList1 = val;
            state.classifyList2 = [];
            state.goodsfl2 = '';
        },
        ['GET_GOODS_RELTENANTCATWEGORY_SUCCESS1'](state, val) {
            state.classifyList2 = val;
            state.goodsfl2 = '';
        },


        // 修改商品状态 
        ['GET_GOODS_OFFSHELVES_SUCCESS'](state, val) {
            Message({
                showClose: true,
                message: val,
                type: 'success'
            });
        },
        // 修改商品是否推荐
        ['GET_GOODS_RECOMMEND_SUCCESS'](state, val) {
            Message({
                showClose: true,
                message: val,
                type: 'success'
            });
        },
        // 获取sku列表
        ['GET_SKU_LIST_SUCCESS'](state, skuList) {
            const skuLists = JSON.parse(skuList);
            state.skuList = skuLists;
            state.skuOpen = true;
        },

        // 修改sku状态 
        ['GET_SKU_OFFSHELVES_SUCCESS'](state, val) {
            // state.skuList.SkuStatus=val[1];
            Message({
                showClose: true,
                message: val,
                type: 'success'
            });
        },
        ['NORMAL_FAIL'](state, msg) {
            Message({
                showClose: true,
                message: msg,
                type: 'error'
            });
        },
        // dialog 弹框
        ['skuHandleEdit'](state, row) {
            state.skuOpen = true;
            state.skuList = row;
        },
        ['skuHandleClose'](state) {
            state.skuOpen = false;
        },
        // 搜索参数改变
        ['change_goods_id'](state, val) {
            state.goodsId = val;
        },
        ['change_fenlei'](state, val) {
            state.goodsfl1 = val;
        },
        ['change_fenlei1'](state, val) {
            state.goodsfl2 = val;
        },
        ['change_state_value'](state, val) {
            state.goodsState = val;
        },

        // 搜索重置  
        ['RESET_GOODS_STATE'](state) {
            state.goodsId = '';
            state.goodsfl1 = '';
            state.goodsfl2 = '';
            state.goodsState = '';
        },
    },
    actions: {
        //1获取商品列表
        async getGoodslist({ commit }, { sizePage, currentPage, goodsId, goodsState, fenlei1, fenlei2 }) {
            const searchList = [{ key: 'p.TenantID', value: '78' }];
            if (goodsId) {
                searchList.push({ key: "Aliases", value: goodsId });
            }
            if (fenlei1 > 0 && fenlei2 == 0) {
                searchList.push({ singleCondition: "(p.CategoryID=" + fenlei1 + " OR p.ParentCategoryID=" + fenlei1 + ")" });
            }
            if (fenlei1 > 0 && fenlei2 > 0) {
                searchList.push({ singleCondition: "(p.CategoryID=" + fenlei2 + ")" });
            }
            if (goodsState != '' && goodsState) {
                searchList.push({ key: "p.[Status]", value: goodsState });
            }
            let result = await post(URL.URL_GOODSLIST, JSON.stringify({
                searchList: searchList,
                orderBy: 'p.ID DESC',
                pagesize: sizePage || '10',
                pageindex: currentPage || '1',
            }));
            // 关闭加载中loading
            endLoading();
            if (result) {
                commit('GET_GOODS_LIST_SUCCESS', { sizePage, currentPage, goodsList: result });
            } else {
                commit('NORMAL_FAIL', result.Message);
            }

        },
        //  2获取商品分类 
        async  productRelTenantCategory({ commit }, { TenantID, CategoryID }) {
            let result = await get(URL.URL_PRODECT_RELTENANTCATWEGORY + '/' + TenantID + '/' + CategoryID);
            if (result) {
                if (CategoryID == 0) {
                    commit('GET_GOODS_RELTENANTCATWEGORY_SUCCESS', result);
                } else {
                    commit('GET_GOODS_RELTENANTCATWEGORY_SUCCESS1', result);
                }
            } else {
                commit('NORMAL_FAIL', '无值');
            }
        },
        //  3.商品上下架 
        async  productOffShelves({ commit }, { val, row }) {
            let result = await post(URL.URL_PRODECT_OFFSHELVES, JSON.stringify({
                searchList: [{ key: ' Sku.Rel_Tenant_ProductID ', value: row.ID.toString() }],
                tenantId: row.TenantID,
                relId: row.ID,
                productId: row.ProductID,
                newStatus: val,
                skuId: row.SkuId,
            }));
            if (result.Success) {
                commit('GET_GOODS_OFFSHELVES_SUCCESS', result.Message);
            } else {
                commit('NORMAL_FAIL', result.Message);
            }
        },
        // 4.修改商品是否推荐
        async  productRecommend({ commit }, { val, row }) {
            let result = await post(URL.URL_IS_RECOMMEND, JSON.stringify({
                relId: row.ID,
                isCommend: val
            }));
            if (result.Success) {
                commit('GET_GOODS_RECOMMEND_SUCCESS', result.Message);
            } else {
                commit('NORMAL_FAIL', result.Message);
            }
        },
        // 1.通过商品ID获取sku列表
        async  getSkuByProduct({ commit }, { ID, TenantID }) {
            let result = await post(URL.URL_GET_SKU_PRODUCT, JSON.stringify({
                searchList: [{ key: ' Sku.Rel_Tenant_ProductID ', value: ID.toString(), singleCondition: '' }],
                tenantId: TenantID
            }));
            // console.log(result.Data);
            if (result.Success) {
                commit('GET_SKU_LIST_SUCCESS', result.Data);
            } else {
                commit('NORMAL_FAIL', result.Message);
            }
        },
        //2.sku上下架
        async  skuOffShelves({ commit }, { val, row }) {
            
            let result = await post(URL.URL_SKU_OFFSHELVES, JSON.stringify({
                relId: row.Id,
                productId: row.ProductId,
                newStatus: val,
                skuId: row.SkuId,
            }));
            if (result.Success) {
                commit('GET_SKU_OFFSHELVES_SUCCESS', result.Message);
            } else {
                commit('NORMAL_FAIL', result.Message);
            }
        },
    }
}