import axios from 'axios'
import { getToken } from './auth'
import dotenv from 'dotenv'
dotenv.config({
  path: '.env'
})

const api = axios.create({
  baseURL: `http://${process.env.IP_API}:3333/`
})

api.interceptors.request.use(async config => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api