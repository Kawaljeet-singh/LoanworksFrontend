import ClientApi from "../client-api";
import type { AxiosRequestConfig } from "axios";

const endcodeUri = encodeURIComponent;

function querystrings(params: IQueryParams[]) {
  return params
    .map((q) => endcodeUri(q.key) + "=" + endcodeUri(q.value))
    .join("&");
}

export interface IQueryParams {
  key: string;
  value: string;
}

export function remove(baseRoute: string, uri: string, data?: IQueryParams[]) {
  if (data && data.length > 0) {
    uri = `${uri}?${querystrings(data)}`;
  }

  return ClientApi(baseRoute).delete(uri);
}

export function post<TBody>(baseRoute: string, uri: string, data: TBody) {
  console.log(baseRoute);
  return ClientApi(baseRoute).post(uri, data);
}

/*
  Used for posting data like files
*/
export function postWithConfig<TBody>(
  baseRoute: string,
  uri: string,
  data: TBody,
  config: AxiosRequestConfig
) {
  return ClientApi(baseRoute).post(uri, data, config);
}

export function put<TBody>(baseRoute: string, uri: string, data: TBody) {
  return ClientApi(baseRoute).put<TBody>(uri, data);
}

export function get(baseRoute: string, uri: string, data?: IQueryParams[]) {
  if (data && data.length > 0) {
    uri = `${uri}?${querystrings(data)}`;
  }

  return ClientApi(baseRoute).get(uri);
}
