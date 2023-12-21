import { defineStore } from "pinia";
import { User } from "../types/user";
// 使用composition API模式定义store
export const useUserStore = defineStore("userStore", () => {
  // 初始状态
  const initState = {
    userList: [],
    userShortCodes:[],
  };
  //states ( ref )
  const userList = ref<User[]>(initState.userList);
  const userShortCodes = ref<string[]>(initState.userShortCodes)
  //getters

  //actions
  function loadUserList() {
    const list:User[] = [
      { id: "14642", name: "齊天大聖" },
      { id: "7789", name: "gn01792218" },
      { id: "789", name: "F792218" },
      { id: "79", name: "方大同" },
      { id: "78519", name: "Wang JJ" },
      { id: "889", name: "孫小美" },
      { id: "189", name: "王小雲" },
      { id: "98589", name: "網美王" },
      { id: "4589", name: "JZsot" },
      { id: "529", name: "wang20105998" },
      { id: "78519", name: "Petter Jean" },
      { id: "8899556", name: "WTFGG" },
      { id: "18966", name: "E04_up6c6" },
      { id: "98589", name: "孫小水" },
      { id: "289789", name: "金泰希" },
      { id: "78519", name: "Json EE" },
      { id: "18966", name: "Cup_up6c6" },
      { id: "289789", name: "金允熙" },
      { id: "78519", name: "Hung Meng Tse" },
      { id: "889", name: "金正恩" },
    ];
    userList.value.push(...list);
  }
  function setUserShortCode(shortCodes:string[]){
    userShortCodes.value = shortCodes
  }
  return {
    //data
    userList,
    //function
    loadUserList,
    setUserShortCode
  };
});
