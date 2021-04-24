import axios from 'axios'
import ApiConfig from 'configs/apiConfig'
import { isArray, forEach } from 'lodash'

const apiConfig = ApiConfig()

const instance = () => {

  let headers: any = {
    'Content-Type': 'application/json'
  }
  // if (authToken) {
  //   headers.Authorization = authToken
  // }
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

export const Utils = {
  buildUrlWithParams: function(url: string, params: any, removeEncode?: any){
    let ret = '';
    url += '?';
    for (var d in params) {
      if (params[d] || params[d] === 0) {
        if(removeEncode){
          // eslint-disable-next-line
          ret += d + '=' + params[d] + '&';
        }else{
          if(isArray(params[d])) {
            // eslint-disable-next-line
            forEach(params[d], (item) => { ret += encodeURIComponent(d) + '=' + encodeURIComponent(item) + '&'});
          }
          else {
            // eslint-disable-next-line
            ret += encodeURIComponent(d) + '=' + encodeURIComponent(params[d]) + '&';
          }
        }
      }
    }
    ret = ret.replace(/&$/, '');
    return url + ret;
  },
  formatNumberWithCommas: function(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },
}

export default instance
