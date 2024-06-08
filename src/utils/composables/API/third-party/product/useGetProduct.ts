import { axiosThirdParty } from "@/utils/axiosInstance";
import QUERY_KEY from "@/utils/queryKeys";
import { useQuery, type QueryFunctionContext } from "@tanstack/vue-query";

type Params = {
  classification: "creditCard" | "car" | "boat" | "aircraft";
};
function useGetProduct(params: Params) {
  const getProducts = async ({ queryKey }: QueryFunctionContext) => {
    const [_key, params] = queryKey;
    const res = await axiosThirdParty.get(
      `/los/management/products?source=lwnow`,
      {
        params,
      }
    );
    return res.data;
  };
  return useQuery([QUERY_KEY.getProduct, params], getProducts);
}

export default useGetProduct;
