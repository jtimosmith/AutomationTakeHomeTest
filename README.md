# Take Home Test

All tests were done using the Cypress.io automation framework.

To properly run the tests, please install Cypress on your machine as instructed here: https://docs.cypress.io/guides/getting-started/installing-cypress

---

UI AUTOMATION TEST
-

The UI automation test is stored in the `cypress` directory which is configured by the `cypress.json` config file. To run the UI automation, open a command line window, navigate into the `Automation` directory, and run `npx cypress open --config-file "cypress.json"`. From there, select `ui_automation_test.js` in the `Integration Tests` window and the test should begin running.

NOTES

- To access the code, navigate to `Automation --> cypress --> integration --> ui_automation_test.js`.
- The `cypress.json` file was configured to bypass the Cypress same-origin policy since that was blocking the native browser's access to `www.saucedemo.com`.
- In lines 21-24, there is a repeat of the login process since there was a bug on the `www.saucedemo.com` cart page where the user would be logged out after pressing the cart icon once their items were added to it. Once the user logged back in and attempted to access the cart page, they would be able to do so.
- All webpage elements were parsed using the Google Chrome `Inspect` tool.

---

API AUTOMATION TEST
-

The API automation test is stored in the same `cypress` directory as the UI automation test. To run the API automation, open a command line window, navigate into the `Automation` directory, and run `npx cypress open --config-file "cypress.json"`. From there, select `api_automation_test.js` in the `Integration Tests` window and the test should being running.

NOTES

- All information was accessed via the openweathermap.org API.
- The API key used to access the openweathermap.org server was generated by my personal account. In the event that the request times out, please let me know and I can generate a new API key.
- All the data presented to the user was weather information that I personally refer to when accessing the weather.

---

Author: Jason Smith
