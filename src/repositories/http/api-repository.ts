import {
  post,
  get,
  put,
  remove,
  type IQueryParams,
} from "../../utils/http/http-request";

const baseRoute = `${import.meta.env.VITE_APP_API_ROUTE}`;

export default {
  ApiGet(uri: string, data?: IQueryParams[]) {
    return get(baseRoute, uri, data);
  },

  ApiPost<TBody>(uri: string, data: TBody) {
    return post(baseRoute, uri, data);
  },

  ApiPut<TBody>(uri: string, data: TBody) {
    return put(baseRoute, uri, data);
  },

  ApiDelete(uri: string, data?: IQueryParams[]) {
    return remove(baseRoute, uri, data);
  },
};
