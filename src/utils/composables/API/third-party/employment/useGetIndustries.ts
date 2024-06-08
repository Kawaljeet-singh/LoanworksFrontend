import { axiosThirdParty } from "@/utils/axiosInstance";
import { useQuery, type UseQueryOptions } from "@tanstack/vue-query";

function useGetIndustries() {
  const getIndustries = async ({ queryKey }: UseQueryOptions) => {
    const res = await axiosThirdParty.get(
      `/los/management/borrowers/industries`
    );
    return res.data;
  };
  return useQuery(["industries"], getIndustries);
}

export default useGetIndustries;
