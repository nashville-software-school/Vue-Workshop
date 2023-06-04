<script setup>
import { computed } from 'vue'

const props = defineProps(['team1', 'team2'])

const gameIsTied = computed(() => props.team1.score === props.team2.score)

const gameLeaderDisplay = computed(() => {
  const leadingTeam = props.team1.score > props.team2.score ? props.team1 : props.team2
  const lead = Math.abs(props.team1.score - props.team2.score)
  const points = lead === 1 ? 'point' : 'points'

  return `${leadingTeam.name} is leading by ${lead} ${points}`
})
</script>

<template>
  <div class="status">
    <p v-if="gameIsTied">The game is currently tied</p>
    <p v-else>
      {{ gameLeaderDisplay }}
    </p>
  </div>
</template>

<style scoped>
.status {
  color: rgba(255, 255, 255, 0.6);
  width: 100%;
  text-align: center;
  font-size: 20px;
  margin-bottom: 100px;
}
</style>
