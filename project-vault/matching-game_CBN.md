# Build a Matching Game

For this project, build a memory matching game which has users flip over cards to reveal images, and then try to find match that card's match.

[**View a Demo**](https://nss-vue-matching-game.web.app/)

> **NOTE**: I would recommend using the [lodash shuffle](https://www.npmjs.com/package/lodash.shuffle) package from npm to handle shuffling the cards. Once installed you can import it using
>
> ```js
> import shuffle from "lodash.shuffle";
> ```
>
> and call it like this
>
> ```js
> shuffle(arrayOfCards);
> ```

## Part 1

1. Download the [images](../assets/images.zip) to use for the cards. (You're also welcome to pick 12 different images if you'd rather the game use something else)
1. Use [this data](../assets/matching_game_data.js) to generate a list of 24 cards on the screen
1. The cards should be shuffled so they are not in any obvious order and are different every time the user plays
1. When the application starts, all cards should appear face down. Clicking on a card should display the image (you can do this either with `v-if` to hide/show or you can use `:class` bindings to create a "flip" animation)
1. If the user reveals 2 cards that are a match, those cards should remain face up. If a user selects a card followed by a non-matching card, the app should wait 1 second and then hide both

## Part 2

1. If the user matches all cards successfully, they should be shown a message at the top of the screen congratulating them.

# Code By Numbers

1. Create a new app using `vue create matching-game`
1. Download the images from the zip file linked above. Create an `images` folder inside the `assets` directory and add the photos inside there
1. Add a `data.js` file inside `/src` and copy in the sample code that's linked above
1. Install the `lodash.shuffle` npm package mentioned above
1. Create a new component named `MatchingGame` inside the components directory. In its `data` object, give it properties for `languages` `guess1` and `guess2`. `guess1` and `guess2` will eventually hold the language objects that the user clicks, but they should be initialized to `null`. `languages` should be the data from `data.js`. Use the `shuffle` function to shuffle the array
1. Add the `MatchingGame` component to `App.vue
1. Add a component named `Card.vue` in the components directory. Have it accept props for `language` `guess1` and `guess2`. In it's template, create an `img` tag to dynamically display the image.
   > **HINT**: To do this you'll likely need to use the `require` method which you may not have seen before now. To see an example of this, you can peek at [this blog](https://blog.mellisdesigns.com/using-dynamic-image-urls-in-vue-js/)
1. In `MatchingGame.vue`, iterate over all the languages and render a `Card` component for each one. Pass in `language` `guess1` and `guess2` as props
1. In `Card.vue` add logic to conditionally show either the language image or the default image with the question mark. One possible way to do this is to check if the language's `foundMatch` property is `true`, or if the language is equal to either `guess1` or `guess2`
1. In `Card.vue` add a click handler to the card. When the card gets clicked, the component should emit an event named `select` and pass in the language object in the event.
1. In the `MatchingGame` component add a listener on `Card` to handle the new `select` event. When the `select` event is triggered, handle this with a new method you create named `handleCardClick` which, for starters, just logs to the console the language object that was just clicked. Confirm everything is connected by clicking around the cards and inspecting the console
1. Update the `handleCardClick` method to set `guess1` to whatever language object was clicked. Doing this should now result in revealing a single card whenever it's clicked
1. Update `handleCardClick` further to add logic which checks if `guess1` has already been set. If it has, set `guess2` to the language object that was clicked. If `guess1` and `guess2` have both already been set, the function should return and not do anything. Doing this should now result in the user being able to reveal exactly 2 cards
1. Update `handleCardClick` further to check whether `guess1` and `guess2` are a match. If yes, then update each object's `foundMatch` property to `true`. If no, set a timeout for 2 seconds and revert `guess1` and `guess2` back to `null`. Doing this should result in a playable game
1. Add a computed property to `MatchingGame` named `foundAllMatches`. This should determine if all language objects have a `foundMatch` property of `true`. Use this computed property in the template to conditionally show a header message congratualting the player on finding all the matches

#### Still Stuck?

Try checking out the solution files [here](https://github.com/NSS-Vue-Workshop/Matching-Game)
