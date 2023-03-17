import axios from 'axios'

const server = axios.create({
  timeout: 12 * 1000,
  baseURL: 'http://localhost:3000'
})

// 请求拦截
server.interceptors.request.use((config) => {
  return config
})

// 响应拦截
server.interceptors.response.use(
  (response) => {
    if (response.status < 200 || response.status > 299) return Promise.reject(response.data)
    return response.data
  },
  (err) => {
    Promise.reject(err.response)
  }
)

export default server
