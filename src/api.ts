import req from './http'
import { Video, VideoControlRequest, VideoControler } from './types/video'

export async function getCurrentVideo(){ //用來取得使用者們的id
  const res = await req("get",'video')
  return res?.data as Video
}
export async function getVIdeoControl(){
  const res =await req("get", "video/controler")
  return res?.data as VideoControler
}
export async function postVIdeoControl(payload:VideoControlRequest){
  const res =await req("post", "video/controler", {data:payload})
  return res?.data as VideoControler
}
