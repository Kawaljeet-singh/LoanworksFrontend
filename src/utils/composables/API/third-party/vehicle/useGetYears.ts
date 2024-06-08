import { axiosThirdParty } from "@/utils/axiosInstance";
import { useQuery, type QueryFunctionContext } from "@tanstack/vue-query";

type Types = "cars" | "boats";
type isEngine = "trailers" | "engines";

function useGetYears(type: Types, isEngine?: isEngine) {
  const getYears = async ({ queryKey }: QueryFunctionContext) => {
    const res = await axiosThirdParty.get(
      `/vehicles/${type}${isEngine ? "/" + isEngine : ""}/years`
    );
    return res.data;
  };
  return useQuery(["years", type, isEngine], getYears);
}

export default useGetYears;
