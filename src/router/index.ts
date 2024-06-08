import useApplicationStore from "@/stores/useApplicationStore";
import axiosInstance from "@/utils/axiosInstance";
import routeNames from "@/utils/route-names/routeName";
import type { AxiosRequestConfig } from "axios";
import { storeToRefs } from "pinia";
import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import creditCardRoutes from "./credit-card/route.creditCard";
import employmentDetailsRoute from "./employment-details/route.employmentDetails";
import personalDetailsRoutes from "./personal-details/route.personalDetails";
import personalLoanRoute from "./personal-loan/route.personalLoan";

import useAuthStore from "@/stores/useAuthStore";
import { section } from "@/types/routeParams";
import LOAN_TYPE from "@/utils/LoanTypes";
import personalLoan from "@/utils/route-names/routeNamePersonalLoan";
import vehicleLoan from "@/utils/route-names/routeNameVehicleLoan";
import reviewYourApplicationRoute from "./review-your-application/route.reviewApplication";
import vehicleLoanRoute from "./vehicle-loan/route.vehicleLoan";
import verifyIncomeExpenseRoute from "./verify-income-expense/route.verifyIncomeExpense";
const LetsGetStartedVue = () => import("@/views/LetsGetStarted.vue");

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "GetStartedCreditCard",
    component: LetsGetStartedVue,
    meta: {
      title: "",
      heading: "",
      getStartedTitle: "Apply for a Credit Card",
      getStartedSubtitle:
        "Get a rate quote in 3-minutes and get a decision in 15-minutes!",
      hideBgLogo: true,
      showGetStartedGeneralInfo: true,
      hideFooter: true,
      nextNavigation: routeNames.creditCard.chooseCreditCard,
      LOAN_TYPE: LOAN_TYPE.CREDIT_CARD_LOAN,
    },
  },
  {
    path: "/vehicle-loan",
    name: vehicleLoan.getStarted,
    component: LetsGetStartedVue,
    meta: {
      title: "",
      heading: "",
      getStartedTitle: "Apply for a Vehicle Loan",
      getStartedSubtitle:
        "Get a rate quote in 5-minutes and get a decision in 15-minutes!",
      hideBgLogo: true,
      showGetStartedGeneralInfo: true,
      hideFooter: true,
      isVehicleLoan: true,
      nextNavigation: vehicleLoan.type.chooseType,
      LOAN_TYPE: LOAN_TYPE.CREDIT_CARD_LOAN,
    },
  },
  {
    path: "/personal-loan",
    name: personalLoan.getStarted,
    component: LetsGetStartedVue,
    meta: {
      title: "",
      heading: "",
      getStartedTitle: "Apply for a Personal Loan",
      getStartedSubtitle:
        "Apply for a Personal Loan and get a decision in 15-minutes!",
      hideBgLogo: true,
      showGetStartedGeneralInfo: true,
      hideFooter: true,
      nextNavigation: personalLoan.getPersonalRates,
      LOAN_TYPE: LOAN_TYPE.PERSONAL_LOAN,
    },
  },

  {
    path: "/:appId",
    children: [
      ...creditCardRoutes,
      ...personalLoanRoute,
      ...vehicleLoanRoute,

      {
        path: "single-or-joint-application",
        name: "SingleOrJointApplication",
        component: () =>
          import("@/views/personal-details/SingleOrJointApplication.vue"),
        meta: {
          stepLength: 1,
          curStep: 1,
          title: "Personal Details",
          progress: "tw-w-[28.57%]",
          heading: "Is this a Single or Joint Application?",
        },
      },
      {
        path: ":type",
        beforeEnter: (to, from) => {
          const exists =
            to.params.type === "single" || to.params.type === "joint";
          if (!exists) return { name: routeNames.noteFound };
        },

        children: [
          {
            path: "personal-details",
            meta: {
              progress: "tw-w-[28.57%]",
              stepLength: 8,
            },
            children: personalDetailsRoutes,
          },

          {
            path: ":person",
            beforeEnter: async (to, from, next) => {
              const exists =
                (to.params.type === "single" && to.params.person === "1") ||
                (to.params.type === "joint" &&
                  (to.params.person === "0" || "1"));
              if (!exists) return { name: routeNames.noteFound };

              next();
            },
            meta: {
              title: "{PersonX} Details",
            },
            // redirect: "/single-application/personal-consent",
            children: [
              {
                path: "employment-details",
                meta: {
                  progress: "tw-w-[50%]",
                },
                children: employmentDetailsRoute,
              },
              {
                path: "verify-income-expense",
                meta: {
                  title: "Income & Expenses",
                  progress: "tw-w-[75%]",
                  section: section.incomeExpense,
                },
                children: verifyIncomeExpenseRoute,
              },
            ],
          },
          {
            path: "review",
            meta: {
              title: "Review & Submit",
            },
            children: reviewYourApplicationRoute,
          },
        ],
      },
    ],
  },

  {
    path: "/admin",
    redirect: "/admin/login",
    children: [
      {
        path: "login",
        name: routeNames.admin.login,
        components: {
          "choose-product": () => import("@/views/admin/AdminLogin.vue"),
        },
        meta: {
          hideDefault: true,
          title: "Admin Dashboard",
        },
      },
      {
        path: "dashboard",
        name: routeNames.admin.dashboard,
        components: {
          "choose-product": () => import("@/views/admin/AdminDashboard.vue"),
        },
        beforeEnter(to, from, next) {
          const store = storeToRefs(useAuthStore());
          if (!store.auth.value.isAuthenticated)
            next({ name: routeNames.admin.login });
          next();
        },
        meta: {
          hideDefault: true,
          title: "Admin Dashboard",
        },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: routeNames.noteFound,
    component: () => import("@/views/NotFound.vue"),
    meta: {
      title: "Not Found",
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ left: 0, top: 0, behavior: "smooth" });
      }, 800);
    });
  },
});

// Axios Instance
router.beforeEach(() => {
  const { getTokens } = useAuthStore();
  useApplicationStore();
  axiosInstance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      // bottom line is required, if you are using react-query or something similar
      if (config.headers["Authorization"]) {
        config.headers["Authorization"] = null;
      }
      config.headers["Authorization"] = "Bearer " + getTokens().accessToken;
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    function (response) {
      return response;
    }
    // function (error) {
    //   const originalRequest = error.config;
    //   // store.dispatch(logoutUser());
    //   // if refresh also fails with 401
    //   // console.log(error);
    //   if (error?.response?.status === 401) {
    //     return logoutUser();
    //   }

    //   // if retried request failed with 401 status
    //   if (error?.response?.status === 401 && originalRequest._retry) {
    //     // doesn't stops here, but also shows all the toast below due to Promise reject at the bottom
    //     return logoutUser();
    //   }
    //   throw new Error(error);
    // }
  );
});

const check = (s: string) => {
  const regex = new RegExp("{PersonX}", "g");
  return regex.test(s);
};
const replaceWith = (s: string, value: string) => {
  return s.replace(/{PersonX}/g, value);
};

router.beforeResolve(async (to, from, next) => {
  const { title } = to.meta;

  if (check(to.meta.title as string) && to.params.person) {
    // const { data } = useGetPersonalDetails();
    // const { data } = useGetPersonalDetails();
    const applicationId = to.params.appId;

    const getCustomerDetails = async () => {
      const res = await axiosInstance.get(
        `/application/personal-details/${applicationId}`,
        {
          params: {
            isFirstPerson: Number(to.params.person),
          },
        }
      );

      return res.data[0];
    };
    const data = await getCustomerDetails();

    if (data) {
      const personX = data.firstName;
      if (personX) {
        to.meta.title = replaceWith(to.meta.title as string, personX + "'s");
        if (to.meta.heading)
          to.meta.heading = replaceWith(to.meta.heading as string, personX);
        to.meta.personX = personX;
      }
    }

    next();
  } else next();
});
export default router;
