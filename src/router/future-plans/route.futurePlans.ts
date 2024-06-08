import { FUTURE_PLANS } from "@/utils/constants";
import {
  routeFuturePlans,
  routeVerifyIncomeExpense,
} from "@/utils/route-names/routeName";

const futurePlansRoute = [
  {
    path: "confirmation",
    name: routeFuturePlans.confirmation,
    component: () => import("@/components/form/YesNoConfirmation.vue"),
    meta: {
      title: "Future Plans",
      curStep: 1,

      heading:
        "Do you anticipate any changes to your financial situation that may affect your ability to repay this loan?",
      page: FUTURE_PLANS.EXPECTED_FUTURE_CHANGES,
      nextNavigation: {
        yes: routeFuturePlans.reasons,
        no: routeVerifyIncomeExpense.getIncomeExpense,
      },
      apiRoute: "/application/:id/income-details/step-1",
    },
  },
  {
    path: "reasons",
    name: routeFuturePlans.reasons,
    component: () => import("@/views/future-plans/FuturePlaneReasons.vue"),
    meta: {
      curStep: 1,
      title: "Future Plans",
      heading:
        "Because you indicated that there will be changes to your financial situation please select what changes you are likely to to expect from the options below:",
      nextNavigation: routeFuturePlans.retirementPlans,
    },
  },
  {
    path: "retirement-plans",
    name: routeFuturePlans.retirementPlans,
    component: () => import("@/views/future-plans/RetirementPlans.vue"),
    meta: {
      title: "Future Plans",
      heading: "",
      nextNavigation: routeVerifyIncomeExpense.getIncomeExpense,
      curStep: 2,
    },
  },
];

export default futurePlansRoute;
