<script setup>
const props = defineProps(['score'])
const emit = defineEmits(['increment', 'decrement'])
</script>

<template>
  <div class="box score-card">
    <p class="score">
      {{ props.score }}
    </p>
    <div class="actions">
      <button class="button button-minus" @click="emit('decrement')">-</button>
      <button class="button button-add" @click="emit('increment')">+</button>
    </div>
  </div>
</template>

<style scoped>
.box {
  position: relative;
  width: 25%;
  border: 10px solid rgba(255, 255, 255, 0.8);
}
.box:after {
  content: '';
  display: block;
  padding-bottom: 100%;
}
.score {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 8vw;
}
.actions {
  position: absolute;
  bottom: 5%;
  left: 10%;
  text-align: center;
  height: 20%;
  width: 80%;
}
.actions .button {
  height: 100%;
  width: 50%;
  font-size: 3vw;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
}
.button-add {
  border: 5px solid rgba(0, 255, 0, 0.4);
  background-color: rgba(0, 255, 0, 0.1);
}
.button-minus {
  border: 5px solid rgba(255, 0, 0, 0.4);
  background-color: rgba(255, 0, 0, 0.1);
}
</style>
