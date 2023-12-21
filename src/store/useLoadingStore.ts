import { defineStore } from 'pinia';
// 使用composition API模式定义store
export const useLoadingStore = defineStore('loadingStore', () => {
  // 初始状态
  const initState = {
    loading: false
  };
  //states ( ref )
  const loading = ref<boolean>(initState.loading);
  //actions
  function setLoading(payload:boolean) {
    loading.value = payload
  }
  return { loading, setLoading };
});