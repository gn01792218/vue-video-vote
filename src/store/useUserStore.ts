import { defineStore } from "pinia";
import { User } from "../types/user";
// 使用composition API模式定义store
export const useUserStore = defineStore("userStore", () => {
  // 初始状态
  const initState = {
    userList: [],
  };
  //states ( ref )
  let userList = ref<User[]>(initState.userList);
  //getters

  //actions
  function pushUserList(payload: User) {
    if(userList.value.find(user=>user.name === payload.name)) return
    userList.value.push(payload)
  }
  function resetUserList() {
    userList.value = [];
  }
  return {
    //data
    userList,
    //function
    pushUserList,
    resetUserList,
  };
});
