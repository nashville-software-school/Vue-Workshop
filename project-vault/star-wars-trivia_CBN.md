# Create a Star Wars Trivia flashcard game

For this project, create a set of flashcards which ask the user Star Wars trivia (or some other topic if you'd rather).

[**View a Demo**](https://nss-vue-starwars-trivia.web.app/)

## Part 1

- Create a file somewhere in your project named `trivia.js` and add [these questions](../assets/trivia.js). If you don't want to use Star Wars trivia and would rather do something else, replace these questions with a topic of your choice.
- Using `v-for`, render 25 flash cards with these questions on the screen and the answers hidden.
- Each flash card should have a button or respond to some sort of click which reveals the answer
- Revealing the answer can be done by hiding/showing the text (using `v-if`), or by "flipping" the card using a CSS animation (using `:class` binding)

## Part 2

- Give the user buttons for Easy, Medium, Hard, and All which will filter the list of trivia questions on the screen depending on what they click.

## Part 3

- Give the user a Hide All button which will hide all answers that are being shown

# Code By Numbers

1. Create a new app using `npm create vue@3`
2. Add a `trivia.js` file in the src directory and copy in the data linked above
3. Create a `TriviaGame.vue` component, import the `trivia` array, and save it as a ref
4. Create a `FlashCard.vue` component and have it take in a card prop. The component should render the card's question and a button to show the answer
5. In TriviaGame iterate over the cards in the `trivia` array and render a FlashCard component for each
6. Add the TriviaGame component to App.vue
7. Add a click listener to the button in FlashCard and emit an event named `toggle` to the parent
8. Update TriviaGame to listen for the toggle event on the `<FlashCard>` component. When the toggle event happens, flip the card object's `answerShown` property to true/false
9. Update FlashCard to show the answer if the answerShown property is true. Use `v-if` to hide/show or use `:class` binding to add/remove classes that will animate a "flip" effect
10. Create a `DifficultyOptions.vue` component and put 4 buttons in the template for each of the difficulty options. (You can either code 4 buttons in the template or use a `v-for`)
11. Add a `selectedDifficulty` prop on DifficultyOptions and define an emit called `difficultyChange`
12. Handle the click for the buttons by emitting a `difficultyChange` event, and pass in the difficulty
13. Add a ref to TriviaGame to hold the selected difficulty. Give it a default value of "all" and pass this value into the `<DifficultyOptions>` component as a prop
14. In TriviaGame add a handler to the `<DifficultyOptions>` so that the `selectedDifficulty` gets updated when the `difficultyChange` event occurs
15. In DifficultyOptions add a css property that uses a different button color. Use class binding to conditionally add that class to a button if it's the current one selected
16. In TriviaGame add a computed value called `filteredCards` that filters for only the cards with the selected difficulty. Afterwards, update the `v-for` in the template to loop over this list instead. Be sure that when the user selects "all" that the entire list of cards is shown
17. Add a "Hide All" button to TriviaGame that when clicked will set all the card's `answerShown` properties to false

#### Still Stuck?

You can see how I did it [here](https://github.com/nashville-software-school/Vue-Workshop/tree/main/projects/flashcard-trivia)
