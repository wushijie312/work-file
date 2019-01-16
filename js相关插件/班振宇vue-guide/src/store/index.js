import Vue from 'vue';
import Vuex from 'vuex';

import game from './modules/game'; //游戏相关模块
import user from './modules/user'; //用户相关模块
import cart from './modules/cart'; //购物车相关模块
import goods from './modules/goods'; //商品相关模块
import test from './modules/test'; //测试相关模块

Vue.use(Vuex);

const state = {
	//根state
};

const getters = {
	//根getters
}

const actions = {
	//根actions
}

const mutations = {
	//根mutations
}

export default new Vuex.Store({
	state, //单一状态树
	getters, //getter函数类似与计算属性
	actions, //事件支持异步操作,使用dispatch出发action,内部可拿到commit用于commit(mutations)
	mutations, //用于修改state,只能同步操作
	modules: {
		game,
		user,
		cart,
		goods,
		test
	}
});