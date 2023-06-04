<script setup>
import { ref } from 'vue'
import MatchupTitle from './components/MatchupTitle.vue'
import ScoreCard from './components/ScoreCard.vue'
import GameStatus from './components/GameStatus.vue'

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
    <matchup-title :team1="team1" :team2="team2" />
    <game-status :team1="team1" :team2="team2"></game-status>
    <div class="scores">
      <score-card
        :score="team1.score"
        @increment="addPoint(team1)"
        @decrement="subtractPoint(team1)"
      />
      <score-card
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
