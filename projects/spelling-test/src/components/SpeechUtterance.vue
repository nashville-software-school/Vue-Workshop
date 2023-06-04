<script setup>
import { watch } from 'vue'

const props = defineProps(['word'])

const sayWord = () => {
  const utterance = new SpeechSynthesisUtterance(props.word)
  speechSynthesis.speak(utterance)
}

watch(() => props.word, sayWord)
</script>

<template>
  <div @click="sayWord" class="clickable">
    <img src="/speak.jpg" alt="Speak" />
    <h3>Say Word</h3>
  </div>
</template>

<style scoped>
.clickable {
  cursor: pointer;
}
h3 {
  margin-top: -35px;
}
</style>
