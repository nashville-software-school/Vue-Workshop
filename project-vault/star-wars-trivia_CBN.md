# Create a Star Wars Trivia flashcard game

For this project, create a set of flashcards which ask the user Star Wars trivia (or some other topic if you'd rather).

[**View a Demo**](https://nss-vue-trivia.web.app/)

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

1. Create a new app using `vue create trivia`
1. Add a trivia.js file in the `src` directory and copy in the data linked above
1. Create a `TriviaGame.vue` component, import the trivia array, and save it in the component's `data`
1. Create a `FlashCard.vue` component and have it take in a `card` prop. The component should render the card's question and a button to show the answer
1. In `TriviaGame` iterate over the cards in the trivia array and render a `FlashCard` component for each
1. Add the `TriviaGame` component to `App.vue`
1. Add a click listener to the button in `FlashCard` and emit an event named `toggle` to the parent. Pass the card object up with the event
1. Update `TriviaGame` to listen for the toggle event on the `<flash-card>` component. When the toggle event happens, flip the card object's `answerShown` property to true/false
1. Update `FlashCard` to show the answer if the `answerShown` property is true. Use `v-if` to hide/show or use `:class` binding to add/remove classes that will animate a "flip" effect
1. Create a `DifficultyOptions.vue` component and put 4 buttons in the template for each of the difficulty options
1. Handle the click for those buttons by emitting an event called `difficulty-change` and pass in the difficulty
1. Add a property to `TriviaGame` `data` to hold the selected difficulty. Give it a default value of `"all"`
1. Handle the `difficulty-change` event by updating state
1. In `TriviaGame` add a computed property for the trivia objects filtered by the selected difficulty
1. Update the `v-for` statement to use the computed property
1. Add a "Hide All" button to `TriviaGame` that when clicked will set all the card's `answerShown` properties to `false`

#### Still Stuck?

Try checking out the solution files [here](https://github.com/NSS-Vue-Workshop/Star-Wars-Trivia)
