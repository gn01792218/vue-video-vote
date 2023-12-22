import { defineStore } from "pinia";
import { LotteryItem } from "../types/lottery";
// 使用composition API模式定义store
export const useLotteryStore = defineStore("lotteryStore", () => {
  // 初始状态
  const initState = {
    lotteryList: [
      { 
        id:'001',
        name: "一獎",
        owners: [],
      },
      {
        id:'002',
        name: "二獎",
        owners: [],
      },
      {
        id:'003',
        name: "三獎",
        owners: [],
      },
      {
        id:'004',
        name: "四獎",
        owners: [],
      },
      {
        id:'005',
        name: "五獎",
        owners: [],
      },
    ],
  };
  //states ( ref )
  const lotteryList = ref<LotteryItem[]>(initState.lotteryList);

  //getters

  //actions
  function loadLotteryList() {
    lotteryList.value.push(
      // { 
      //   id:'001',
      //   name: "一獎",
      //   owners: [],
      // },
      // {
      //   id:'002',
      //   name: "二獎",
      //   owners: [],
      // },
      // {
      //   id:'003',
      //   name: "三獎",
      //   owners: [],
      // },
      // {
      //   id:'004',
      //   name: "四獎",
      //   owners: [],
      // },
      // {
      //   id:'005',
      //   name: "五獎",
      //   owners: [],
      // },
      // {
      //   id:'006',
      //   name: "E賞",
      //   owners: [ {id:'529',name:'wang20105998'},
      //     {id:'78519',name:'Petter Jean'},
      //     {id:'8899556',name:'WTFGG'},
      //     {id:'18966',name:'E04_up6c6'},
      //     {id:'98589',name:'孫小水'},
      //     {id:'289789',name:'樹倒猢猻散'}
      //   ],
      // },
      // {
      //   id:'007',
      //   name: "F賞",
      //   owners: [ 
      //     {id:'78519',name:'Petter Jean'},
      //     {id:'18966',name:'E04_up6c6'},
      //     {id:'289789',name:'樹倒猢猻散'}
      //   ],
      // },
      // {
      //   id:'008',
      //   name: "F1賞",
      //   owners: [],
      // },
      // {
      //   id:'009',
      //   name: "F2賞",
      //   owners: [
      //     {id:'79',name:'方大同'},
      //     {id:'78519',name:'Petter Wang'},
      //     {id:'889',name:'芸芸眾生何處去'},
      //     {id:'189',name:'飄飄無所從'},
      //     {id:'98589',name:'網美王'},
      //     {id:'4589',name:'JZsot'}
      //   ],
      // },
      // {
      //   id:'0010',
      //   name: "特別賞",
      //   owners: [ 
      //     {id:'78519',name:'全場我最特別'},
      //     {id:'18966',name:'E04_up6c6'},
      //   ],
      // },
      // {
      //   id:'0011',
      //   name: "限定賞",
      //   owners: [ 
      //     {id:'719',name:'黑箱我最行'},
      //     {id:'1266',name:'up6c6_2010_04'},
      //   ],
      // },
      // {
      //   id:'0012',
      //   name: "最終賞",
      //   owners: [ 
      //     {id:'9',name:'沒有人'},
      //     {id:'66',name:'no-body-124'},
      //   ],
      // },
      //  {
      //   id:'0013',
      //   name: "G賞",
      //   owners: [ 
      //     {id:'78519',name:'全場我最特別'},
      //     {id:'18966',name:'E04_up6c6'},
      //   ],
      // },
      // {
      //   id:'0014',
      //   name: "特別中的特別賞",
      //   owners: [ 
      //     {id:'719',name:'黑箱我最行'},
      //     {id:'1266',name:'up6c6_2010_04'},
      //   ],
      // },
      // {
      //   id:'0015',
      //   name: "Z賞",
      //   owners: [ 
      //     {id:'9',name:'沒有人'},
      //     {id:'66',name:'no-body-124'},
      //   ],
      // }
    );
  }

  return { 
    //data
    lotteryList, 
    //function
    loadLotteryList 
  };
});
