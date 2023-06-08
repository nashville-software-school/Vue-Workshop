# Build a Madlibs App

For this project, build a SPA that allows users to create and save their favorite Madlibs in a Firestore database. The app will have multiple views so you'll need to use the Vue Router.

[**View a Demo**](https://nss-vue-madlibz.web.app/)

## Part 1

1. Create a file somewhere in your project called `templates.js` and copy and paste [these](../assets/templates.js) contents inside it. This code contains templates for all the madlibs and exports 2 functions: `getByTitle` and `getRandomTemplate`
1. Create a home route with some sort of welcome message for your app. This should be visible when the user's URL path is `/`
1. Create a route for users to create their own Madlib. This route should fetch a random template using the `getRandomTemplate` function you copied in step 1 and dynamically render input fields on the page
1. When the user submits the form, the app should piece together the Madlib story and show it to the user
1. Create a navigation component (either a top navbar or a side nav) so that users can go between the different routes

## Part 2

1. Allow users to sign in via Google auth
1. If a user is logged in and creates a Madlib, they should be shown a button that allows them to save it. Clicking this button should save the Madlib to the Firestore database

## Part 3

1. Create a route for users to view their own saved Mablibs

## Part 4

1. Create a route for "Community Madlibs" which will show all saved Madlibs in the database

# HINTS

- Take a moment to familiarize yourself with the structure of data inside the `templates.js` file
- Create a firebase project, add Google auth, and create a Firestore database
- When building your Madlib form, you'll likely have to put your inputs inside a `v-for` loop. Vue allows you to access the index of the loop like this
  ```html
  <div v-for="(prompt, index) in template.prompts" :key="index">
    <v-text-field v-model="template.answers[index]" />
  </div>
  ```
