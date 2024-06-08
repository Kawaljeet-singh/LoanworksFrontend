import { routeReviewApplication } from "@/utils/route-names/routeName";

const reviewYourApplicationRoute = [
  {
    path: "about",
    name: routeReviewApplication.aboutCreditCardLoan,
    component: () => import("@/views/review-application/AboutYourLoan.vue"),
    meta: {
      heading: "Please review your application before we assess it.",
      nextNavigation:
        routeReviewApplication.assessmentOutcome.creditCardSuccessFull,
    },
  },
  {
    path: "successful",
    name: routeReviewApplication.assessmentOutcome.creditCardSuccessFull,
    component: () =>
      import("@/views/review-application/AssessmentSuccessful.vue"),
    meta: {
      nextNavigation: routeReviewApplication.preferredBankAccount,
      assessmentTitle:
        "We have completed our assessment of your personal loan application",
    },
  },
  {
    path: "unsuccessful",
    name: routeReviewApplication.assessmentOutcome.creditCardUnsuccessful,
    component: () =>
      import("@/views/review-application/AssessmentOutcomeUnsuccessful.vue"),
    meta: {
      assessmentTitle: "Assessment Outcome",
    },
  },
  {
    path: "preferred-bank-account",
    name: routeReviewApplication.preferredBankAccount,
    component: () =>
      import("@/views/review-application/PreferredBankAccount.vue"),
    meta: {
      heading: "Congratulations!",
      nextNavigation: "",
    },
  },
];

export default reviewYourApplicationRoute;
