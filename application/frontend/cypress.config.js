const { defineConfig } = require("cypress");


module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Adjust the Base-URL
      config.baseUrl = 'http://localhost:80';

      // implement node event listeners here
      return config;
    },
  },
});

