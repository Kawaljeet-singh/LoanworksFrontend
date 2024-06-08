import WeNeedToTalk from "@/components/WeNeedToTalk.vue";
import routeNames from "@/utils/route-names/routeName";
import personalLoan from "@/utils/route-names/routeNamePersonalLoan";
import ChooseProduct from "@/views/personal-loan/ChooseProduct.vue";
import GoodNewsPersonalLoan from "@/views/personal-loan/GoodNewsPersonalLoan.vue";
import PersonalRatesVue from "@/views/personal-loan/PersonalRates.vue";
import PreferredRepaymentFrequency from "@/views/personal-loan/PreferredRepaymentFrequency.vue";
import WhatIsLoanFor from "@/views/personal-loan/WhatIsLoanFor.vue";
import type { RouteRecordRaw } from "vue-router";

const whatIsLoanFor = {
  path: "info",
  props: true,
  meta: {
    stepLength: 5,
  },
  redirect: "/info/1",
  children: [
    {
      name: personalLoan.info.whatIsLoanFor,
      path: "1",
      component: WhatIsLoanFor,
      meta: {
        heading: "What is the loan for?",
        progress: "tw-w-[28.57%]",
        curStep: 1,
        nextNavigation: personalLoan.info.preferredRepaymentFrequency,
      },
    },
    {
      name: personalLoan.info.preferredRepaymentFrequency,
      path: "2",
      component: PreferredRepaymentFrequency,
      meta: {
        heading: "What is your preferred repayment frequency?",
        progress: "tw-w-[42.85%]",
        curStep: 2,
        nextNavigation: personalLoan.info.annualGrossIncome,
      },
    },
    {
      name: personalLoan.info.annualGrossIncome,
      path: "3",
      component: () =>
        import("@/views/credit-card/eligibility/AnnualGrossIncome.vue"),
      meta: {
        heading: "What is your annual income before tax?",
        progress: "tw-w-[57.14%]",
        curStep: 3,
        nextNavigation: personalLoan.info.maritalStatus,
      },
    },
    {
      name: personalLoan.info.maritalStatus,
      path: "4",
      component: () =>
        import("@/views/credit-card/eligibility/MaritalStatus&Dependents.vue"),
      meta: {
        heading: "What is your marital status?",
        progress: "tw-w-[71.42%]",
        curStep: 4,
        nextNavigation: personalLoan.info.customerDetails,
      },
    },
    {
      name: personalLoan.info.customerDetails,
      path: "5",
      component: () =>
        import("@/views/personal-loan/CustomerDetailPersonalLoan.vue"),
      meta: {
        heading: "Please let us know a little more about you...",
        progress: "tw-w-[85.71%]",
        curStep: 5,
        nextNavigation: personalLoan.info.searchProduct,
      },
    },
    {
      path: "searching",
      name: personalLoan.info.searchProduct,
      component: () => import("@/views/personal-loan/SearchingProducts.vue"),
      props: true,
      meta: {
        // heading: "Good News User!",
        progress: "tw-w-full",
        stepLength: 0,
        nextNavigation: personalLoan.chooseProduct,
      },
    },
  ],
};

const personalLoanRoute: RouteRecordRaw[] = [
  {
    path: "personal-loan",
    props: true,
    meta: {
      title: "Get your Personal Rate",
      // heading: "Let's Get Started",
    },

    children: [
      {
        name: personalLoan.getPersonalRates,
        path: "rates",
        component: PersonalRatesVue,
        meta: {
          nextNavigation: personalLoan.info.whatIsLoanFor,
        },
      },
      whatIsLoanFor,
      {
        name: personalLoan.chooseProduct,
        path: "choose-product",
        // component: ChooseProduct,
        components: { "choose-product": ChooseProduct },
        meta: {
          hideDefault: true,
          showRightSideChooseProduct: true,
          heading:
            "Great News {first name}! We can offer you the following rates.",
          nextNavigation: personalLoan.goodNews,
        },
      },
      {
        name: personalLoan.goodNews,
        path: "good-news",
        component: GoodNewsPersonalLoan,
        meta: {
          nextNavigation: personalLoan.beforeYouStart,
        },
      },
      {
        name: personalLoan.badNews,
        path: "bad-news",
        component: WeNeedToTalk,
        meta: {
          heading: "We Need To Talk.",
          nextNavigation: personalLoan.beforeYouStart,
        },
      },
      {
        path: "before-you-start",
        name: personalLoan.beforeYouStart,
        component: () => import("@/views/credit-card/BeforeYouStart.vue"),
        meta: {
          title: "Your Personal Details",
          heading: "Before You Start",
          progress: "tw-w-[14.28%]",
          nextNavigation: routeNames.personalDetails.SingleOrJointApplication,
        },
      },
    ],
  },
];

export default personalLoanRoute;
