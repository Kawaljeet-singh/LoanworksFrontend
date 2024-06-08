import useAuthStore from "@/stores/useAuthStore";
import axiosInstance from "@/utils/axiosInstance";
import routeNames from "@/utils/route-names/routeName";
import { useMutation } from "@tanstack/vue-query";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

type PostData = {
  username: string;
  password: string;
};

function useLogin() {
  const toast = useToast();
  const router = useRouter();
  const { loginUser } = useAuthStore();
  const mutateApplication = async (postData: PostData) => {
    const res = await axiosInstance.post(`/admin/login`, postData);
    if (!res) throw new Error();
    return res;
  };
  return useMutation(mutateApplication, {
    onSuccess: (newData, payload) => {
      console.log(newData);
      try {
        loginUser(newData.data.token);
        router.push({
          name: routeNames.admin.dashboard,
        });
      } catch (error) {
        console.log(error);
      }
    },
    onError(error, variables, context) {
      toast.error("Invalid username or password");
    },
  });
}

export default useLogin;
