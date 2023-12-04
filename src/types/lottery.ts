interface Owner{
    id:string,
    name:string
}
export declare interface LotteryItem{
    id:string
    name:string,
    owners:Owner[]  //得獎者
}