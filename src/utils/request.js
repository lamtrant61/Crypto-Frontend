/* eslint-disable no-undef */
import axios from 'axios'
import store from '@/store'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': '*'
  },
  timeout: 10000
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
    }
    return config
  },
  error => Promise.reject(error)
)

// response interceptor
service.interceptors.response.use(
  async(response) => {
    const res = response.data
    return res
  },
  error => {
    if (error.response?.status === 500 || error.response?.status === 404 || error.response?.status === 401 || error.response?.status === 403 || error.response?.status === 400) {
      return error.response.data
    } else {
      // Message.error(error.message || 'Có lỗi xảy ra vui lòng thử lại sau')
      return Promise.reject(error)
    }
  }
)

export default service
