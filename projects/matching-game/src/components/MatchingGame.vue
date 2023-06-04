<script setup>
import shuffle from 'lodash.shuffle'
import { computed, ref } from 'vue'
import { getLanguageCards } from '../data'
import LanguageCard from './LanguageCard.vue'

const guess1 = ref(null)
const guess2 = ref(null)
const languages = ref(shuffle(getLanguageCards()))

const handleCardClick = (languageClicked) => {
  // if there are two cards already flipped prevent a third from being flipped
  if (guess1.value && guess2.value) return

  // if the user clicked the same card twice don't do anything
  if (guess1.value === languageClicked) return

  if (!guess1.value) {
    guess1.value = languageClicked
    return
  }

  if (!guess2.value) {
    guess2.value = languageClicked
  }

  const [lang1, lang2] = findMatchingLanguages(languageClicked)

  if (guess1.value.name === guess2.value.name) {
    lang1.foundMatch = true
    lang2.foundMatch = true
    guess1.value = null
    guess2.value = null
  } else {
    setTimeout(() => {
      // user made two wrong guesses. Wait 1.5 seconds and flip cards
      guess1.value = null
      guess2.value = null
    }, 1500)
  }
}

const findMatchingLanguages = (language) => {
  return languages.value.filter((l) => l.name === language.name)
}

const foundAllMatches = computed(() => languages.value.every((l) => l.foundMatch))

const restart = () => {
  languages.value = shuffle(getLanguageCards())
}
</script>

<template>
  <div class="game-board">
    <div class="headers">
      <h1 v-if="!foundAllMatches">Match all the languages</h1>
      <h1 v-if="foundAllMatches">Congrats! You found them!</h1>
      <span v-if="foundAllMatches" @click="restart" class="btn-restart">RESTART</span>
    </div>
    <div class="game-board">
      <div class="cell" v-for="language in languages" :key="language.id">
        <LanguageCard
          :language="language"
          :guess1="guess1"
          :guess2="guess2"
          @select="handleCardClick(language)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.headers {
  position: relative;
}

h1 {
  color: white;
  font-size: 3rem;
}

.btn-restart {
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-weight: bold;
  letter-spacing: 2px;
  display: inline-block;
}

.btn-restart:hover {
  color: goldenrod;

  border-bottom: 2px solid goldenrod;
  letter-spacing: 5px;
}

.game-board {
  display: flex;
  flex-wrap: wrap;
  align-items: space-between;
  justify-content: center;
  max-width: 80rem;
  margin: 0 auto;
}
.cell {
  padding: 1rem;
}
</style>
