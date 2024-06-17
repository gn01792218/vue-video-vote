import axios, {
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
} from "axios";

// axios實例
const service: AxiosInstance = axios.create({
  baseURL: "https://ebrainzone.com/PVAPI/",
  headers: { "Content-Type": "application/json" },
  timeout: 30000, // 超时时间
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
  (err: AxiosError) => {
    let errMsg = "";
    if (err) {
      switch (err.response?.status) {
        case 403:
          errMsg = "拒絕訪問";
          break;
        case 408:
          errMsg = "請求超時";
          break;
        case 500:
          errMsg = "server內部錯誤";
          break;
        case 501:
          errMsg = "server未實現";
          break;
        case 503:
          errMsg = "服務不可用";
          break;
        default:
          errMsg = err.message;
      }
    } else {
      errMsg = err;
    }
    if (axios.isCancel(err)) {
      console.log("請求被取消：", err.message);
    }
    return Promise.reject(errMsg);
  }
);
export default async (
  method: string,
  url: string,
  data?: any,
  config?: AxiosRequestConfig
) => {
  method = method.toLowerCase();

  switch (method) {
    case "get":
      return service.get(url, { params: data });
    case "post":
      return service.post(url, data);
  }
};
