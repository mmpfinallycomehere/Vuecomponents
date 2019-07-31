import Vue from 'vue'
import axios from 'axios'
import store from '../store'
import router from '../router'
const pageIdObj = {}

const service = axios.create({
  timeout: 30000             // 请求超时时间
})

service.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

// 请求拦截器
service.interceptors.request.use(config => {
	if (store.getters.isLogin && store.state.user.userToken) {
		config.headers['Authorization'] = 'Bearer' + store.state.user.userToken; // 每次请求带上token
	}
	// 防止重复请求 请求没返回的时候不变 ，返回后变更
	pageIdObj[config.url] = pageIdObj[config.url] ? pageIdObj[config.url] : (new Date()).getTime()
	return config
},error => {
	console.log(config)  // 调试
	Promise.reject(error)
})

//  响应拦截器
service.interceptors.response.use(
	response => {
		// 请求返回后，改变pageid
		pageIdObj[response.config.url] = (new Date()).getTime()
		const res = response.data
		const $route = router.currentRoute;
		// 判断登录状态 重新登录 ，res.data.code 请求状态码
		if (res.data.code === '400' ) {
			store.commit(types.USER_LOGOUT);
			if ($route.matched.some(record => record.meta.login)) {
				Vue.prototype.$toast.error(res.retMsg)
				router.push({name:'login'})
			}
		}	
		return res
	}, error => {
		console.log('响应失败：' + error.message) // 调试用
		return Promise.reject(error)
	}
)

// 将axios挂载在prototype上 全局组件可以this.$axios访问
Vue.prototype.$axios = service
export default service
