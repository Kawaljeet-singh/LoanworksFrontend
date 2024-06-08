import { useRoute } from "vue-router";

function useGetAppId() {
  const route = useRoute();
  const applicationId = Number(route?.params?.appId || 0);
  return { applicationId };
}

export default useGetAppId;
