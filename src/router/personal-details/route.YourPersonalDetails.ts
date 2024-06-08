import { period } from "@/types/routeParams";
import routeNames from "@/utils/route-names/routeName";
import type { RouteRecordRaw } from "vue-router";
const { personalDetails } = routeNames;

const yourPersonalDetails: RouteRecordRaw[] = [
  {
    path: "check-details",
    name: routeNames.personalDetails.yourPersonalDetails.checkYourDetails,
    component: () =>
      import(
        "@/views/personal-details/your-personal-details/CheckYourDetails.vue"
      ),
    meta: {
      isFirstPerson: true,
      heading: "{PersonX}, please check your information:",
      nextNavigation: personalDetails.yourPersonalDetails.yourCitizenship,
      curStep: 2,
    },
  },
  {
    path: "citizenship-details",
    name: personalDetails.yourPersonalDetails.yourCitizenship,
    component: () =>
      import(
        "@/views/personal-details/your-personal-details/YourCitizenShipStatus.vue"
      ),
    meta: {
      title: "{PersonX} Details",
      heading: "What is your Citizenhip Status?",
      nextNavigation: {
        australian: personalDetails.yourPersonalDetails.currentAddress,
        nonAustralian: personalDetails.yourPersonalDetails.nonResident,
      },
      curStep: 3,
    },
  },
  {
    path: "citizenship-country",
    name: personalDetails.yourPersonalDetails.nonResident,
    component: () =>
      import(
        "@/views/personal-details/your-personal-details/NotResidentAustrailia.vue"
      ),
    meta: {
      heading: "",
      nextNavigation: personalDetails.yourPersonalDetails.currentAddress,
      curStep: 3,
    },
  },
  {
    path: ":period",
    beforeEnter(to, from) {
      const exists =
        to.params.period === period.current ||
        to.params.type === period.previous;
      // if (!exists) return { name: routeNames.noteFound };
    },
    meta: {
      isCurrent: true,
    },
    children: [
      {
        path: "address",
        name: personalDetails.yourPersonalDetails.currentAddress,
        beforeEnter: (to, from) => {
          if (to.params.period === period.previous) {
            to.meta.heading = "What was your previous address?";
            to.meta.curStep = 7;
          }
        },
        component: () =>
          import(
            "@/views/personal-details/your-personal-details/CurrentAddress.vue"
          ),
        meta: {
          heading: "What is your current address?",
          nextNavigation: personalDetails.yourPersonalDetails.livingSituation,
          curStep: 4,
        },
      },
      {
        path: "living-situation",
        name: personalDetails.yourPersonalDetails.livingSituation,
        component: () =>
          import(
            "@/views/personal-details/your-personal-details/LivingSituation.vue"
          ),

        meta: {
          heading: "What is your living situation?",
          nextNavigation:
            personalDetails.yourPersonalDetails.howLongDidYouLiveThere,
          curStep: 5,
        },
      },
      {
        path: "living-period",
        name: personalDetails.yourPersonalDetails.howLongDidYouLiveThere,
        beforeEnter: (to, from) => {
          if (to.params.period === period.previous) {
            to.meta.curStep = 8;
          }
        },
        component: () =>
          import(
            "@/views/personal-details/your-personal-details/HowLongDidYouLivedThere.vue"
          ),
        meta: {
          heading: "How long have you lived there?",
          nextNavigation: personalDetails.verifyYourIdentity.chooseIdType,
          previousAddress: personalDetails.yourPersonalDetails.previousAddress,
          curStep: 6,
        },
      },
    ],
  },

  {
    path: "is-partner",
    name: personalDetails.yourPersonalDetails.person1Partner,
    component: () =>
      import(
        "@/views/personal-details/your-personal-details/IsPerson2YourPartner.vue"
      ),
    meta: {
      title: "{PersonX} Details",
      curStep: 9,
    },
  },
  {
    path: "person-2-maritial-status",
    name: personalDetails.yourPersonalDetails.person2MaritalStatus,
    component: () =>
      import(
        "@/views/personal-details/your-personal-details/MaritalStatus.vue"
      ),
    meta: {
      title: "{PersonX} Details",
      curStep: 9,
    },
  },
  {
    path: "person-2-number-of-dependents",
    name: personalDetails.yourPersonalDetails.numbersOfDependents,
    component: () =>
      import(
        "@/views/personal-details/your-personal-details/NumberOfDependents.vue"
      ),
    meta: {
      title: "{PersonX} Details",
      curStep: 9,
    },
  },
];
export default yourPersonalDetails;
