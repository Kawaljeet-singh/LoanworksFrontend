import personalDetails from "./routeNamePersonalDetails";
import personalLoan from "./routeNamePersonalLoan";
import vehicleLoan from "./routeNameVehicleLoan";

const employmentDetails = {
  currentEmployment: {
    currentEmployer: "CurrentEmployer",
    currentIndustry: "CurrentIndustry",
    currentOccupation: "CurrentOccupation",
    currentEmploymentStatus: "CurrentEmploymentStatus",
    currentIncomeBeforeTax: "CurrentIncomeBeforeTax",
    currentLengthOfEmployment: "CurrentLengthOfEmployment",
  },
  previousEmployment: {
    previousEmployer: "PreviousEmployer",
    previousIndustry: "PreviousIndustry",
    previousEmploymentStatus: "PreviousEmploymentStatus",
    previousLengthOfEmployment: "PreviousLengthOfEmployment",
  },
  additionalIncomeDetails: {
    doYouRecievePermanentOvertimePay: "DoYouRecievePermanentOvertimePay",
    doYouRecieveCommissionsOrBounuses: "DoYouRecieveCommissionsOrBounuses",
    doYouRecieveGovernmentAllowances: "DoYouRecieveGovernmentAllowances",
  },
  detailsConfirmed: {
    yourEmploymentDetailsAreConfirmedSingle:
      "YourEmploymentDetailsAreConfirmedSingle",
    yourEmploymentDetailsAreConfirmedJoined:
      "YourEmploymentDetailsAreConfirmedJoined",
  },
};

const futurePlans = {
  confirmation: "FuturePlansConfirmation",
  reasons: "FuturePlansReasons",
  retirementPlans: "FuturePlansRetirementPlans",
};

const verifyIncomeExpense = {
  getIncomeExpense: "VerifyIncomeExpenseGetIncomeExpense",
  getPreferredMethode: "VerifyIncomeExpenseGetPreferredMethode",
  getIncomeExpenseSecondPerson: "VerifyIncomeExpenseGetIncomeExpense2",
  review: {
    income: "VerifyIncomeExpenseReviewIncome",
    expense: "VerifyIncomeExpenseReviewExpense",
    liabilities: "VerifyIncomeExpenseReviewLiabilities",
  },
};

const reviewApplication = {
  aboutCreditCardLoan: "ReviewApplicationAboutCreditCardLoan",
  assessmentOutcome: {
    creditCardSuccessFull: "ReviewApplicationCreditCardSuccessFull",
    creditCardUnsuccessful: "ReviewApplicationCreditCardUnsuccessfull",
  },
  preferredBankAccount: "ReviewApplicationPreferredBankAccount",
};

const routeNames = {
  creditCard: {
    getStarted: "CreditCard/GetStarted",
    whatLimitAmount: "WhatLimitAmount",
    chooseCreditCard: "CreditCard/ChooseCreditCard",
    additionalCardHolders: {
      doYouHaveAdditionalCardHolders: "AdditionalCardHolder",
      whoRAdditionalCardHolders: "WhoRAdditionalCardHolders",
    },
    badNews: "CreditCard/BadNews",
    searching: "CreditCard/Searching",
    goodNews: "CreditCard/GoodNews",
  },
  personalDetails: personalDetails,
  employmentDetails,
  futurePlans,
  verifyIncomeExpense,
  reviewApplication,
  personalLoan: personalLoan,
  noteFound: "NotFound",
  vehicleLoan,
  admin: {
    login: "AdminLogin",
    dashboard: "adminDashboard",
  },
};
const routePersonalDetails = personalDetails;
const routeEmploymentDetails = employmentDetails;
const routeFuturePlans = futurePlans;
const routeVerifyIncomeExpense = verifyIncomeExpense;
const routeReviewApplication = reviewApplication;
export {
  routePersonalDetails,
  routeEmploymentDetails,
  routeFuturePlans,
  routeVerifyIncomeExpense,
  routeReviewApplication,
};
export default routeNames;
