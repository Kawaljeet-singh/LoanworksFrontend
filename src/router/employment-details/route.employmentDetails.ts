import { period, person, section } from "@/types/routeParams";
import { ADDITIONAL_INCOME } from "@/utils/constants";
import routeNames, {
  routeEmploymentDetails,
  routeFuturePlans,
} from "@/utils/route-names/routeName";
import type { RouteRecordRaw } from "vue-router";
import futurePlansRoute from "../future-plans/route.futurePlans";
const additionalIncomeDetails: RouteRecordRaw[] = [
  {
    path: "overtime-pay",
    name: routeEmploymentDetails.additionalIncomeDetails
      .doYouRecievePermanentOvertimePay,
    component: () =>
      import(
        "@/views/employment-details/additional-income-details/DoYouRecieveAdditionalIncome.vue"
      ),
    meta: {
      title: "{PersonX} Employment Details",
      heading: "Do you receive permanent overtime pay?",
      page: ADDITIONAL_INCOME.OVERTIME_PAY,
      inputLabel: "What is the total amount before tax per month?",
      key: "receivedOvertimePay",
      nextNavigation:
        routeEmploymentDetails.additionalIncomeDetails
          .doYouRecieveCommissionsOrBounuses,
      curStep: 1,
    },
  },
  {
    path: "commissions-or-bonuses",
    name: routeEmploymentDetails.additionalIncomeDetails
      .doYouRecieveCommissionsOrBounuses,
    component: () =>
      import(
        "@/views/employment-details/additional-income-details/DoYouRecieveAdditionalIncome.vue"
      ),
    meta: {
      title: "{PersonX} Employment Details",
      heading: "Do you receive commissions or bonuses?",
      page: ADDITIONAL_INCOME.COMMISSION,
      inputLabel: "What is the total amount before tax per month?",
      nextNavigation:
        routeEmploymentDetails.additionalIncomeDetails
          .doYouRecieveGovernmentAllowances,
      key: "receivedBonus",
      curStep: 2,
    },
  },
  {
    path: "government-allowances",
    name: routeEmploymentDetails.additionalIncomeDetails
      .doYouRecieveGovernmentAllowances,
    component: () =>
      import(
        "@/views/employment-details/additional-income-details/DoYouRecieveAdditionalIncome.vue"
      ),
    meta: {
      title: "{PersonX} Employment Details",
      page: ADDITIONAL_INCOME.GOVERNMENT_ALLOWANCES,

      heading: "Do you receive Government allowances/benefits?",
      inputLabel: "What is the total amount before tax per month?",
      nextNavigation:
        routeEmploymentDetails.detailsConfirmed
          .yourEmploymentDetailsAreConfirmedSingle,
      key: "receivedGovtAllowance",
      curStep: 3,
    },
  },
  {
    path: "details-confirmed",
    name: routeEmploymentDetails.detailsConfirmed
      .yourEmploymentDetailsAreConfirmedSingle,
    component: () =>
      import("@/views/personal-details/YourIdentityIsConfirmed.vue"),
    meta: {
      title: "{PersonX} Employment Details",
      heading: "Your employment details are confirmed",
      stepLength: 0,
      paragraphs: {
        p2: "We have confirmed your employment details successfully and completed this step.",
        p3: "Let’s move on to verify your income and expenses.",
      },
      section: section.employmentDetails,
      nextNavigation: routeFuturePlans.confirmation,
    },
  },
];

const employmentDetailsRoute: RouteRecordRaw[] = [
  {
    path: ":period",
    beforeEnter(to, from) {
      const exists =
        to.params.period === period.current ||
        to.params.period === period.previous;
      if (to.params.period === period.previous) {
        to.meta.stepLength = 5;
      } else {
        to.meta.stepLength = 6;
      }
      if (!exists) return { name: routeNames.noteFound };
    },
    meta: {
      title: "{PersonX} Employment Details",
      stepLength: 6,
    },
    // redirect: "employment-details/current/employer",
    children: [
      {
        path: "employer",
        name: routeEmploymentDetails.currentEmployment.currentEmployer,
        component: () => import("@/views/employment-details/WhoIsEmployer.vue"),
        beforeEnter(to, from, next) {
          if (to.params.period === period.previous) {
            to.meta.heading = "Please tell us about your previous employer.";
          }
          next();
        },
        meta: {
          heading: "{PersonX}, who is your current employer?",
          curStep: 1,

          nextNavigation:
            routeEmploymentDetails.currentEmployment.currentIndustry,
        },
      },
      {
        path: "industry",
        name: routeEmploymentDetails.currentEmployment.currentIndustry,
        component: () =>
          import("@/views/employment-details/EmploymentIndustry.vue"),

        beforeEnter(to, from, next) {
          if (to.params.period === period.previous) {
            to.meta.heading =
              "Which industry did your previous employer operate in?";
            to.meta.nextNavigation =
              routeEmploymentDetails.currentEmployment.currentEmploymentStatus;
          }
          next();
        },
        meta: {
          heading: "What industry are you currently in?",
          curStep: 2,
          nextNavigation:
            routeEmploymentDetails.currentEmployment.currentOccupation,
        },
      },
      {
        path: "occupation",
        name: routeEmploymentDetails.currentEmployment.currentOccupation,
        component: () =>
          import("@/views/employment-details/EmploymentOccupation.vue"),

        meta: {
          heading: "What is your current occupation?",
          curStep: 3,

          nextNavigation:
            routeEmploymentDetails.currentEmployment.currentEmploymentStatus,
        },
      },
      {
        path: "status",
        name: routeEmploymentDetails.currentEmployment.currentEmploymentStatus,
        component: () =>
          import("@/views/employment-details/EmploymentStatus.vue"),
        beforeEnter(to, from, next) {
          if (to.params.period === period.previous) {
            to.meta.heading = "What is your previous employment status?";
          }
          next();
        },
        meta: {
          heading: "What is your employment status?",
          curStep: 4,
          nextNavigation:
            routeEmploymentDetails.currentEmployment.currentIncomeBeforeTax,
        },
      },
      {
        path: "income-before-tax",
        name: routeEmploymentDetails.currentEmployment.currentIncomeBeforeTax,
        component: () =>
          import("@/views/employment-details/IncomeBeforeTax.vue"),
        beforeEnter(to, from, next) {
          if (to.params.person === person.first) {
            to.meta.heading = "Confirm your annual income before tax?";
          }
          next();
        },
        meta: {
          heading: "What is your annual income before tax?",
          curStep: 5,

          nextNavigation:
            routeEmploymentDetails.currentEmployment.currentLengthOfEmployment,
        },
      },
      {
        path: "length-of-employment",
        name: routeEmploymentDetails.currentEmployment
          .currentLengthOfEmployment,
        component: () =>
          import("@/views/employment-details/LengthOfEmployment.vue"),
        beforeEnter(to, from, next) {
          if (to.params.period === period.previous) {
            to.meta.curStep = 5;
          }
          next();
        },
        meta: {
          curStep: 6,

          heading: "How long have you worked with this employer?",
        },
      },
    ],
  },
  {
    path: "additional-income",
    meta: {
      stepLength: 3,
    },
    children: additionalIncomeDetails,
  },
  {
    path: "future-plans",
    meta: {
      stepLength: 2,
    },
    children: futurePlansRoute,
  },
];

export default employmentDetailsRoute;
