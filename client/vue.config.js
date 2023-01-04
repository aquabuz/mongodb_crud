const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    "plugin:vue-scoped-css/vue3-recommended",
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'vue-scoped-css/no-unused-selector': 'error'
  },
});
