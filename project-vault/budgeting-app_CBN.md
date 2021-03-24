# Build a Budgeting Tool

For this project, build dashboard to manage your monthly expenses. This can be an opportunity to get more experience with computed properties and data visualization.

[**View a Demo**](https://nss-vue-budget.web.app/)

> **NOTE**: I would recommend using the [ApexCharts](https://apexcharts.com/docs/vue-charts/) library for building the pie graph however there are other tools out there that can also get the job done. For data persistence I recommend using local storage although you may choose to use Firebase's Firestore if you prefer.

## Part 1

1. Create a place where the user can enter in their total annual income
1. Create a place where the user can enter multiple monthly expenses. Give them 2 inputs for the expenses' name and amounts.
1. List all the entered monthly expenses in a table view.
1. Allow the user to delete expense items from the table view

## Part 2

1. Add a card to the dashboard to show the monthly net amount. This should be calculated by taking the annual income divided by 12 and subtracting the total monthly expenses
1. If the monthly net amount is greater than or equal to $0, the text color should be green. If it's less that $0 it should be red

## Part 3

1. Add a card to the dashboard to show the annual net amount. This should be calculated by taking the annual income and subtracting the total monthly expenses multiplied by 12
1. If the annual net amount is greater than or equal to $0, the text color should be green. If it's less that $0 it should be red

## Part 4

1. Persist the value of the annual income and the array of monthly expenses (in either local storage or Firebase) so that the application can survive a page refresh

## Part 5

1. Add a card to the dashboard showing a pie chart breaking down the user's monthly expenses

# Code By Numbers

## Part 1

1. Create a new app using `vue create monthly-budget` and add Vuetify using `vue add vuetify`
1. In `App.vue` add 2 data properties for `annualIncome` and `monthlyExpenses`. Initialize them to zero and an empty array respectively
1. Create an `AnnualIncome.vue` component and have it accept a prop of `annualAmount`. Add a card with an input to its template and bind `annualAmount` to the input's `v-model`
1. Add the `AnnualIncome` component to the `App.vue` template and pass in `annualIncome` as props
1. Create an `Expenses.vue` component with accepts a prop of `expenses`. Give it data properties for `name` and `amount`
1. Add a card with a form and 2 input fields to the template and bind the `name` and `amount` properties to them
1. Create a `handleSubmit` method and attach it to the form's submit event. The method should add an object to the `expenses` array. The object that's being added should use the `name` and `amount` properties. Make sure amount is a number and not a string. After adding the object, reset the component's `name` and `amount` properties to `null`
1. Add the `Expenses` component to the template in `App.vue`. Pass in the `monthlyExpenses` array as a prop

## Part 2 & 3

1. Add an `IncomeCard.vue` component which will be used for both the Annual Net and Monthly Net cards. Have it accept props for `title` and `netAmount`. `title` will be the text to put in the card header and `netAmount` will be the dollar amount to show inside the card
1. Create a computed property named `displayAmount` which will return a formatted currency string using the `netAmount`. **HINT**: use the [JavaScript Intl.NumberFormat class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) to help with this
1. In the `IncomeCard.vue` template, add 2 header tags and render the `title` text as well as the `displayAmount`
1. Use the `:class` binding on the `displayAmount` header so that a class of `green--text` gets added if `netAmount` is greater than 0. Do the same so that a class of `red--text` gets added if `netAmount` is less that 0
1. In the `App.vue` template add 2 `IncomeCard` components. Pass them `title` props of "Monthly Net" and "Annual Net" respectively. Pass them a hard coded value for `netAmount` to start with. Try with positive and negative numbers to test whether the class binding and coloring is correct
1. In `App.vue` implement 5 computed properties:
   - **monthlyIncome**: The annual income divided by 12
   - **totalMonthlyExpenses**: The sum of all monthly expenses
   - **annualExpenses**: The total monthly expenses multiplied by 12
   - **monthlyNet**: The monthly income subtracted by total monthly expenses
   - **annualNet**: The annual income subtracted by annual expenses
1. In the `App.vue` template remove the hard coded `net-amount` props passed to the `IncomeCard` components. Replace them with values for `monthlyNet` and `annualNet` respectively

## Part 4

1. In the `AnnualIncome` component add a method called `saveIncome` which saves the value of `annualAmount` to localStorage. Bind this method to the input's blur event
1. In the `Expenses` component update the `handleSubmit` method so that it saves the `JSON.stringify`-ed value of the `expenses` array
1. In `App.vue` use the `created` lifecycle hook (HINT - the syntax for this is the same as `mounted` except we use `created`) and check localStorage for a existing `annualIncome` and `expenses`. If they exists, parse them and set `this.annualIncome` and `this.monthlyExpenses` to their values. If this is done correctly, you should be able to refresh the application without the data resetting

## Part 5

1. Install the chart libraries using `npm install apexcharts vue-apexcharts`
1. Update `main.js` as described in the [ApexCharts docs](https://apexcharts.com/docs/vue-charts/) to tell Vue to use `VueApexCharts` and register the `apexchart` component
1. Create a `PieChart.vue` component and have it accept props for `expenses` and `totalAmount`
1. Consult the docs on [creating a pie chart](https://apexcharts.com/docs/chart-types/pie-donut/). Create computed properties for `series` and `options`. `series` should map over `expenses` and return an array of just the dollar amounts. `options` should return an object with a single property name `labels` whose value is an array of expense names which can be found by mapping over the `expenses` array
1. In the `PieChart` template add an `apexchart` component. Pass in values for its `type`, `options`, and `series` props
1. In the `App.vue` template, add the `PieChart` component and pass in `monthlyExpenses` for the `expenses` prop and `annualExpenses` for the `total-amount` prop

#### Still Stuck?

Try checking out the solution files [here](https://github.com/NSS-Vue-Workshop/Monthly-Budget)
