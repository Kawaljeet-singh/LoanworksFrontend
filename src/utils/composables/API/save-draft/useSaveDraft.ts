import useApplicationStore from "@/stores/useApplicationStore";
import useSaveDraftStore from "@/stores/useSaveDraftStore";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation } from "@tanstack/vue-query";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";
import useGetAppId from "../../useGetAppId";

type postData = {
  draftId?: number;
  email: string;
  phoneNumber: string;
  draftStepUrl: string;
  applicationStatus?: string;
  applicationId?: number;
};

function useSaveDraft() {
  const { applicationStore } = storeToRefs(useApplicationStore());
  const { setByName } = useSaveDraftStore();
  const { applicationId } = useGetAppId();

  const route = useRoute();
  const toast = useToast();
  const handleMutate = async (postData: postData) => {
    return axiosInstance.post(`/application/draft-application`, {
      applicationId,
      ...postData,
    });
  };
  return useMutation(handleMutate, {
    onSuccess: (res, payload: postData) => {
      setByName("email", payload.email);
      setByName("mobileNumber", payload.phoneNumber);
      const host = window.location.origin;
      console.log(host + payload.draftStepUrl);
      toast.success("Draft Saved");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });
}

export default useSaveDraft;
