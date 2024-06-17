import req from './http'
import { Video, VideoControlRequest, VideoControler, VideoVoteRequest } from './types/video'

export async function getCurrentVideo(){
  const res = await req("get",`Video.php`)
  return res?.data as Video
}
export async function getVideoByIndex(index:number){ //用來取得使用者們的id
  const res = await req("get",`GetVideo.php?index=${index}`)
  return res?.data as Video
}
export async function getVIdeoControl(){
  const res =await req("get", "VideoControler.php")
  return res?.data as VideoControler
}
export async function postVIdeoControl(payload:VideoControlRequest){
  const res =await req("post", "VideoControler.php", {data:payload})
  return res?.data as VideoControler
}
export async function postVote(payload:VideoVoteRequest){
  await req("post", "Vote.php", {data:payload})
}
export async function reset(){
  const res = await req("get",`ClearAll.php`)
  return res?.data as Video
}
