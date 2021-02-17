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

#### Stuck?

Need help? Try the [Code by Numbers](./recipe-finder_CBN.md)
