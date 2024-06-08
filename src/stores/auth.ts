import jwtDecode, { type JwtPayload } from "jwt-decode";
import { defineStore } from "pinia";
interface State {
  accessToken: string | null;
  user: UserInfo | null;
}

export const auth = defineStore({
  id: "counter",
  state: (): State => ({
    accessToken: null,
    user: null as UserInfo | null,
  }),
  getters: {
    checkTokens: (): boolean => {
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const accessToken = localStorage.getItem("accessToken");

        if (!refreshToken && !accessToken) {
          return false;
        }

        // first check, if you have a valid access_token
        if (accessToken) {
          // accessToken may be invalid, or expired, or no refreshToken or refreshToken present or refreshToken may be invalid
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
              // now check for refreshToken
              if (refreshToken) {
                const rtoken = jwtDecode<JwtPayload>(refreshToken as string);
                let exp = null;

                if (rtoken && rtoken?.exp) {
                  exp = rtoken.exp;
                }

                // if no exp date or expired exp date
                if (!exp || exp < new Date().getTime() / 1000) {
                  return false;
                }
              } else {
                return false;
              }
            }
          } catch {
            // invalid accessToken
            // now check for refreshToken
            if (refreshToken) {
              const rtoken = jwtDecode<JwtPayload>(refreshToken as string);
              let exp = null;

              if (rtoken && rtoken?.exp) {
                exp = rtoken.exp;
              }

              // if no exp date or expired exp date
              if (!exp || exp < new Date().getTime() / 1000) {
                return false;
              }
            } else {
              return false;
            }
          }
        } else {
          // we have refreshToken
          // check if refreshToken exists or not
          const rtoken = jwtDecode<JwtPayload>(refreshToken as string);
          let exp = null;

          if (rtoken && rtoken?.exp) {
            exp = rtoken.exp;
          }

          // if no exp date or expired exp date
          if (!exp || exp < new Date().getTime() / 1000) {
            return false;
          }
        }

        // valid token
        return true;
      } catch (e) {
        return false;
      }
    },
  },
  actions: {
    // fn to remove tokens
    getTokens() {
      // check if the user has a valid or a access_token refresh_token
      if (this.checkTokens) {
        return {
          accessToken: localStorage.getItem("accessToken"),
          refreshToken: localStorage.getItem("refreshToken"),
        };
      }
      this.removeTokens;
      return {
        accessToken: null,
        refreshToken: null,
      };
    },
    removeTokens: () => {
      localStorage.removeItem("refreshToken");
    },
    saveAccessTokens(accessToken: string): void {
      localStorage.setItem("accessToken", accessToken);
    },
    loginUser(accessToken: string) {
      this.accessToken = accessToken;
      //   this.refreshToken = refreshToken;

      this.saveAccessTokens(accessToken);
    },
    logoutUser() {
      this.removeTokens;
      localStorage.removeItem("accessToken");
      window.location.reload();
    },
  },
});

interface UserInfo {
  name: string;
  age: number;
}
