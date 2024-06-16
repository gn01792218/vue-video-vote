import req from './http'

export const getCurrentVideo = ()=>{ //用來取得使用者們的id
  return req("get",'video')
}

// export const postLotteryReport = (payload:PostLotteryReport)=>{
//   return req("post", "ig-lottery/report", {data:payload})
// }
