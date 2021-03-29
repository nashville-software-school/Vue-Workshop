# Build a Recipe Finder with the Spoonacular API

For this project, build an app that will use **Vuex** and the [Spoonacular API](https://spoonacular.com/food-api/) to find your users a random recipe that meet your criteria. Users should be able to specify key ingredients they'd like in their recipe, any dietary restrictions they have, and what type of meal they are interested in

[**View a Demo**](https://nss-vue-recipe-assistant.web.app/)

> **NOTE**: Before you begin you'll need to [register with Spoonacular](https://spoonacular.com/food-api/console#Dashboard) to get an API key. You'll want to use the endpoint for [getting a random recipe](https://spoonacular.com/food-api/docs#Get-Random-Recipes) and pass your api key in as a query param in the URL. Example: `https://api.spoonacular.com/recipes/random?number=1&tags=vegetarian,dessert&apiKey=YOURAPIKEY`

## Part 1

1. Add a `FIND RECIPE` button on the screen. When the user clicks the button the application should fetch 3 random recipes (don't worry about filtering yet) from Spoonacular and display them on the page in separate cards. **NOTE**: it should only take 1 `fetch` call to do this. The cards should display the recipe's image, title, number of servings, prep time in minutes, and a link to the full recipe

## Part 2

1. Add a section to the app with an input box for users to type in Key Ingredients. The user should be able to enter as many key ingredients as they like and the list of the ingredients they have entered should appear above the input box
1. Clicking the `FIND RECIPE` button should return only recipes that include the Key Ingredients that have been entered

## Part 3

1. Add a section to the app with a list of dietary restrictions that Spoonacular supports. These restrictions should include:
   - Gluten Free
   - Ketogenic
   - Vegetarian
   - Vegan
   - Pescatarian
   - Paleo
   - Whole30
1. Clicking each item should toggle them on and off. Users should be able to select as many dietary restrictions as they like
1. Clicking the `FIND RECIPE` button should return only recipes that meet the selected dietary restrictions. **NOTE**: Spoonacular's random recipe endpoint supports this however you'll need to convert each of these to lowercase in the URL for it to work. For example `gluten free` will work as a value but `Gluten Free` will not

## Part 4

1. Add a section to the app with a list of meal types that Spoonacular supports. This list should include:
   - Breakfast
   - Lunch
   - Main Course
   - Side Dish
   - Dessert
1. Clicking each item should toggle it on and off. Users should only be allowed to have _ONE_ mealType selected
1. Clicking the `FIND RECIPE` button should return only recipes that match the selected meal type. **NOTE**: Same as before, the Spoonacular endpoint will support these meal types but you must lowercase them in the URL for them to work

# Code By Numbers

### Part 1

1. Register for a Spoonacular API key
1. Create a new app using `vue create recipe-assistant` (don't forget to select **Vuex**) and add Vuetify using `vue add vuetify`
1. Create a `.env.local` file at the root of the project and add an entry for `VUE_APP_SPOONACULAR_KEY` using your API key
1. Add state property to the Vuex store named `searchResults` and initialize it to an empty array. This will be where you will hold the recipes returned by Spoonacular
1. Create a simple mutation named `setSearchResults` in the Vuex store that will update the `searchResults`
1. Create an action in the Vuex store named `getRandomRecipes`. This action should make a fetch call to `https://api.spoonacular.com/recipes/random?number=3&apiKey=${process.env.VUE_APP_SPOONACULAR_KEY}`. Commit the `setSearchResults` mutation and pass in the list of recipes that are returned
1. In `App.vue` import the `mapActions` method and add the `getRandomRecipes` to the component's methods
1. In `App.vue` add the `FIND RECIPES` button to the component's template. Attach the `getRandomRecipes` method to its click event. Run the application and click the button. Confirm in devtools that the request was successful and that `searchResults` is now an array of 3 objects in the Vuex store
1. Create a component named `RecipeResults.vue` in the `src/components` directory. Import the `mapState` method from vuex and add `searchResults` to the component's `computed` property
1. In the `RecipeResults` template, iterate over `searchResults` and display a card for each recipe containing the required image and information
1. Add the `<recipe-results>` component to the template inside `App.vue`

### Part 2

1. Update the Vuex store's state to add a property named `ingredients`. Initialize it to an empty array. This is where you will hold the key ingredients the user will enter as strings
1. In the Vuex store create 2 mutations named `addIngredient` and `removeIngredient`. `addIngredient` should add whatever gets passed in to the `ingredients` array. `removeIngredient` should remove whatever gets passed in from the `ingredients` array
1. Create a component named `KeyIngredients.vue` in `src/components` directory. Import the `mapMutations` and `mapState` methods from vuex. Add `addIngredient` and `removeIngredient` to the component's methods and `ingredients` to the component's computed property
1. In the `KeyIngredients` data, add a property for `ingredient` and initialize to to an empty string. This will be the property to bind to the input box
1. In the `KeyIngredients` template add a card element with an input box. Wrap the input box in a `<v-form>` element and bind the input box to `ingredient` using `v-model`
1. In the `KeyIngredients` component add a method named `submit`. This method should take the value of `ingredient` and pass it in to the `addIngredient` method. It should then reset the value of `ingredient` back to an empty string.
1. Attach the `submit` method to the form's submit event
1. Add the `<key-ingredient>` component to the template in `App.vue`. Try running the app; type in the text box and hit Enter. Confirm in devtools that the value of the input box was added to `ingredients` in the Vuex store and that the form resets
1. In the `KeyIngredients` template, use the Vuetify `<v-chip-group>` and `<v-chip>` [Vuetify components](https://vuetifyjs.com/en/components/chip-groups/) to iterate over the `ingredients` array and display a chip for each one
1. In the `<v-chip>` element, bind to the click event (or even better, the `click:close` event that Vuetify has defined) to call `removeIngredient`. Try running the app. Clicking the chip should remove the ingredient from the screen and from the Vuex store
1. In the Vuex store, create a `getters` property and add a method named `recipeURL`. This computed property will return the value of the Spoonacular URL with all the [appropriate tags](https://spoonacular.com/food-api/docs#Get-Random-Recipes) in lower case. Note that `tags` in the Spoonacular URL needs to be a comma-separated list of words. For example if the `ingredients` array in the store contains the values "Chocolate" and "Hazelnut", the tags query param should look like `&tags=chocolate,hazelnut`
1. Update the `getRandomRecipes` action so that it makes the fetch call to the new `recipeURL`. Run the app and test it with a couple key ingredients added

### Part 3

1. Update the Vuex state to include a property named `diets` and give it an initial value of an empty array. This is where you will hold the dietary restrictions the user selects as strings
1. Add 2 mutations named `addDiet` and `removeDiet`. These should behave the same as the `addIngredient` and `removeIngredient` mutations you created in the last section
1. Create a new component named `DietSelect` in the `src/components` directory. In the component's data, define a property named `options`. It should be an array of strings containing "Gluten Free", "Ketogenic", "Vegetarian", "Vegan", "Pescatarian", "Paleo", and "Whole30"
1. In the `DietSelect` template use the `<v-chip-group>` and `<v-chip>` [Vuetify components](https://vuetifyjs.com/en/components/chip-groups/) to display a chip for each option
1. Add the `<diet-select>` component to the `App.vue` template. Run the app and confirm that the diet options are visible as chips
1. In the `DietSelect` component, import `mapState` and `mapMutations` from vuex. Add `addDiet` and `removeDiet` to the component's methods and `diets` to the component's computed property
1. In the `DietSelect` component define a method named `toggle` which takes an option as a parameter. Do some logic to see if the option is already selected in the `diets` array and conditionally call either `addDiet` or `removeDiet`
1. In the `DietSelect` template bind the `diets` array to the `<v-chip-group>`'s `value` attribute. Set its `active-class` attribute to "primary--text". Confirm this is working by running the app and toggling the chips on and off. They should change colors when they are activated
1. In the Vuex store, update the `recipeURL` method to _also_ include the list of selected diets in the `tags` query param (lower-cased). For example, if the `diets` array contains `Vegan` and `Gluten Free` the tags param should contain something that looks like this `&tags=vegan,gluten free`. Run the app and confirm that the user can filter by both diets and key ingredients

### Part 4

1. Update the Vuex store to include a property named `mealType`. This will hold the type of meal the user can optionally filter by. Default its value to `null`
1. In the Vuex store create a mutation named `setMealType`. It should simply set the value of `mealType`
1. Create a component named `MealTypeSelect.vue` in the `src/components` directory. In the component's data, define a property named `options`. This will be an array of the following strings: "Breakfast", "Lunch", "Main Course", "Side Dish", and "Dessert"
1. In the component template add a card and use the `<v-chip-group>` and `<v-chip>` Vuetify components to iterate over each of the options and display a chip for each
1. Add the `<meal-type-select>` component to `App.vue`. Run the app and confirm that the list of options is visible as chips
1. Import `mapState` and `mapMutations` from vuex. Add `mealType` to the component's computed properties and `setMealType` to the component's methods
1. Bind `mealType` to the `<v-chip-group>`'s `value` attribute. Set it's `active-class` attribute to "green--text"
1. Add a method to the component named `toggle` which accepts an option as a parameter. Call `setMealType` and pass in the option _unless_ `mealType` is already equal to the option. If they are equal, set the `mealType` to null--this way a user can toggle a meal type on and off
1. In the Vuex store, update the `recipeURL` computed property to also include the lower-cased `mealType` in the `tags` param

#### Still Stuck?

Try checking out the solution files [here](https://github.com/NSS-Vue-Workshop/Recipe-Assistant)
