<template>
	<div class="userlogin">
		<p>xxxxxhello-world</p>
	</div>
</template>
<script>
export default {
	data () {
		return {
			account: '',
			pwd: ''
		}
	},
	methods: {
		// 用户登录
		userLoginFn () {
			let params = {
				account: this.account,
				pwd: this.pwd
			}
			this.$api.UserLogin(params).then(res =>{
				if (res.data.code == '0000') {
					console.log('登录成功')
				}
			})
		}
	}
}
</script>
