import req from './http'
import { GetHashTags } from '@/types/lottery'

export const getHashTag = (payload:GetHashTags)=>{ //用來取得使用者們的id
  return req("get",'ig-lottery/tags',payload)
}

export const getToken = () => {
  return req("post", "token", {
    invitation_code:'01HJ5326MHBMYJ8RQQPKPAQ38G',
  });
};
