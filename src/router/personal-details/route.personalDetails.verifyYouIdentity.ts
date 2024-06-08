import { person, section, type } from "@/types/routeParams";
import routeNames, {
  routePersonalDetails,
} from "@/utils/route-names/routeName";
import type { RouteRecordRaw } from "vue-router";

const verifyYourIdentityPersonalDetails: RouteRecordRaw[] = [
  {
    path: "choose-id",
    name: routePersonalDetails.verifyYourIdentity.chooseIdType,
    component: () =>
      import("@/views/personal-details/verification/ChooseIdType.vue"),
    meta: {
      title: "{PersonX} Details",
      curStep: 1,
    },
  },
  {
    path: "choose-id/driving-license",
    name: routePersonalDetails.verifyYourIdentity.drivingLicense,
    component: () =>
      import("@/views/personal-details/verification/VerifyDrivingLicense.vue"),
    meta: {
      title: "{PersonX} Details",
      nextNavigation: routePersonalDetails.verifyYourIdentity.chooseIdType,
      curStep: 2,
    },
  },
  {
    path: "choose-id/passport",
    name: routePersonalDetails.verifyYourIdentity.passport,
    component: () =>
      import("@/views/personal-details/verification/VerifyPassport.vue"),
    meta: {
      title: "{PersonX} Details",
      nextNavigation: routePersonalDetails.verifyYourIdentity.chooseIdType,
      curStep: 2,
    },
  },
  {
    path: "choose-id/medicare",
    name: routePersonalDetails.verifyYourIdentity.medicare,
    component: () =>
      import("@/views/personal-details/verification/VerifyMedicare.vue"),
    meta: {
      title: "{PersonX} Details",
      curStep: 2,
      nextNavigation: routePersonalDetails.verifyYourIdentity.chooseIdType,
    },
  },
  {
    path: "identity-verified",
    name: routePersonalDetails.yourIdentityIsConfirmed,

    component: () =>
      import("@/views/personal-details/YourIdentityIsConfirmed.vue"),

    meta: {
      title: "{PersonX} Details",
      heading: "Your identity is confirmed",
      stepLength: 0,

      nextNavigation:
        routeNames.employmentDetails.currentEmployment.currentEmployer,
      section: section.personalDetails,
    },
  },
];

export default verifyYourIdentityPersonalDetails;
