<script setup>
import { computed } from 'vue'

const props = defineProps(['language', 'guess1', 'guess2'])
const emit = defineEmits(['select'])

const languageImgUrl = computed(() => {
  return `/images/${props.language.image}`
})

const isShown = computed(() => {
  return (
    props.language.foundMatch || props.language === props.guess1 || props.language === props.guess2
  )
})
</script>

<template>
  <div class="card" :class="{ flipped: isShown }">
    <div class="card-inner" @click="emit('select')">
      <div class="back-side">
        <img src="/images/question-mark.png" alt="hidden card" />
      </div>
      <div class="language-side">
        <img :src="languageImgUrl" :alt="language.name" :title="language.name" />
      </div>
    </div>
  </div>
</template>

<style scoped>
img {
  height: 100px;
}
.card {
  background-color: transparent;
  width: 100px;
  height: 100px;
  perspective: 1000px;
  margin-top: 20px;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 0.3rem 0.8rem;
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.flipped .card-inner {
  transform: rotateY(180deg);
}

.back-side,
.language-side {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.back-side {
  background-color: goldenrod;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 60px;
}

.language-side {
  background-color: goldenrod;
  color: black;
  transform: rotateY(180deg);
}
</style>
