export default function useUtils() {
  function getImageAssets(fileName: string) {
    return new URL(`../assets/images/${fileName}`, import.meta.url).href;
  }
  return {
    getImageAssets,
  };
}