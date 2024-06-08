import { period } from "@/types/routeParams";
import routeNames, {
  routePersonalDetails,
} from "@/utils/route-names/routeName";
import type { RouteRecordRaw } from "vue-router";

const { personalDetails } = routeNames;

// const yourPersonalDetails: RouteRecordRaw[] = [
//   {
//     path: "check-details",
//     name: joint.yourPersonalDetails.checkYourDetails,
//     component: () =>
//       import(
//         "@/views/personal-details/your-personal-details/CheckYourDetails.vue"
//       ),
//     meta: {
//       isFirstPerson: true,
//       heading: "{PersonX}, please check your information:",
//       nextNavigation: joint.yourPersonalDetails.yourCitizenship,
//     },
//   },
//   {
//     path: "citizenship-details",
//     name: joint.yourPersonalDetails.yourCitizenship,
//     component: () =>
//       import(
//         "@/views/personal-details/your-personal-details/YourCitizenShipStatus.vue"
//       ),
//     meta: {
//       title: "{PersonX} Details",
//       heading: "What is your Citizenhip Status?",
//       nextNavigation: {
//         australian: joint.yourPersonalDetails.currentAddress,
//         nonAustralian: joint.yourPersonalDetails.nonResident,
//       },
//     },
//   },
//   {
//     path: "citizenship-country",
//     name: joint.yourPersonalDetails.nonResident,
//     component: () =>
//       import(
//         "@/views/personal-details/your-personal-details/NotResidentAustrailia.vue"
//       ),
//     meta: {
//       heading: "",
//       nextNavigation: joint.yourPersonalDetails.currentAddress,
//     },
//   },
//   {
//     path: ":period",
//     beforeEnter(to, from) {
//       const exists =
//         to.params.period === period.current ||
//         to.params.type === period.previous;
//       if (!exists) return { name: routeNames.noteFound };
//     },
//     meta: {
//       isCurrent: true,
//     },
//     children: [
//       {
//         path: "address",
//         name: joint.yourPersonalDetails.currentAddress,
//         component: () =>
//           import(
//             "@/views/personal-details/your-personal-details/CurrentAddress.vue"
//           ),
//         meta: {
//           heading: "What is your current address?",
//           nextNavigation: joint.yourPersonalDetails.livingSituation,
//         },
//       },
//       {
//         path: "living-situation",
//         name: joint.yourPersonalDetails.livingSituation,
//         component: () =>
//           import(
//             "@/views/personal-details/your-personal-details/LivingSituation.vue"
//           ),
//         meta: {
//           heading: "What is your living situation?",
//           nextNavigation: joint.yourPersonalDetails.howLongDidYouLiveThere,
//         },
//       },
//       {
//         path: "living-period",
//         name: joint.yourPersonalDetails.howLongDidYouLiveThere,
//         component: () =>
//           import(
//             "@/views/personal-details/your-personal-details/HowLongDidYouLivedThere.vue"
//           ),
//         meta: {
//           heading: "How long have you lived there?",
//           nextNavigation: joint.yourPersonalDetails.person1Partner,
//           previousAddress: joint.yourPersonalDetails.previousAddress,
//         },
//       },
//     ],
//   },
//   {
//     path: "previous",
//     meta: {
//       isCurrent: false,
//     },
//     children: [
//       {
//         path: "previous-address",
//         name: joint.yourPersonalDetails.previousAddress,
//         component: () =>
//           import(
//             "@/views/personal-details/your-personal-details/CurrentAddress.vue"
//           ),
//         meta: {
//           heading: "What was your previous address?",
//           nextNavigation:
//             joint.yourPersonalDetails.previousHowLongDidYouLiveThere,
//         },
//       },
//       {
//         path: "previous-living-period",
//         name: joint.yourPersonalDetails.previousHowLongDidYouLiveThere,
//         component: () =>
//           import(
//             "@/views/personal-details/your-personal-details/HowLongDidYouLivedThere.vue"
//           ),
//         meta: {
//           heading: "How long have you lived there?",
//           nextNavigation: joint.yourPersonalDetails.person1Partner,
//         },
//       },
//     ],
//   },
//   {
//     path: "/your-personal-details/is-partner",
//     name: joint.yourPersonalDetails.person1Partner,
//     component: () => import("@/components/form/YesNoConfirmation.vue"),
//     meta: {
//       title: "{PersonX} Details",
//       heading: "Is {Person2 Firstname} your partner?",
//       nextNavigation: {
//         yes: routePersonalDetails.verifyYourIdentity.chooseIdType,
//         no: routeNames.personalDetails.yourPersonalDetails.person2MaritalStatus,
//       },
//     },
//   },
//   {
//     path: "/your-personal-details/person-2-maritial-status",
//     name: joint.yourPersonalDetails.person2MaritalStatus,
//     component: () =>
//       import(
//         "@/views/personal-details/your-personal-details/MaritalStatus.vue"
//       ),
//     meta: {
//       title: "{PersonY} Details",
//       heading: "What is the marital status for {Person2 Firstname}?",
//     },
//   },
//   {
//     path: "/your-personal-details/person-2-number-of-dependents",
//     name: joint.yourPersonalDetails.numbersOfDependents,
//     component: () =>
//       import(
//         "@/views/personal-details/your-personal-details/NumberOfDependents.vue"
//       ),
//     meta: {
//       title: "Personal Details",
//       heading: "How many dependents does {Person 2 Firstname} have?",
//     },
//   },
// ];

const personalDetailsJointApplicantionRoutes: RouteRecordRaw[] = [
  // {
  //   path: "/joint-application",
  //   redirect: "/joint-application/first-person",
  //   meta: {
  //     title: "{PersonX} Details",
  //   },
  //   children: [
  //     {
  //       path: "first-person",
  //       name: routeNames.personalDetails.jointApplication.firstPerson,
  //       component: () =>
  //         import(
  //           "@/views/personal-details/joint-application/PersonDetails.vue"
  //         ),
  //       meta: {
  //         applicant: "firstApplicant",
  //         heading: "Hi {PersonX}, please confirm your details.",
  //         nextNavigation:
  //           routeNames.personalDetails.jointApplication.secondPerson,
  //       },
  //     },
  //     {
  //       path: "second-person",
  //       name: routeNames.personalDetails.jointApplication.secondPerson,
  //       component: () =>
  //         import(
  //           "@/views/personal-details/joint-application/PersonDetails.vue"
  //         ),
  //       meta: {
  //         title: "{PersonX} Details",
  //         heading: "Please tell us about the 2nd applicant",
  //         nextNavigation: joint.customerConsent,
  //         isJointApplication: true,
  //       },
  //     },
  //     {
  //       path: "customer-consent",
  //       name: joint.customerConsent,
  //       component: () =>
  //         import("@/views/personal-details/SingleCustomerConsent.vue"),
  //       meta: {
  //         title: "{PersonX} Details",
  //         heading: "Customer Consent",
  //         nextNavigation: joint.existingCustomer.isExistingCustomer,
  //         isJointApplication: true,
  //       },
  //     },
  //     {
  //       name: routeNames.personalDetails.existingCustomer.isExistingCustomer,
  //       path: "existing",
  //       component: () =>
  //         import("@/views/personal-details/SingleExistingCustomer.vue"),
  //       meta: {
  //         heading: "{PersonX}, are you an existing customer?",
  //         nextNavigation: {
  //           yes: joint.existingCustomer.login,
  //           no: joint.newApplication.gettingDetails,
  //         },
  //       },
  //     },
  //     {
  //       name: joint.existingCustomer.login,
  //       path: "customer/login",
  //       component: () =>
  //         import(
  //           "@/views/personal-details/existing-customer/ExistingCustomerLogin.vue"
  //         ),
  //       meta: {
  //         nextNavigation: joint.existingCustomer.otp,
  //       },
  //     },
  //     {
  //       name: joint.existingCustomer.otp,
  //       path: "customer/otp",
  //       component: () =>
  //         import("@/views/personal-details/existing-customer/VerifyOtp.vue"),
  //       meta: {
  //         nextNavigation: joint.yourPersonalDetails.checkYourDetails,
  //       },
  //     },
  //     {
  //       path: "new-application",
  //       children: [
  //         {
  //           path: "new-application/getting-details",
  //           name: joint.newApplication.gettingDetails,
  //           component: () =>
  //             import(
  //               "@/views/personal-details/new-application/GettingPersonalDetails.vue"
  //             ),
  //           meta: {
  //             title: "Personal Details",
  //             heading: "Getting your personal details",
  //             nextNavigation: {
  //               yes: joint.newApplication.keepScreenOpen,
  //               no: joint.yourPersonalDetails.checkYourDetails,
  //             },
  //           },
  //         },
  //         {
  //           path: "new-application/keep-screen-open",
  //           name: joint.newApplication.keepScreenOpen,
  //           component: () =>
  //             import(
  //               "@/views/personal-details/new-application/KeepThisScreenOpen.vue"
  //             ),
  //           meta: {
  //             title: "Personal Details",
  //             heading: "",
  //             nextNavigation: joint.yourPersonalDetails.checkYourDetails,
  //           },
  //         },
  //         {
  //           path: "your-personal-details",
  //           redirect: {
  //             name: joint.yourPersonalDetails.checkYourDetails,
  //           },
  //           meta: {
  //             isFirstPerson: true,
  //             title: "{PersonX} Details",
  //           },
  //           children: yourPersonalDetails,
  //         },
  //       ],
  //     },
  //   ],
  // },
];

export default personalDetailsJointApplicantionRoutes;
