import axios from 'axios'


// 创建一个 axios 的实例
const instance = axios.create({
  timeout: 5000,
  baseURL: ''
})

// 处理请求拦截
instance.interceptors.request.use(
  config => {
    console.log(config);
    return config
  },
  error => {
    console.log('请求发送到服务器失败的话，会进入到这个函数')
  }
)

// 处理响应拦截
instance.interceptors.response.use(
  response => {
    return response.data
  },

  error => {
    console.log(error.response);

    return Promise.reject(error);
  }
)

export default instance
