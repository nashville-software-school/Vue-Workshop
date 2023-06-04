<script setup>
import { computed } from 'vue'

const props = defineProps(['questions'])

const correctCount = computed(() => {
  return props.questions.filter((q) => {
    return q.word.toUpperCase() === q.userInput.toUpperCase()
  }).length
})

const hasPerfectScore = computed(() => {
  return correctCount.value === props.questions.length
})
</script>

<template>
  <div>
    <div>
      <p>Results: {{ correctCount }} / {{ props.questions.length }}</p>
      <p v-if="hasPerfectScore">PERFECT SCORE!</p>
    </div>

    <div class="words">
      <div v-for="question in questions" :key="question.word">
        <span v-if="question.word.toUpperCase() === question.userInput.toUpperCase()"> ✅ </span>
        <span v-else> ❌ </span>
        <span>{{ question.word }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.words {
  width: 13rem;
  margin: 2rem auto;
  text-align: left;
  font-size: 1.3rem;
}
</style>
