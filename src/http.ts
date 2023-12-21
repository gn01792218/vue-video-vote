import axios, { AxiosResponse, InternalAxiosRequestConfig,AxiosInstance, AxiosRequestConfig, AxiosHeaders } from 'axios';

//全局的header
let header = localStorage.getItem('Authorization') ? JSON.parse(localStorage.getItem('Authorization')!) : ''

// axios實例
const service:AxiosInstance = axios.create({
  baseURL:'https://api.gamenow.online/',
  headers: { 'Content-Type': 'application/json' },
  timeout: 20000 // 超时时间
});

// 请求攔截
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (err: any) => {
    Promise.reject(err);
  }
);
// 回應攔截
service.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (err: any) => {
    let errMsg = '';
    if (err && err.response.status) {
      switch (err.response.status) {
        case 403:
          errMsg = '拒絕訪問';
          break;
        case 408:
          errMsg = '請求超時';
          break;
        case 500:
          errMsg = 'server內部錯誤';
          break;
        case 501:
          errMsg = 'server未實現';
          break;
        case 503:
          errMsg = '服務不可用';
          break;
        default:
          errMsg = err.response.data.msg;
          break;
      }
    } else {
      errMsg = err;
    }
    console.log(errMsg)
    // Message.error(errMsg);
    return Promise.reject(errMsg);
  }
);
async function getAuthorizationHeader() {
  //  填入自己 ID、KEY 開始
      let invitation_code = '01HJ5326MHBMYJ8RQQPKPAQ38G'
      const token = await service.post('https://api.gamenow.online/token',{invitation_code})
      let Authorization = `Authorization: Bearer ${token.data.token}`;
      const storageData =  {headers:{ 'Authorization': Authorization}}; 
      localStorage.setItem('Authorization', JSON.stringify(storageData)) //存於localstorage
      return storageData
  }
export default async (method:string ,url:string ,data?:any , config?:AxiosRequestConfig)=>{
    method = method.toLowerCase()

    if(!header) header = await getAuthorizationHeader()
    else header = JSON.parse(localStorage.getItem('Authorization')!)
  
    switch(method){
        case 'get':
          return service.get(url,{params:data, headers:header?.headers})
        case 'post':
          return service.post(url,data,header)
    }

}