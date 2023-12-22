import { defineStore } from 'pinia';
// 使用composition API模式定义store
export const useCounterStoreForSetup = defineStore('counterForSetup', () => {
  // 初始状态
  const initState = {
    count: 0
  };
  //states ( ref )
  const count = ref<number>(initState.count);

  //getters
  const doubleCount = computed<number>(() => count.value * 2);

  //actions
  function increment() {
    count.value++;
  }

  function reset() {
    count.value = initState.count;
  }

  return { count, doubleCount, increment, reset };
});

