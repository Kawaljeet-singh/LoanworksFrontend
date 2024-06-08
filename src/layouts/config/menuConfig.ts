export interface INavItem {
  icon?: string;
  text: string;
  page?: string;
  link?: string;
  subItems?: INavItem[];
}

export const leftMenu: INavItem[] = [
  {
    text: "Application",
    link: "/app/new",
  },
  {
    text: "Products",
    subItems: [{ text: "Specialist Alt Doc Assist" }],
  },
  {
    text: "Borrowers",
    subItems: [
      {
        text: "Simon Hall",
        subItems: [
          { text: "Assets" },
          { text: "Liabilities" },
          { text: "Income" },
          { text: "Profit & Loss" },
          { text: "Balance Sheet" },
        ],
      },
      {
        text: "Fred Smith",
        subItems: [
          { text: "Assets" },
          { text: "Liabilities" },
          { text: "Income" },
          { text: "Profit & Loss" },
          { text: "Balance Sheet" },
        ],
      },
    ],
  },
  {
    text: "Corporate",
    subItems: [
      {
        text: "Penshoppe",
        subItems: [
          { text: "Bank Accounts" },
          { text: "Shareholders" },
          { text: "Balance Sheet" },
          { text: "Liabilities" },
          { text: "Profit & Loss" },
          { text: "Add Back" },
        ],
      },
      {
        text: "Penshoppe",
        subItems: [
          { text: "Bank Accounts" },
          { text: "Shareholders" },
          { text: "Balance Sheet" },
          { text: "Liabilities" },
          { text: "Profit & Loss" },
          { text: "Add Back" },
        ],
      },
    ],
  },
  {
    text: "Loan Purpose",
  },
  {
    text: "Collateral",
    link: "/applications/new/collateral",
  },

  {
    text: "Disbursements",
  },
  {
    text: "Credit Check",
  },
  {
    text: "Decisioning",
  },
  {
    text: "Conditions",
  },
  {
    text: "Documents",
  },
  {
    text: "Status",
  },
  {
    text: "File Notes",
  },
  {
    text: "Supporting Documents",
  },
  {
    text: "Cash Flow",
  },
  {
    text: "Interview",
  },
  {
    text: "OpenXchange",
  },
  {
    text: "CCI",
  },
  {
    text: "Commissions",
  },
  {
    text: "Linked",
  },
];

export const topMenu: INavItem[] = [
  {
    text: "Processing",
    subItems: [
      { text: "Add New Application", link: "/app/new" },
      { text: "Search For Application", link: "/app/search" },
      { text: "Search For Settlement", link: "" },
      { text: "Copy Application", link: "" },
      { text: "Delete Settlement", link: "" },
      { text: "Import Application", link: "" },
    ],
  },
  {
    text: "Collections",
    subItems: [{ text: "Collections Tracker" }, { text: "Arrears Import" }],
  },
  {
    text: "Reports",
    subItems: [
      { text: "Settlement" },
      { text: "Workflow Report" },
      { text: "Invoiced Commissions" },
      { text: "Commission Setting Report" },
      { text: "Activity Report" },
      { text: "Decisioning Report" },
    ],
  },
  {
    text: "Tools",
    subItems: [
      { text: "ABL Connect" },
      { text: "ABR" },
      { text: "ACT Revenue Office" },
      { text: "Advantedge" },
      { text: "ASIC" },
      { text: "Australian Business Register" },
      { text: "Australian Taxation Office" },
      { text: "Comparison Calculator" },
      { text: "Gadens" },
      { text: "Google Maps" },
      { text: "ING" },
      { text: "MFAA" },
      { text: "NSW Office of State Revenue" },
      { text: "QLD Office of State Revenue" },
      { text: "Repayment Caculator" },
      { text: "Revenue SA" },
      { text: "SRO VIC" },
      { text: "TAS Office of State Revenue" },
      { text: "WA Office of State Revenue" },
      { text: "Whereis" },
      { text: "White Pages" },
      { text: "Yellow Pages" },
    ],
  },
  {
    text: "Commissions",
    subItems: [
      { text: "Subsidy Batch" },
      { text: "Preparation" },
      { text: "Booksize Management" },
      { text: "Manual Commission Run" },
      { text: "Calculation" },
      { text: "Proposed Payment" },
      { text: "Transaction Management" },
      { text: "Release Commission Run" },
      { text: "Generate Bank Trans" },
      { text: "Generate Invoices" },
      { text: "Invoice Transmission" },
      { text: "Job Status" },
      { text: "ABA Export" },
      { text: "Micropay Export" },
      { text: "Commission Export" },
      { text: "Trail Qualification" },
      { text: "Release Held Transactions" },
      { text: "Post Balance" },
      { text: "Bank Statement Payments" },
      { text: "D365 Export" },
    ],
  },
  {
    text: "Management",
    subItems: [
      { text: "Users" },
      { text: "Profiles" },
      { text: "Organizations" },
      { text: "Data Maintenance", link: "/management/data-maintenance" },
      { text: "Menu Security" },
      { text: "Introducers" },
      { text: "Interface Controls" },
      { text: "Documents" },
      { text: "Products", link: "/management/products" },
      { text: "Funders" },
      { text: "Global Settings" },
      { text: "DLA Management" },
      { text: "Program Management" },
      { text: "Branding", link: "/management/brands" },
      { text: "Roles" },
      { text: "Workflow" },
    ],
  },
];

export const DataMaintenanceMenu: INavItem[] = [
  {
    text: "Application Class",
    link: "/management/data-maintenance/application-class",
  },
  {
    text: "Collateral Management",
    link: "/management/data-maintenance/collateral-mgt",
  },
  {
    text: "ABA/Payer Company Details",
  },
  {
    text: "Bank Transaction Type",
  },
  {
    text: "Builder's Panel",
  },
  {
    text: "Calendars",
  },
  {
    text: "Collection Queue Management",
  },
  {
    text: "Company Branding",
  },
  {
    text: "Company Details",
  },
  {
    text: "Company Logo",
  },
  {
    text: "Conditions",
  },
  {
    text: "Customer Categories",
  },
  {
    text: "Disbursements",
  },
  {
    text: "Fees",
    link: "/management/fees",
  },
  {
    text: "File Note Categories",
  },
  {
    text: "Funds Position Items",
    link: "/management/funds/funds-position",
  },
  {
    text: "General Contents",
  },
  {
    text: "Government Fees And Charges",
  },
  {
    text: "Insurers",
  },
  {
    text: "Interview Questions",
  },
  {
    text: "Introducer Categories",
  },
  {
    text: "Introducer Profiles",
  },
  {
    text: "Introducer Relationship Types",
  },
  {
    text: "Introducer Slots",
  },
  {
    text: "Loan Purpose Lookups",
  },
  {
    text: "Security Valuation Type",
  },
  {
    text: "Solicitor's Panel",
  },
  {
    text: "Subsidy Batch Type",
  },
  {
    text: "Subsidy Batch Upload Configuration",
  },
  {
    text: "Subsidy Payment Type",
  },
  {
    text: "Supporting Documents",
  },
  {
    text: "Team Emails",
  },
  {
    text: "Time Zone Management",
  },
  {
    text: "Valuer's Panel",
  },
  {
    text: "Variances and Exceptions",
  },
];

export const ProductsMenu: INavItem[] = [
  {
    text: "Products",
    link: "/management/products/search",
  },
];
