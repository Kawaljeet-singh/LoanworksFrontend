import {
  routeReviewApplication,
  routeVerifyIncomeExpense,
} from "@/utils/route-names/routeName";
import type { RouteRecordRaw } from "vue-router";

const verifyIncomeExpenseRoute: RouteRecordRaw[] = [
  {
    path: "confirmation",
    name: routeVerifyIncomeExpense.getIncomeExpense,
    component: () =>
      import("@/views/verify-income-expense/GetIncome&Expense.vue"),
    meta: {
      title: "Income & Expenses",
      heading: "Time to get your income & expenses",
      nextNavigation: routeVerifyIncomeExpense.getPreferredMethode,
    },
  },
  {
    path: "preferred-methode",
    name: routeVerifyIncomeExpense.getPreferredMethode,
    component: () =>
      import("@/views/verify-income-expense/PreferredMethod.vue"),
    meta: {
      title: "Income & Expenses",
      heading: "What would be your preferred method?",
      nextNavigation: routeVerifyIncomeExpense.getIncomeExpenseSecondPerson,
    },
  },
  {
    path: "confirmed",
    name: routeVerifyIncomeExpense.getIncomeExpenseSecondPerson,
    component: () =>
      import("@/views/personal-details/YourIdentityIsConfirmed.vue"),
    meta: {
      heading: "Time to get your income & expenses",
      paragraphs: {
        p1: "Well done!",
        p2: "We have confirmed {Person1 Firstname}'s income and expense details successfully.",
        p3: "Now for {Person2 Firstname}.",
      },
      nextNavigation: routeVerifyIncomeExpense.review.income,
    },
  },
  {
    path: "review",
    children: [
      {
        path: "income",
        name: routeVerifyIncomeExpense.review.income,
        component: () =>
          import("@/views/verify-income-expense/ReviewIncome.vue"),
        meta: {
          title: "Income & Expenses",
          heading:
            "Please review your income below before you proceed to the next stage.",
          nextNavigation: routeVerifyIncomeExpense.review.expense,
        },
      },
      {
        path: "expense",
        name: routeVerifyIncomeExpense.review.expense,
        component: () =>
          import("@/views/verify-income-expense/ReviewExpenses.vue"),
        meta: {
          title: "Income & Expenses",
          heading:
            "Please review your expenses below before you proceed to the next stage.",

          nextNavigation: routeVerifyIncomeExpense.review.liabilities,
        },
      },
      {
        path: "liabilities",
        name: routeVerifyIncomeExpense.review.liabilities,
        component: () =>
          import("@/views/verify-income-expense/ReviewLiabilities.vue"),
        meta: {
          title: "Income & Expenses",
          heading:
            "Please review your liabilities below before you proceed to the next stage.",

          nextNavigation: routeReviewApplication.aboutCreditCardLoan,
        },
      },
    ],
  },
];

export default verifyIncomeExpenseRoute;
