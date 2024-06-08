import WeNeedToTalkVue from "@/components/WeNeedToTalk.vue";
import vehicleLoan from "@/utils/route-names/routeNameVehicleLoan";
import BoatSalesDetailsVue from "@/views/vehicle-loan/details/BoatSalesDetails.vue";
import CarSalesDetails from "@/views/vehicle-loan/details/CarSalesDetails.vue";
import ConditionOfVehicleVue from "@/views/vehicle-loan/details/ConditionOfVehicle.vue";
import KilometersTravelledVue from "@/views/vehicle-loan/details/KilometersTravelled.vue";
import AboutMotorVehicleVue from "@/views/vehicle-loan/details/motor-vehicle/AboutMotorVehicle.vue";
import AboutMotorVehicleOptionsVue from "@/views/vehicle-loan/details/motor-vehicle/AboutMotorVehicleOptions.vue";
import ReviewMotorVehicleDetailsVue from "@/views/vehicle-loan/details/motor-vehicle/ReviewMotorVehicleDetails.vue";
import RefinancingLoan from "@/views/vehicle-loan/details/RefinancingLoan.vue";
import RegistrationNoVue from "@/views/vehicle-loan/details/RegistrationNo.vue";
import RequiredAmountSalesDetails from "@/views/vehicle-loan/details/RequiredAmountSalesDetails.vue";
import SupplierDetailsVue from "@/views/vehicle-loan/details/SupplierDetails.vue";
import AboutWaterCraftVue from "@/views/vehicle-loan/details/water-craft/AboutWaterCraft.vue";
import BoatIdentification from "@/views/vehicle-loan/details/water-craft/BoatIdentification.vue";
import EngineDetails from "@/views/vehicle-loan/details/water-craft/EngineDetails.vue";
import EngineIdentification from "@/views/vehicle-loan/details/water-craft/EngineIdentification.vue";
import EngineTypeVue from "@/views/vehicle-loan/details/water-craft/EngineType.vue";
import ReviewWaterCraft from "@/views/vehicle-loan/details/water-craft/ReviewWaterCraft.vue";
import TrailerDetails from "@/views/vehicle-loan/details/water-craft/TrailerDetails.vue";
import TrailerIdentification from "@/views/vehicle-loan/details/water-craft/TrailerIdentification.vue";
import WayOfPurchase from "@/views/vehicle-loan/details/WayOfPurchase.vue";
import MotorVehicleGoodNews from "@/views/vehicle-loan/MotorVehicleGoodNews.vue";
import WaterCraftGoodNewsVue from "@/views/vehicle-loan/WaterCraftGoodNews.vue";
import type { RouteRecordRaw } from "vue-router";

const AboutMotorVehicle = {
  path: "motor-vehicle",
  children: [
    {
      path: "about",
      name: vehicleLoan.vehicleDetails.motorVehicle.aboutYourVehicle,
      component: AboutMotorVehicleVue,
      meta: {
        heading: "Tell us about your vehicle:",
        nextNavigation: vehicleLoan.vehicleDetails.motorVehicle.vehicleOptions,
      },
    },
    {
      path: "options",
      name: vehicleLoan.vehicleDetails.motorVehicle.vehicleOptions,
      component: AboutMotorVehicleOptionsVue,
      meta: {
        heading: "Please tell us about your vehicle’s options.",
        nextNavigation:
          vehicleLoan.vehicleDetails.motorVehicle.reviewVehicleDetails,
      },
    },
    {
      path: "review",
      name: vehicleLoan.vehicleDetails.motorVehicle.reviewVehicleDetails,
      component: ReviewMotorVehicleDetailsVue,
      meta: {
        heading: "Here is what we know about your vehicle",
        nextNavigation: vehicleLoan.vehicleDetails.wayOfPerchase,
      },
    },
  ],
};

const AboutWaterCraft = {
  path: "water-craft",
  children: [
    {
      path: "about-boat",
      name: vehicleLoan.vehicleDetails.boatDetails.aboutBoat,
      component: AboutWaterCraftVue,
      meta: {
        isBoatDetails: true,
        nextNavigation:
          vehicleLoan.vehicleDetails.boatDetails.boatIdentification,
      },
    },
    {
      path: "identification",
      name: vehicleLoan.vehicleDetails.boatDetails.boatIdentification,
      component: BoatIdentification,
      meta: {
        nextNavigation: vehicleLoan.vehicleDetails.boatDetails.trailerDetails,
      },
    },
    {
      path: "trailer-detail",
      name: vehicleLoan.vehicleDetails.boatDetails.trailerDetails,
      component: TrailerDetails,
      meta: {
        heading:
          "We can only lend against a boat that is trailered. Please tell us about your boat's trailer.",
        nextNavigation:
          vehicleLoan.vehicleDetails.boatDetails.trailerIdentification,
      },
    },
    {
      path: "trailer-identification",
      name: vehicleLoan.vehicleDetails.boatDetails.trailerIdentification,
      component: TrailerIdentification,
      meta: {
        heading: "What is the trailers identification number?",
        nextNavigation: vehicleLoan.vehicleDetails.boatDetails.engineType,
      },
    },
    {
      path: "engine-type",
      name: vehicleLoan.vehicleDetails.boatDetails.engineType,
      component: EngineTypeVue,
      meta: {
        heading: "What type of engine does the boat have?",
        nextNavigation: vehicleLoan.vehicleDetails.boatDetails.engineDetails,
      },
    },
    {
      path: "engine-details",
      name: vehicleLoan.vehicleDetails.boatDetails.engineDetails,
      component: EngineDetails,
      meta: {
        heading: "Please tell us about your boat’s engine.",
        nextNavigation:
          vehicleLoan.vehicleDetails.boatDetails.engineIdentification,
      },
    },
    {
      path: "engine-identification",
      name: vehicleLoan.vehicleDetails.boatDetails.engineIdentification,
      component: EngineIdentification,
      meta: {
        heading: "What is the engine's identification number?",
        nextNavigation: vehicleLoan.vehicleDetails.boatDetails.reviewWaterCraft,
      },
    },
    {
      path: "review",
      name: vehicleLoan.vehicleDetails.boatDetails.reviewWaterCraft,
      component: ReviewWaterCraft,
      meta: {
        heading: "What we know about your watercraft.",
        // nextNavigation: vehicleLoan.vehicleDetails.boatDetails.aboutWaterCraft,
      },
    },
    {
      path: "review-boat",
      name: vehicleLoan.vehicleDetails.boatDetails.reviewBoat,
      component: ReviewWaterCraft,
      meta: {
        heading: "What we know about your boat.",
        isBoat: true,
        nextNavigation: vehicleLoan.vehicleDetails.boatDetails.aboutWaterCraft,
      },
    },
    {
      path: "about",
      name: vehicleLoan.vehicleDetails.boatDetails.aboutWaterCraft,
      component: AboutWaterCraftVue,
      meta: {
        nextNavigation:
          vehicleLoan.vehicleDetails.boatDetails.identification.pwc,
      },
    },
    {
      path: "identification/pwc",
      name: vehicleLoan.vehicleDetails.boatDetails.identification.pwc,
      component: BoatIdentification,
      meta: {
        nextNavigation: vehicleLoan.vehicleDetails.boatDetails.reviewWaterCraft,
      },
    },
    {
      path: "identification/marine-motor",
      name: vehicleLoan.vehicleDetails.boatDetails.identification.marineMotor,
      component: EngineIdentification,
      meta: {
        isMarineMotor: true,
        nextNavigation: vehicleLoan.vehicleDetails.boatDetails.reviewWaterCraft,
      },
    },
    {
      path: "identification/marine-trailer",
      name: vehicleLoan.vehicleDetails.boatDetails.identification.marineTrailer,
      component: TrailerIdentification,
      meta: {
        nextNavigation: vehicleLoan.vehicleDetails.boatDetails.reviewWaterCraft,
      },
    },
  ],
};

const vehicleDetailsRoute: RouteRecordRaw[] = [
  {
    path: "details",
    meta: {
      title: "Vehicle Loan Application",
    },
    redirect: "/condition",
    children: [
      {
        path: "condition",
        name: vehicleLoan.vehicleDetails.conditionOfVehicle,
        component: ConditionOfVehicleVue,
        meta: {
          progress: "tw-w-[14%]",
          nextNavigation:
            vehicleLoan.vehicleDetails.motorVehicle.aboutYourVehicle,
        },
      },
      AboutMotorVehicle,
      {
        path: "registration-no",
        name: vehicleLoan.vehicleDetails.registrationNo,
        component: RegistrationNoVue,
        meta: {
          heading: "Do you know the vehicle's registration number?",
          nextNavigation: vehicleLoan.vehicleDetails.kilometersTravelled,
        },
      },
      {
        path: "travelled",
        name: vehicleLoan.vehicleDetails.kilometersTravelled,
        component: KilometersTravelledVue,
        meta: {
          heading: "How many kilometers has the vehicle travelled?",
          nextNavigation:
            vehicleLoan.vehicleDetails.motorVehicle.reviewVehicleDetails,
        },
      },
      {
        path: "way-of-purchase",
        name: vehicleLoan.vehicleDetails.wayOfPerchase,
        component: WayOfPurchase,
        meta: {
          heading: "How are you purchasing this vehicle?",
          nextNavigation: vehicleLoan.vehicleDetails.supplierDetails,
        },
      },
      {
        path: "supplier",
        name: vehicleLoan.vehicleDetails.supplierDetails,
        component: SupplierDetailsVue,
        meta: {
          heading: "What are the supplier's details?",
          nextNavigation: vehicleLoan.vehicleDetails.salesDetailsCar,
        },
      },
      {
        path: "sales/boat",
        name: vehicleLoan.vehicleDetails.salesDetailsBoat,
        component: BoatSalesDetailsVue,
        meta: {
          heading: "What are the contract of sale details?",
          nextNavigation: vehicleLoan.vehicleDetails.salesDetailsRequiredAmount,
        },
      },
      {
        path: "sales/car",
        name: vehicleLoan.vehicleDetails.salesDetailsCar,
        component: CarSalesDetails,
        meta: {
          heading: "What are the contract of sale details?",
          nextNavigation: vehicleLoan.vehicleDetails.motorVehicleConfirmation,
        },
      },
      {
        path: "sales/amount",
        name: vehicleLoan.vehicleDetails.salesDetailsRequiredAmount,
        component: RequiredAmountSalesDetails,
        meta: {
          heading: "What are the contract of sale details?",
        },
      },
      {
        path: "sales/refinancing",
        name: vehicleLoan.vehicleDetails.refinancingLoan,
        component: RefinancingLoan,
        meta: {
          heading: "Please tell us about the loan you are refinancing.",
          // nextNavigation: vehicleLoan.vehicleDetails.boatDetails.aboutBoat,
        },
      },
      AboutWaterCraft,
      {
        path: "we-need-to-talk",
        name: vehicleLoan.vehicleDetails.weNeedToTalk,
        component: WeNeedToTalkVue,
        meta: {
          heading: "We Need To Talk.",
          p1: "After reviewing the {vehicle type} that you want to {purpose} and the loan amount you require, we have a few more questions to ask before we can offer you a loan.",
          p2: " Please contact us now via web chat or book a call back by one of our lending specialists.",
        },
      },
      {
        path: "motor-vehicle/confirm",
        name: vehicleLoan.vehicleDetails.motorVehicleConfirmation,
        component: MotorVehicleGoodNews,
        meta: { nextNavigation: vehicleLoan.BeforeYouStart },
      },
      {
        path: "water-craft/confirm",
        name: vehicleLoan.vehicleDetails.waterCraftConfirmation,
        component: WaterCraftGoodNewsVue,
        meta: {
          nextNavigation: vehicleLoan.BeforeYouStart,
        },
      },
    ],
  },
];

export default vehicleDetailsRoute;
