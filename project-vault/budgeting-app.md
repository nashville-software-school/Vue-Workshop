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

#### Stuck?

Need help? Try the [Code by Numbers](./budgeting-app_CBN.md)
