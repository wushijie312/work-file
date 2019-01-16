<template>
	<div>
		<router-link to="/demovuex" >demovuex</router-link>
    <router-link to="/demovuex1" >demovuex1</router-link>
		{{name}}
		<button @click="fun">点击改变{{msg}}</button>
		<button @click="fun1">asdasd点击改变1</button>
		<br/>
		msg:{{msg}}
		{{count}}
	</div>
</template>	
<script>
import {mapActions, mapState} from 'vuex';
export default{
	name:'demovuex',
	data(){
		return {
			name:'demovuex'
		}
	},
	computed:{
		...mapState(['count','msg'])

	},
	methods:{
		...mapActions(['fun','fun1']),
	}
}
</script>