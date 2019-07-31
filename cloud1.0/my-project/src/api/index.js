import Vue from 'vue'
import * as user from './user'
import {URLROOT} from '@/config'

// export const status_ok = '0000'
export const APIROOT = URLROOT
const api = {
// status_ok: status_ok,
  ...user
}

Vue.prototype.$api = api
export default api
