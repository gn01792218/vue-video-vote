export default function useUtils() {
  function getImageAssets(fileName: string) {
    return new URL(`../assets/images/${fileName}`, import.meta.url).href;
  }
  function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  function randomInRange(min:number, max:number){
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
  return {
    getImageAssets,
    formatDate,
    randomInRange
  };
}
