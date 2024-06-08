import LOAN_TYPE from "@/utils/LoanTypes";
import routeNames from "@/utils/route-names/routeName";
import ChooseCreditCardVue from "@/views/credit-card/ChooseCreditCard.vue";
import AnnualGrossIncomeVue from "@/views/credit-card/eligibility/AnnualGrossIncome.vue";
import PreferredLimitVue from "@/views/credit-card/eligibility/PreferredLimit.vue";
import type { RouteRecordRaw } from "vue-router";
const creditCardRoutes: RouteRecordRaw[] = [
  {
    path: "choose-credit-card",
    name: routeNames.creditCard.chooseCreditCard,
    component: ChooseCreditCardVue,
    meta: {
      title: "Choose a Credit Card",
      heading: "Which type of credit card do you want?",
      progress: "tw-w-[14.28%]",
    },
  },

  {
    path: "eligible/:cardId",
    props: true,
    meta: {
      title: "Credit Card Application",
      stepLength: 5,
      apiEndPoint: "/application/5/credit-card/step-1",
      LOAN_TYPE: LOAN_TYPE.CREDIT_CARD_LOAN,
    },
    redirect: "/eligible/:cardId/preferred-limit",
    // beforeEnter: (to, from) => {
    //   const exists = creditCardsData.find(
    //     (c) => c.productId === to.params.cardId
    //   );
    //   if (!exists) return { name: routeNames.noteFound };
    // },
    children: [
      {
        name: "PreferredLimit",
        path: "preferred-limit",
        component: PreferredLimitVue,
        meta: {
          heading: "What is your preferred limit?",
          progress: "tw-w-[28.57%]",
          curStep: 1,
        },
      },
      {
        name: "AnnualGrossIncome",
        path: "annual-income",
        component: AnnualGrossIncomeVue,
        meta: {
          heading: "What is your annual income before tax?",
          progress: "tw-w-[42.85%]",
          curStep: 2,
          nextNavigation: "MonthlyCommitments",
        },
      },
      {
        name: "MonthlyCommitments",
        path: "monthly-commitments",
        component: () =>
          import("@/views/credit-card/eligibility/MonthlyCommitments.vue"),
        meta: {
          heading: "What are your current financial commitments?",
          progress: "tw-w-[57.14%]",
          curStep: 3,
        },
      },
      {
        name: "MaritalStatus",
        path: "4",
        component: () =>
          import(
            "@/views/credit-card/eligibility/MaritalStatus&Dependents.vue"
          ),
        meta: {
          heading: "What is your marital status?",
          progress: "tw-w-[71.42%]",
          curStep: 4,
          nextNavigation: "CustomerDetails",
        },
      },
      {
        name: "CustomerDetails",
        path: "5",
        component: () =>
          import("@/views/credit-card/eligibility/CustomerDetails.vue"),
        meta: {
          heading: "Please let us know a little more about you...",
          progress: "tw-w-[85.71%]",
          curStep: 5,
          apiEndPoint: "/application/5/credit-card/step-5",
        },
      },
      {
        path: "searching",
        name: routeNames.creditCard.searching,
        component: () => import("@/views/personal-loan/SearchingProducts.vue"),
        props: true,
        meta: {
          // heading: "Good News User!",
          p1: "Not much longer, we are checking a few things.",
          progress: "tw-w-full",
          stepLength: 0,
          nextNavigation: routeNames.creditCard.goodNews,
        },
      },
      {
        path: "goodnews",
        name: routeNames.creditCard.goodNews,
        component: () => import("@/views/credit-card/GoodNews.vue"),
        props: true,
        meta: {
          // heading: "Good News User!",
          progress: "tw-w-full",
          stepLength: 0,
        },
      },
      {
        path: "badnews",
        name: routeNames.creditCard.badNews,
        component: () => import("@/components/WeNeedToTalk.vue"),
        props: true,
        meta: {
          // heading: "Good News User!",
          p1: "We have conducted an initial assessment based on the information you provided and we have a few more questions to ask you before we can offer you a ${preferred_limit} credit card limit.",
          progress: "tw-w-full",
          stepLength: 0,
        },
      },
    ],
  },
  {
    path: "before-you-start",
    name: "BeforeYouStart",
    component: () => import("@/views/credit-card/BeforeYouStart.vue"),
    meta: {
      title: "Your Personal Details",
      heading: "Before You Start",
      progress: "tw-w-[14.28%]",
      nextNavigation:
        routeNames.creditCard.additionalCardHolders
          .doYouHaveAdditionalCardHolders,
    },
  },

  // {
  //   path: "/limit-amount",
  //   name: routeNames.creditCard.whatLimitAmount,
  //   component: () => import("@/views/credit-card/WhatLimitAmount.vue"),
  //   meta: {
  //     title: "Credit Card Application",
  //   },
  // },
  {
    path: "additional-card-holder",
    name: routeNames.creditCard.additionalCardHolders
      .doYouHaveAdditionalCardHolders,
    component: () => import("@/views/credit-card/AdditionalCardHolders.vue"),
    meta: {
      title: "Credit Card Application",
      progress: "tw-w-[14.28%]",
      heading: "Do you have additional card holders?",
    },
  },
  {
    path: "additional-card-holder/who-r-additional-card-holder",
    name: "WhoRAdditionalCardHolders",
    component: () =>
      import("@/views/credit-card/WhoRAdditionalCardHolders.vue"),
    meta: {
      title: "Credit Card Application",
      progress: "tw-w-[14.28%]",
      heading: "Who are your Additional Card Holders?",
    },
  },
];

export default creditCardRoutes;
