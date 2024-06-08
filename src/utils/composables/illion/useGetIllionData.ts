import data from "./categoriesFromIllion.json";
export type IllioDataType = typeof data;
function useGetIllionData() {
  return data;
}

export default useGetIllionData;
