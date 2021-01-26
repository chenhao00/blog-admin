import axios from 'axios';
import config from './config';

const instance = axios.create({
  baseURL: config.backendBaseUrl,
  timeout: 30000,
  headers: {
    'Accept': 'application/json',
    'Content-type': 'application/json'
  }
});

// 添加请求拦截器
instance.interceptors.request.use(
  (axiosConfig) => {
    const token = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).token;
    if (token) {
      axiosConfig.headers['token'] = token;
    }
    return axiosConfig;
  },
  error => Promise.reject(error)
);

// 添加请求相应拦截器
instance.interceptors.response.use(
  response => response.data,
  (error) => {
    console.log(error);
    // error.message = '系统异常，请稍后再试';
    // error.code = 1;
    // if (error && error.response) {
    //   error.code = error.response.data.code;
    //   switch (error.response.status) {
    //     case 400:
    //       error.message = '请求错误';
    //       break;
    //     case 401:
    //       this.$message({
    //         message: error.message,
    //         type: 'error',
    //         duration: 1000,
    //         onClose: () => {
    //           //
    //         }
    //       });
    //       break;
    //     default:
    //       break;
    //   }
    // }
    // return {
    //   code: error.code,
    //   msg: error.message
    // };
  }
);

export default instance;
