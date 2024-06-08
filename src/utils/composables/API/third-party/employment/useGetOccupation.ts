import { axiosThirdParty } from "@/utils/axiosInstance";
import { useQuery, type UseQueryOptions } from "@tanstack/vue-query";

function useGetOccupation() {
  const getYears = async ({ queryKey }: UseQueryOptions) => {
    const res = await axiosThirdParty.get(
      `/los/management/borrowers/occupations`
    );
    return res.data;
  };
  return useQuery(["occupation"], getYears);
}

export default useGetOccupation;
