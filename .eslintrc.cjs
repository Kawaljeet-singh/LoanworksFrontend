/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript/recommended",
    "@vue/eslint-config-prettier",
  ],
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "no-redeclare": "off",
    "@typescript-eslint/no-redeclare": [
      "error",
      {
        ignoreDeclarationMerge: true, // should allow namespace and class merge
      },
    ],
    "@typescript-eslint/no-explicit-any": "error",
  },
  env: {
    "vue/setup-compiler-macros": true,
    node: true,
  },
};
