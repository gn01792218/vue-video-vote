interface LotteryOwner{
    id:string,
    name:string
}
export declare interface LotteryItem{ //獎項物件
    id:string
    name:string,
    owners:LotteryOwner[]  //得獎者
}
export interface GetHashTags{
    keyword:string,
    start:string,
    end:string
}
export interface GetUserInfo{
    shortcode:string,
}