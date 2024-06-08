interface Attribute {
  code: string;
  value: string;
  available: boolean;
  name: string;
  "short-description": string;
  order: number;
}
interface Fee {
  productId: number;
  feeId: number;
  name: string;
  amount: number;
}

interface Feature {
  available: boolean;
  name: string;
  "short-description": string;
  order: number;
}

export interface RootObject {
  productType: number;
  rate: number;
  fees: Fee[];
  deliveryRate: number;
  termYear: number;
  termMonth: number;
  financierID: number;
  financier: string;
  lender: string;
  repayType: string;
  repaymentTypeId: number;
  minLoan: number;
  maxLoan: number;
  financierProductCode: string;
  financierProductName: string;
  subsidyMargin: number;
  organizationMargin: number;
  otherMargin: number;
  sacrificeMonths: number;
  incentiveRate: number;
  lineofCredit: boolean;
  trailPercentage: number;
  upfrontPercentage: number;
  upfrontDollars: number;
  productStatusLookupId: number;
  productStatusId: number;
  footPrint: number;
  includeInComparison: number;
  webBrokerDisplay: number;
  baseFixedRate: number;
  fixedRateTerm: number;
  interestOnlyTerm: number;
  interestOnlyLoading: number;
  defaultLoanType: number;
  initialOption: number;
  templateID: string;
  maxDiscount: number;
  linkedDebitCard: number;
  addedFromPisces: number;
  qualifyingRateMargin: number;
  defaultRollOverLoanType: number;
  productGroup: number;
  productClass: number;
  attributes: Attribute[];
  features: Feature[];
  productId: number;
  productCode: string;
  productName: string;
  loanClassId: number;
}

export type CreditCard = {
  productId: number;
  productName: string;
  interestRate: number;
  onGoingFees: {
    establishmentFee: number;
    monthlyFee: number;
    EarlyPayOutFee: number;
  };

  imageUrl: string;
  description: string;
  featuredOptions: {
    annualFee: string;
    purchaseRate: string;
    interestFreeDays: string;
  };
  rate: number;
  productType: number;
  deliveryRate: number;
  termYear: number;
  termMonth: number;
  financierID: number;
  financier: string;
  lender: string;
  repayType: string;
  repaymentTypeId: number;
  minLoan: number;
  maxLoan: number;
  financierProductCode: string;
  financierProductName: string;
  subsidyMargin: number;
  organizationMargin: number;
  otherMargin: number;
  sacrificeMonths: number;
  incentiveRate: number;
  lineofCredit: boolean;
  trailPercentage: number;
  upfrontPercentage: number;
  upfrontDollars: number;
  productStatusLookupId: number;
  productStatusId: number;
  footPrint: number;
  includeInComparison: number;
  webBrokerDisplay: number;
  baseFixedRate: number;
  fixedRateTerm: number;
  interestOnlyTerm: number;
  interestOnlyLoading: number;
  defaultLoanType: number;
  initialOption: number;
  templateID: string;
  maxDiscount: number;
  linkedDebitCard: number;
  addedFromPisces: number;
  qualifyingRateMargin: number;
  defaultRollOverLoanType: number;
  productGroup: number;
  productClass: number;
  attributes: Attribute[];
  features: Feature[];
  fees: Fee[];
  productCode: string;
  loanClassId: number;
};
