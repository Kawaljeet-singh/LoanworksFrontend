import useApplicationStore from "@/stores/useApplicationStore";
import axiosInstance from "@/utils/axiosInstance";
import QUERY_KEY from "@/utils/queryKeys";
import { useQuery, type QueryFunctionContext } from "@tanstack/vue-query";
import { storeToRefs } from "pinia";
import useGetAppId from "../../useGetAppId";

type Params = {
  isFirstPerson?: 0 | 1;
};
function useGetCitizenship(params: Params = {}) {
  const { applicationStore } = storeToRefs(useApplicationStore());
  const { applicationId } = useGetAppId();

  const { setByName } = useApplicationStore();
  const getDetails = async ({ queryKey }: QueryFunctionContext) => {
    const res = await axiosInstance.get(
      `/application/citizenship-details/${queryKey[1]}/`,
      { params: queryKey[2] }
    );

    return res.data;
  };
  return useQuery(
    [QUERY_KEY.getCitizenshipDetails, applicationId, params],
    getDetails,
    {
      onSuccess(data) {
        if (data.length) {
          switch (data[0].isFirstPerson) {
            case 0:
              setByName("isSecondCitizenExits", true);
              break;
            case 1:
              setByName("isFirstCitizenExits", true);
              break;

            default:
              break;
          }
        }
      },
    }
  );
}

export default useGetCitizenship;
