<script setup>
import { ref } from 'vue'
import GameStatus from './GameStatus.vue'
import MatchupTitle from './MatchupTitle.vue'
import ScoreCard from './ScoreCard.vue'

const team1 = ref({ name: 'Team 1', score: 0 })
const team2 = ref({ name: 'Team 2', score: 0 })

const addPoint = (team) => {
  team.score++
}

const subtractPoint = (team) => {
  if (team.score > 0) {
    team.score--
  }
}
</script>

<template>
  <div id="app">
    <MatchupTitle :team1="team1" :team2="team2" />
    <GameStatus :team1="team1" :team2="team2"></GameStatus>
    <div class="scores">
      <ScoreCard
        :score="team1.score"
        @increment="addPoint(team1)"
        @decrement="subtractPoint(team1)"
      />
      <ScoreCard
        :score="team2.score"
        @increment="addPoint(team2)"
        @decrement="subtractPoint(team2)"
      />
    </div>
  </div>
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 60px;
}
.scores {
  display: flex;
  justify-content: space-evenly;
}
</style>
