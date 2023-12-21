import { defineStore } from 'pinia';
// 使用composition API模式定义store
export const useLoadingStore = defineStore('loadingStore', () => {
  // 初始状态
  const initState = {
    loading: false,
    loadingText:'努力搜尋中...',
  };
  //states ( ref )
  const loading = ref<boolean>(initState.loading)
  const loadingText = ref(initState.loadingText)
  //actions
  function setLoading(payload:boolean) {
    loading.value = payload
  }
  function setLoadingText(payload:string){
    loadingText.value = payload
  }
  function resetLoadingText(){
    loadingText.value = initState.loadingText
  }
  return { 
    //data
    loading, 
    loadingText,
    //function
    setLoading, 
    setLoadingText, 
    resetLoadingText 
  };
});