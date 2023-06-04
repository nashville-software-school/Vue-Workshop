<script setup lang="ts">
const props = defineProps(['team1', 'team2'])
</script>

<template>
  <h1>
    <span :class="{ winning: team1.score > team2.score }">{{ props.team1.name }}</span>
    <span>vs.</span>
    <span :class="{ winning: team2.score > team1.score }">{{ props.team2.name }}</span>
  </h1>
</template>

<style scoped>
h1 {
  font-size: 8vw;
  margin-bottom: 0;
}
.winning {
  color: goldenrod;
}
</style>
