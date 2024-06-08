import { axiosThirdParty } from "@/utils/axiosInstance";
import { useQuery, type QueryFunctionContext } from "@tanstack/vue-query";
type Params = {
  year: string;
};
function useGetMake(params: Params) {
  const getYears = async ({ queryKey }: QueryFunctionContext) => {
    const [_key, params] = queryKey;
    const res = await axiosThirdParty.get(`/vehicles/cars/makes`, {
      params,
    });
    return res.data;
  };
  return useQuery(["make", params], getYears, {
    // enabled: !!params.year,
  });
}

export default useGetMake;
