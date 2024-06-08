import useApplicationStore from "@/stores/useApplicationStore";
import axiosInstance from "@/utils/axiosInstance";
import QUERY_KEY from "@/utils/queryKeys";
import { useQuery, type QueryFunctionContext } from "@tanstack/vue-query";

import useGetAppId from "../../useGetAppId";
type Props = {
  isFirstPerson?: 0 | 1;
};
function useGetPersonalDetails(params: Props = {}, isDepenteds?: boolean) {
  const { setByName } = useApplicationStore();
  const { applicationId } = useGetAppId();

  const getDetails = async ({ queryKey }: QueryFunctionContext) => {
    const res = await axiosInstance.get(
      `/application/${
        isDepenteds ? "personal-dependents" : "personal-details"
      }/${queryKey[1]}`,
      { params: queryKey[2] }
    );
    // res?.data?.forEach((element: { dob: string }, i: number) => {
    //   if (element.dob) {
    //     const date = new Date(element.dob);
    //     date.setDate(date.getDate() + 1);
    //     res.data[i].dob = date.toISOString();
    //   }
    // });
    return res.data;
  };
  return useQuery(
    [QUERY_KEY.getPersonalDetails, applicationId, params],
    getDetails,
    {
      onSuccess(data) {
        if (data.length) {
          switch (data[0].isFirstPerson) {
            case 0:
              setByName("isSecondPersonExits", true);
              break;
            case 1:
              setByName("isFirstPersonExits", true);
              break;

            default:
              break;
          }
        }
      },
    }
  );
}

export default useGetPersonalDetails;
