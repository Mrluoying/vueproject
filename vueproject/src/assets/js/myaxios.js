import axios from 'axios'

let myPlugin = {}

myPlugin.install = function(Vue){
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
  
  axios.interceptors.request.use(function (config){
    console.log(config.url)
    // let url = config.url.split('?')[0]

    // console.log(url);

    
    if(config.url !== 'login'){
      //只要不是从login页面发出的请求都要添加请求头
      
      config.headers.common['Authorization'] = window.localStorage.getItem('token')
    }
    return config
  })
  Vue.prototype.$http = axios
}


export default myPlugin