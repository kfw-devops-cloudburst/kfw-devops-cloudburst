const { defineConfig } = require("cypress");


module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Adjust the Base-URL
      // config.baseUrl = 'http://localhost:80';
      config.baseUrl = 'https://cloudburstcomposeapp.azurewebsites.net/admin';
      
      // implement node event listeners here
      return config;
    },
  },
});

