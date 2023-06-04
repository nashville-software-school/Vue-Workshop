<script setup>
import { computed, ref } from 'vue'
import rebelLogoSvg from '../assets/images/rebel_logo.png'
import data from '../data/trivia.js'
import DifficultyOptions from './DifficultyOptions.vue'
import FlashCard from './FlashCard.vue'

const cards = ref(data)
const selectedDifficulty = ref('all')

const filteredCards = computed(() => {
  if (selectedDifficulty.value === 'all') {
    return cards.value
  }

  return cards.value.filter((c) => c.difficulty === selectedDifficulty.value)
})

const hideAll = () => {
  cards.value = cards.value.map((c) => ({
    ...c,
    answerShown: false
  }))
}
</script>

<template>
  <div>
    <img id="logo" :src="rebelLogoSvg" alt="Rebel Logo" />

    <h1 class="title">STAR WARS</h1>
    <h2 class="subtitle">TRIVIA</h2>

    <DifficultyOptions
      class="difficulties"
      :selected-difficulty="selectedDifficulty"
      @difficulty-change="selectedDifficulty = $event"
    />

    <section>
      <p class="reset" @click="hideAll">Flip All</p>
    </section>

    <main>
      <div class="cards">
        <FlashCard
          v-for="card in filteredCards"
          :key="card.question"
          :card="card"
          @toggle="card.answerShown = !card.answerShown"
        />
      </div>
    </main>
  </div>
</template>

<style scoped>
#logo {
  height: 8rem;
  display: block;
  margin: 2rem auto;
}

.title {
  text-align: center;
  font-size: 4rem;
  color: goldenrod;
  margin-bottom: 0;
}

.subtitle {
  color: #ffffffcc;
  text-align: center;
  font-size: 2.5rem;
  margin-top: 0.2rem;
}

.difficulties {
  text-align: center;
}

.reset {
  margin-top: 3rem;
  text-align: center;
  color: goldenrod;
  font-size: 0.8rem;
  cursor: pointer;
}

main {
  display: block;
  margin: 0 auto;
  max-width: 60rem;
}

.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
