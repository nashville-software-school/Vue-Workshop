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

#### Stuck?

Need help? Try the [Code by Numbers](./matching-game_CBN.md)
