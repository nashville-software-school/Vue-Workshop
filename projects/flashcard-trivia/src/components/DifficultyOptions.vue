<script setup>
import { ref } from 'vue'

const props = defineProps(['selectedDifficulty'])
const emit = defineEmits(['difficultyChange'])

const difficultyOptions = ref(['easy', 'medium', 'hard', 'all'])
</script>

<template>
  <div class="options">
    <div
      v-for="difficulty in difficultyOptions"
      :key="difficulty"
      class="option"
      :class="{ selected: props.selectedDifficulty === difficulty }"
      @click="emit('difficultyChange', difficulty)"
    >
      {{ difficulty }}
    </div>
  </div>
</template>

<style scoped>
.options {
  display: flex;
  justify-content: center;
}

.option {
  margin: 0 1rem;
  color: #ffffffcc;
  cursor: pointer;
}

.option.selected {
  transform: scale(1.1);
  color: goldenrod;
  transition: all 0.15s ease-out;
  border-bottom: 0.2rem solid goldenrod;
}
</style>
