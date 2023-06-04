<script setup>
const props = defineProps(['card'])
const emit = defineEmits(['toggle'])
</script>

<template>
  <div class="card" :class="{ flipped: card.answerShown }">
    <div class="card-inner">
      <div class="question">
        <h4>{{ props.card.question }}</h4>
        <div>
          <button @click="emit('toggle')">ANSWER</button>
        </div>
      </div>
      <div class="answer">
        <h4>{{ props.card.answer }}</h4>
      </div>
    </div>
  </div>
</template>

<style scoped>
button {
  font-family: 'Distant Galaxy', sans-serif;
  background-color: goldenrod;
  border: none;
  padding: 1rem 1.2rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 0.8rem;
  cursor: pointer;
}
.card {
  background-color: transparent;
  width: 18rem;
  height: 14rem;
  border: 1px solid #f1f1f1;
  perspective: 50rem;
  margin-top: 1.3rem;
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
.question,
.answer {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}
.question {
  background-color: #00000088;
  color: goldenrod;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 60px;
}
.answer {
  background-color: goldenrod;
  color: black;
  transform: rotateY(180deg);
}

h4 {
  margin: 1rem;
}
</style>
