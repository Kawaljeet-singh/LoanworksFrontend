import WeNeedToTalkVue from "@/components/WeNeedToTalk.vue";
import LOAN_TYPE from "@/utils/LoanTypes";
import routeNames from "@/utils/route-names/routeName";
import vehicleLoan from "@/utils/route-names/routeNameVehicleLoan";
import AnnualGrossIncomeVue from "@/views/credit-card/eligibility/AnnualGrossIncome.vue";
import ChooseProductVue from "@/views/personal-loan/ChooseProduct.vue";
import GoodNewsPersonalLoanVue from "@/views/personal-loan/GoodNewsPersonalLoan.vue";
import PersonalRatesVue from "@/views/personal-loan/PersonalRates.vue";
import PreferredRepaymentFrequencyVue from "@/views/personal-loan/PreferredRepaymentFrequency.vue";
import ChooseTypeOfMotorVehicle from "@/views/vehicle-loan/ChooseTypeOfMotorVehicle.vue";
import ChooseTypeOfVehicleVue from "@/views/vehicle-loan/ChooseTypeOfVehicle.vue";
import ChooseTypeOfWaterCraftVue from "@/views/vehicle-loan/ChooseTypeOfWaterCraft.vue";
import WhatIsLoanForVue from "@/views/vehicle-loan/WhatIsLoanFor.vue";
import type { RouteRecordRaw } from "vue-router";
import vehicleDetailsRoute from "./route.vehicleDetails";
const WhatIsLoanFor: RouteRecordRaw = {
  path: "info",
  meta: {
    title: "Vehicle Loan Application",
    stepLength: 5,
  },
  redirect: { name: vehicleLoan.info.whatIsLoanFor },
  children: [
    {
      name: vehicleLoan.info.whatIsLoanFor,
      path: "1",
      component: WhatIsLoanForVue,
      meta: {
        heading: "What is the loan for?",
        progress: "tw-w-[28.57%]",
        curStep: 1,
        nextNavigation: vehicleLoan.info.repaymentFrequency,
      },
    },
    {
      name: vehicleLoan.info.repaymentFrequency,
      path: "2",
      component: PreferredRepaymentFrequencyVue,
      meta: {
        heading: "What is your preferred repayment frequency?",
        progress: "tw-w-[42.85%]",
        curStep: 2,
        nextNavigation: vehicleLoan.info.annualGrossIncome,
      },
    },
    {
      name: vehicleLoan.info.annualGrossIncome,
      path: "3",
      component: AnnualGrossIncomeVue,
      meta: {
        heading: "What is your annual income before tax?",
        progress: "tw-w-[57.14%]",
        curStep: 3,
        nextNavigation: vehicleLoan.info.maritalStatusAndDependents,
      },
    },
    {
      name: vehicleLoan.info.maritalStatusAndDependents,
      path: "4",
      component: () =>
        import("@/views/credit-card/eligibility/MaritalStatus&Dependents.vue"),
      meta: {
        heading: "What is your marital status?",
        progress: "tw-w-[71.42%]",
        curStep: 4,
        nextNavigation: vehicleLoan.info.customerDetails,
        loanType: LOAN_TYPE.VEHICLE_LOAN,
      },
    },
    {
      name: vehicleLoan.info.customerDetails,
      path: "5",
      component: () =>
        import("@/views/personal-loan/CustomerDetailPersonalLoan.vue"),
      meta: {
        heading: "Please let us know a little more about you...",
        progress: "tw-w-[85.71%]",
        curStep: 5,
        nextNavigation: vehicleLoan.searchingProducts,
      },
    },
  ],
};

const vehicleLoanRoute: RouteRecordRaw[] = [
  {
    path: "vehicle-loan",
    props: true,
    meta: {
      title: "Vehicle Loan Application",
      progress: "tw-w-[14%]",
      stepLength: 5,
    },

    children: [
      {
        name: vehicleLoan.type.chooseType,
        path: "type",
        component: ChooseTypeOfVehicleVue,
        meta: {
          heading:
            "Let’s get started. What sort of vehicle do you need a loan for?",
          curStep: 1,
        },
      },
      {
        name: vehicleLoan.type.typeWaterCraft,
        path: "type/water-craft",
        component: ChooseTypeOfWaterCraftVue,
        meta: {
          heading: "What type of water craft is it?",
          nextNavigation: vehicleLoan.HowMuchDoYouWant,
          curStep: 2,
        },
      },
      {
        name: vehicleLoan.type.typeMotorVehicle,
        path: "type/motor-vehicle",
        component: ChooseTypeOfMotorVehicle,
        meta: {
          heading: "What type of vehicle is it?",
          nextNavigation: vehicleLoan.HowMuchDoYouWant,
          curStep: 2,
        },
      },
      {
        name: vehicleLoan.HowMuchDoYouWant,
        path: "rates",
        component: PersonalRatesVue,
        meta: {
          nextNavigation: vehicleLoan.info.whatIsLoanFor,
          stepLength: 0,
        },
      },
    ],
  },
  {
    path: "vehicle-loan",
    props: true,
    meta: {
      title: "Get your Personal Rate",
      // heading: "Let's Get Started",
    },

    children: [
      WhatIsLoanFor,
      {
        path: "searching",
        name: vehicleLoan.searchingProducts,
        component: () => import("@/views/personal-loan/SearchingProducts.vue"),
        props: true,
        meta: {
          // heading: "Good News User!",
          progress: "tw-w-full",
          stepLength: 0,
          nextNavigation: vehicleLoan.ChooseProuduct,
        },
      },
      {
        name: vehicleLoan.ChooseProuduct,
        path: "choose-product",
        // component: ChooseProduct,
        components: { "choose-product": ChooseProductVue },
        meta: {
          hideDefault: true,
          showRightSideChooseProduct: true,
          heading:
            "Great News {first name}! We can offer you the following rates.",
          nextNavigation: vehicleLoan.goodNews,
        },
      },
      {
        name: vehicleLoan.goodNews,
        path: "good-news",
        component: GoodNewsPersonalLoanVue,
        meta: {
          nextNavigation: vehicleLoan.BeforeYouStart,
          LoanType: LOAN_TYPE.VEHICLE_LOAN,
        },
      },
      {
        name: vehicleLoan.badNews,
        path: "bad-news",
        component: WeNeedToTalkVue,
        meta: {
          heading: "We Need To Talk.",
          nextNavigation: vehicleLoan.BeforeYouStart,
        },
      },
      {
        path: "before-you-start",
        name: vehicleLoan.BeforeYouStart,
        component: () => import("@/views/credit-card/BeforeYouStart.vue"),
        meta: {
          title: "Your Personal Details",
          heading: "Before You Start",
          progress: "tw-w-[14.28%]",
          nextNavigation: routeNames.personalDetails.SingleOrJointApplication,
        },
      },
      ...vehicleDetailsRoute,
    ],
  },
];

export default vehicleLoanRoute;
