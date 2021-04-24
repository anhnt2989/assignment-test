import axios from 'axios'
import ApiConfig from 'configs/apiConfig'

const apiConfig = ApiConfig()

const instance = () => {

  let headers: any = {
    'Content-Type': 'application/json'
  }
  let axiosInstance = axios.create({
    baseURL: apiConfig.BASE_URL,
    headers: headers
  })

  axiosInstance.interceptors.request.use(
    (config) => {
      if (config.data) {
        const haveFile = Object.values(config.data).some(
          (e: any) => e && e.toString() === '[object File]'
        )
        if (haveFile) {
          config.headers['Content-Type'] = 'multipart/form-data'
        }
      }

      return config
    },
    (error) => Promise.reject(error)
  )

  axiosInstance.interceptors.response.use(
    (response) => response.data,
    (error) => {
      if (error.response && error.response.data) {
        return Promise.reject({ ...error.response.data })
      } else {
        return Promise.reject({
          error: true,
          message: 'Error Code 100: No response error from server',
          statusCode:
            error && error.request && error.request.status
              ? error.request.status
              : '1899'
        })
      }
    }
  )
  return axiosInstance
}

export default instance
