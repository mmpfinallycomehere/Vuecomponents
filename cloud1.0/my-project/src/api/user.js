import http from '../untils/http'
const perfix = 'xxxxx-user' // api接口前缀

// 用户登录
export function UserLogin (params) {
  return http.post(`${perfix}/xxx/xxx/Login`, params)
}
