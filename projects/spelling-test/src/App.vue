<script setup>
import { computed, ref } from 'vue'
import SpeechUtterance from './components/SpeechUtterance.vue'
import SpellingScore from './components/SpellingScore.vue'
import data from './data'

const questions = ref([...data])
const activeIndex = ref(0)
const userInput = ref('')

const handleSubmit = () => {
  const activeQuestion = questions.value[activeIndex.value]
  activeQuestion.userInput = userInput.value

  activeIndex.value++

  userInput.value = ''
}

const testFinished = computed(() => {
  return activeIndex.value >= questions.value.length
})
</script>

<template>
  <div id="app">
    <h1>Spelling Test</h1>
    <div v-if="!testFinished">
      <p>Word {{ activeIndex + 1 }} of {{ questions.length }}</p>
      <SpeechUtterance :word="questions[activeIndex].word" />

      <form @submit.prevent="handleSubmit">
        <input type="text" v-model="userInput" spellcheck="false" placeholder="Spell the word" />
        <button type="submit">SUBMIT</button>
      </form>
    </div>
    <div v-else>
      <SpellingScore v-if="testFinished" :questions="questions" />
    </div>
  </div>
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

input {
  color: #333;
  font-size: 2.5rem;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  border: 4px solid black;
  border-radius: 0.2rem;
  width: 40%;
  display: block;
  margin-bottom: 20px;
  text-align: center;
}

button {
  display: inline-block;
  padding: 0.6em 1.2em;
  border: 0.1em solid black;
  margin: 0 0.3em 0.3em 0;
  border-radius: 0.2rem;
  box-sizing: border-box;
  text-decoration: none;
  text-align: center;
  transition: all 0.4 s;
  font-size: 1.5rem;
  cursor: pointer;
  color: white;
  background-color: black;
}
</style>
