import axios, { type AxiosInstance } from "axios";
// import { UserModule } from "@/store/modules/user";

// for now to handle failed auth with existing f5 auth
function initializeResponseInterceptor(clientApi: AxiosInstance): void {
  clientApi.interceptors.response.use(
    (response) => {
      return response;
    },
    function (error) {
      if (error.response.status === 401 || error.response.status == 302) {
        window.open("/Logout", "_self");

        return Promise.reject(error);
      }

      // here we would have re-auth logic but until not coupled to F5 auth

      return Promise.reject(error);
    }
  );
}

export default function ClientApi(apiRoute: string) {
  const clientApi = axios.create();
  //   const token = UserModule.apiToken;

  clientApi.defaults.baseURL = apiRoute + "/";

  clientApi.defaults.headers.common["Cache-Control"] =
    "no-cache, no-store, must-revalidate";
  clientApi.defaults.headers.common["Pragma"] = "no-cache";
  clientApi.defaults.headers.common["Expires"] = "0";
  clientApi.defaults.headers.common["Content-Type"] = "application/json";

  //   clientApi.defaults.headers.common["APITOKEN"] =
  //     token == "" ? "09890a03-7319-4c76-98bf-d35557d697d8" : token;

  //NEED TO CHANGE API FROM USER-AGENT TO JUST AGENT?????
  //   clientApi.defaults.headers.common["AGENT"] = "MacquarieTelecom-MacquarieView";

  initializeResponseInterceptor(clientApi);

  return clientApi;
}
