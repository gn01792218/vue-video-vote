interface LotteryOwner{
    id:string,
    name:string
}
export declare interface LotteryItem{ //獎項物件
    id:string
    name:string,
    owners:LotteryOwner[]  //得獎者
}