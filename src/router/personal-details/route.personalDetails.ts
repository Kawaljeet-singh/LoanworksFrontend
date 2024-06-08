import { idNumber, person } from "@/types/routeParams";
import routeNames, {
  routePersonalDetails,
} from "@/utils/route-names/routeName";
import type { RouteRecordRaw } from "vue-router";
import yourPersonalDetails from "./route.YourPersonalDetails";
import verifyYourIdentityPersonalDetails from "./route.personalDetails.verifyYouIdentity";
const { personalDetails } = routeNames;
const loginFlow: RouteRecordRaw[] = [
  {
    name: routeNames.personalDetails.existingCustomer.isExistingCustomer,
    path: "existing",
    component: () =>
      import("@/views/personal-details/SingleExistingCustomer.vue"),
    meta: {
      heading: "{PersonX}, are you an existing customer?",
      nextNavigation: {
        yes: personalDetails.existingCustomer.login,
        no: personalDetails.newApplication.gettingDetails,
      },
      curStep: 2,
    },
  },
  {
    name: routeNames.personalDetails.existingCustomer.login,
    path: "customer/login",
    component: () =>
      import(
        "@/views/personal-details/existing-customer/ExistingCustomerLogin.vue"
      ),
    meta: {
      nextNavigation: routeNames.personalDetails.existingCustomer.otp,
      curStep: 2,
    },
  },
  {
    name: routeNames.personalDetails.existingCustomer.otp,
    path: "customer/otp",
    component: () =>
      import("@/views/personal-details/existing-customer/VerifyOtp.vue"),
    meta: {
      nextNavigation:
        routeNames.personalDetails.yourPersonalDetails.checkYourDetails,
      curStep: 2,
    },
  },
];

const personalDetailsRoutes: RouteRecordRaw[] = [
  {
    path: ":person",
    beforeEnter: async (to, from, next) => {
      const exists =
        (to.params.type === "single" && to.params.person === "1") ||
        (to.params.type === "joint" && (to.params.person === "0" || "1"));
      if (!exists) return { name: routeNames.noteFound };

      next();
    },
    meta: {
      title: "{PersonX} Details",
    },
    // redirect: "/single-application/personal-consent",
    children: [
      {
        path: "personal-consent",
        name: personalDetails.customerConsent,
        component: () =>
          import("@/views/personal-details/SingleCustomerConsent.vue"),
        meta: {
          title: "Your Personal Details",
          heading: "Customer Consent",
          nextNavigation:
            routeNames.personalDetails.existingCustomer.isExistingCustomer,
          curStep: 1,
        },
      },
      ...loginFlow,
      {
        name: routeNames.personalDetails.newApplication.gettingDetails,
        path: "getting-your-details",
        component: () =>
          import(
            "@/views/personal-details/new-application/GettingPersonalDetails.vue"
          ),
        meta: {
          isFirstPerson: true,
          heading: "Getting your personal details",
          nextNavigation: {
            yes: routeNames.personalDetails.newApplication.keepScreenOpen,
            no: routeNames.personalDetails.yourPersonalDetails.checkYourDetails,
          },
        },
      },
      {
        name: routeNames.personalDetails.newApplication.keepScreenOpen,
        path: "keep-screen-open",
        meta: {
          isFirstPerson: true,
          nextNavigation:
            routeNames.personalDetails.yourPersonalDetails.checkYourDetails,
        },
        component: () =>
          import(
            "@/views/personal-details/new-application/KeepThisScreenOpen.vue"
          ),
      },
      // take personal details
      {
        path: "person",
        name: routeNames.personalDetails.giveYourDetails,
        beforeEnter: (to, from) => {
          if (to.params.person === person.second) {
            to.meta.heading = "Please tell us about the 2nd applicant";
            to.meta.title = "Personal Details";
          }
        },
        component: () =>
          import(
            "@/views/personal-details/joint-application/PersonDetails.vue"
          ),
        meta: {
          applicant: "firstApplicant",
          heading: "Hi {PersonX}, please confirm your details.",
          nextNavigation: routeNames.personalDetails.customerConsent,
          curStep: 2,
        },
      },

      // Check Details
      {
        path: "your-personal-details/:fetch",
        redirect: {
          name: routeNames.personalDetails.yourPersonalDetails.checkYourDetails,
        },
        meta: {
          isFirstPerson: true,
        },
        children: yourPersonalDetails,
      },
      // Identity
      {
        path: "identity/:idNumber",
        beforeEnter: (to, from) => {
          const exists =
            to.params.idNumber === idNumber.one ||
            to.params.idNumber === idNumber.two;
          if (!exists) return { name: routeNames.noteFound };
        },
        redirect: {
          name: routeNames.personalDetails.yourPersonalDetails.checkYourDetails,
        },
        meta: {
          stepLength: 3,
        },
        children: verifyYourIdentityPersonalDetails,
      },
    ],
  },

  {
    path: "we-have-problem",
    name: routePersonalDetails.weHaveAProblem,
    component: () => import("@/views/personal-details/WeHaveAProblem.vue"),
    meta: {
      title: "Your Personal Details",
      heading: "Sorry {PersonX}, we have a problem.",
      // nextNavigation: routePersonalDetails,
    },
  },
];

export default personalDetailsRoutes;
