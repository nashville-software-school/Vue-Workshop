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

1. Once the user has submitted a spelling for all words, show them their results (e.g "Results: 8 / 10")
1. If the user scored a perfect score, present them with a message telling them so

## Part 3

1. As the user is taking the test, show them how many questions they have remaining (e.g. "Word 4 of 10")

#### Stuck?

Need help? Try the [Code by Numbers](./spelling-test_CBN.md)
