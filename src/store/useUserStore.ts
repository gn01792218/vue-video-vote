import { defineStore } from "pinia";
import { User } from "../types/user";
// 使用composition API模式定义store
export const useUserStore = defineStore("userStore", () => {
  // 初始状态
  const initState = {
    userList: [],
  };
  //states ( ref )
  const userList = ref<User[]>(initState.userList);

  //getters

  //actions
  function loadUserList() {
    const list:User[] = [
      { id: "14642", name: "sdfsdfsdf" },
      { id: "7789", name: "gn01792218" },
      { id: "789", name: "792218" },
      { id: "79", name: "方大同" },
      { id: "78519", name: "Wang JJ" },
      { id: "889", name: "芸芸眾生何處去" },
      { id: "189", name: "飄飄無所從" },
      { id: "98589", name: "網美王" },
      { id: "4589", name: "JZsot" },
      { id: "529", name: "wang20105998" },
      { id: "78519", name: "Petter Jean" },
      { id: "8899556", name: "WTFGG" },
      { id: "18966", name: "E04_up6c6" },
      { id: "98589", name: "孫小水" },
      { id: "289789", name: "樹倒猢猻散" },
      { id: "78519", name: "Json EE" },
      { id: "18966", name: "Cup_up6c6" },
      { id: "289789", name: "我是一隻雲" },
      { id: "78519", name: "Hung Meng Tse" },
      { id: "889", name: "九天玄女降世" },
    ];
    userList.value.push(...list);
  }

  return {
    //data
    userList,
    //function
    loadUserList,
  };
});
