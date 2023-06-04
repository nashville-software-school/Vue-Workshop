# Create a Spelling Tests app

For this project, create a spelling test that makes use of the webkit speech API. The user should be read 10 words and given a text input to try to spell each word. Afterwards they should be told how many words they spelled correctly.

[**View a Demo**](https://nss-vue-spelling-test.web.app/)

> **NOTE**: To get your browser to "speak"
>
> ```js
> const utterance = new SpeechSynthesisUtterance("Hello World");
> speechSynthesis.speak(utterance);
> ```

## Part 1

1. Use [this data](../assets/spellingData.js) to generate a list of spelling prompts
1. Show the user a button that will speak the current word when clicked.
1. Give the user a text input to type in their spelling of the word and a button to submit. Turn off spellcheck on the input (otherwise what's the point??)
1. When the user submits the spelling of a word, empty the input and allow the user to hear the next word and repeat the process

## Part 2

1. Once the user has submitted a spelling for all words, show them their total score (e.g "Results: 8 / 10") followed by the list of words and an indicator of whether they got it right or wrong.
1. If the user scored a perfect score, present them with a message telling them so

## Part 3

1. As the user is taking the test, show them how many questions they have remaining (e.g. "Word 4 of 10")

## Part 4 (Optional)

1. When the word changes, the new word should be immediately spoken without the user having to click the "Say Word" button. **HINT**: You can do this easily using the [watch](https://vuejs.org/guide/essentials/watchers.html) function from Vue. Example

```js
// watch takes 2 arguments that are both functions
watch(
  () => word, // this is a function that returns the thing we're watching
  () => sayWord() // this is the function we want to run when it changes
);
```

# Code By Numbers

1. Create a new app using `npm create vue@3` and remove all the boilerplate code.
1. Add a `data.js` file in the `/src` directory and paste in the code linked above. Feel free to change these words with ones of your choosing.
1. Add 3 ref variables to `App.vue`:
   - `questions` - initialize this to be the array from the `data.js`
   - `activeIndex` - this is the index of which word the user is on in the list. Initialize this to 0
   - `userInput` - this is to bind to the `<input />` we'll eventually add. It will hold the the value the user has typed. Initialize this to an empty string
1. Add a `<form>` with an `<input />` inside the `App.vue` template. Disable the spellchecker on the input by adding an attribute of `spellcheck="false"`. Bind the input to `userInput` using `v-model` and add a submit button to the form
1. Add a function called `handleSubmit` which, for starters, simply logs to the console the value of `userInput`. Attach that function to the form's submit event
1. Create a new component named `SpeechUtterance.vue` which accepts a `word` as props
1. Add a function to the `SpeechUtterance` component called `sayWord` which uses the `SpeechSynthesisUtterance` class as shown above. Have it speak the `word` which was given as props
1. Create a button with the text "Say Word" and attach the `sayWord` function to its click event
1. In `App.vue` add the `SpeechUtterance` component above the form. For the `word` prop, pass in the questions at the active index (which at this point should still be 0). At this point you should be able to click the button and have your browser speak the first word
1. In `App.vue` update the `handleSubmit` method so that it updates the `userInput` value on the active question with the value of `userInput`. It should also increment the `activeIndex` by 1 and reset the `userInput` back to an empty string. At this point the user should be able to listen to each word and submit a spelling
1. Create a new `SpellingScore` component which accepts a `questions` prop. Create a `computed` variable named `correctCount` which determines how many of the words have been spelled correctly (and ignore casing differences). Use this property in the component template to display the score (e.g. "Results 8 / 10")
1. In the `SpellingScore` template iterate over all the questions with `v-for` and show an indicator of if the user spelled it correctly (ignore casing).
1. In the `SpellingScore` component conditionally add a message congratulating the user if they've received a perfect score
1. In `App.vue` create a `computed` variable named `testFinished`. It should return a boolean based on whether the user has finished spelling all the words
1. In the `App.vue` template, conditionally show either the form or the score depending on whether or not the test has been finished. Remember to pass the `questions` into the `SpellingScore` component as props
1. Above the form in `App.vue` add a small heading to display which number word the user is on (e.g. "Word 4 of 10")
1. (**Optional**): Add the `watch` function to the `SpeechUtterance` component as described in the instructions above. The first function should return `props.word` and the second function should call `sayWord`

#### Still Stuck?

Try checking out the solution files [here](https://github.com/NSS-Vue-Workshop/Spelling-Test)
