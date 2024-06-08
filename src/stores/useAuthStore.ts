import jwtDecode, { type JwtPayload } from "jwt-decode";
import { defineStore } from "pinia";
import { reactive } from "vue";

type AuthTypes = {
  isAuthenticated: boolean;
  accessToken: string;
};

const useAuthStore = defineStore(
  "AuthStore",
  () => {
    const auth: AuthTypes = reactive({
      isAuthenticated: false,
      accessToken: "",
    });
    function setByName<K extends keyof AuthTypes>(
      name: K,
      value: AuthTypes[K]
    ) {
      auth[name] = value;
    }

    const checkTokens = (): boolean => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          return false;
        }

        // first check, if you have a valid access_token
        // accessToken may be invalid, or expired
        try {
          // decode the token
          // invalid or malformed token will throw error
          const atoken = jwtDecode<JwtPayload>(accessToken as string);
          let exp = null;

          if (atoken && atoken?.exp) {
            exp = atoken.exp;
          }

          // if no exp date or expired exp date
          if (!exp || exp < new Date().getTime() / 1000) {
            // invalid accessToken
            return false;
          }
        } catch {
          // invalid accessToken
          return false;
        }

        // valid token
        return true;
      } catch (e) {
        return false;
      }
    };
    function getTokens() {
      // check if the user has a valid or a access_token refresh_token
      if (checkTokens()) {
        const token = localStorage.getItem("accessToken");
        if (!auth.accessToken || !auth.isAuthenticated) loginUser(token);
        return {
          accessToken: token,
        };
      }
      removeTokens();
      return {
        accessToken: "",
      };
    }

    const saveAccessTokens = (accessToken: string): void => {
      localStorage.setItem("accessToken", accessToken);
    };
    const loginUser = (accessToken: string) => {
      auth.accessToken = accessToken;
      auth.isAuthenticated = true;
      saveAccessTokens(accessToken);
    };

    const removeTokens = () => {
      localStorage.removeItem("accessToken");
      auth.accessToken = "";
      auth.isAuthenticated = false;
    };
    const logoutUser = () => {
      removeTokens();
      localStorage.removeItem("accessToken");
      window.location.reload();
    };

    return {
      setByName,
      auth,
      logoutUser,
      loginUser,
      getTokens,
    };
  },
  {
    persist: { storage: sessionStorage },
  }
);

export default useAuthStore;
