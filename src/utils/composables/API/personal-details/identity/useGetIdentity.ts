import useApplicationStore from "@/stores/useApplicationStore";
import axiosInstance from "@/utils/axiosInstance";
import useGetAppId from "@/utils/composables/useGetAppId";
import QUERY_KEY from "@/utils/queryKeys";
import { useQuery, type QueryFunctionContext } from "@tanstack/vue-query";

type Props = {
  isFirstPerson?: 0 | 1;
};
function useGetIdentity(params: Props = {}) {
  const { applicationId } = useGetAppId();

  const { setByName } = useApplicationStore();
  const getDetails = async ({ queryKey }: QueryFunctionContext) => {
    const res = await axiosInstance.get(
      `/application/identity-details/${queryKey[1]}/`,
      { params: queryKey[2] }
    );

    return res.data;
  };
  return useQuery(
    [QUERY_KEY.getIdentityDetails, applicationId, params],
    getDetails,
    {
      onSuccess(data) {
        if (data.length) {
          switch (data[0].isFirstPerson) {
            case 0:
              setByName("isSecondPersonIdentity", true);
              break;
            case 1:
              setByName("isFirstPersonIdentity", true);
              break;

            default:
              break;
          }
        }
      },
    }
  );
}

export default useGetIdentity;
