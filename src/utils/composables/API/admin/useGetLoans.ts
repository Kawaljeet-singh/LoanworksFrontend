import axiosInstance from "@/utils/axiosInstance";
import QUERY_KEY from "@/utils/queryKeys";
import { useQuery, type QueryFunctionContext } from "@tanstack/vue-query";

function useGetLoans() {
  const getDetails = async ({ queryKey }: QueryFunctionContext) => {
    const res = await axiosInstance.get(`/admin/saved-application`);

    return res.data;
  };
  return useQuery([QUERY_KEY.adminGetAllLOans], getDetails);
}

export default useGetLoans;
