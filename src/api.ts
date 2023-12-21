import req from './http'
import { GetHashTags, GetUserInfo } from '@/types/lottery'

export const getHashTag = (payload:GetHashTags)=>{ //用來取得使用者們的id
  return req("get",'ig-lottery/tags',payload)
}
export const getUserInfo = ( payLoad:GetUserInfo )=>{ //用來獲得使用者名稱
  return req("get", 'ig-lottery/post', payLoad)
}

export const getToken = () => {
  return req("post", "token", {
    invitation_code:'01HJ5326MHBMYJ8RQQPKPAQ38G',
  });
};
