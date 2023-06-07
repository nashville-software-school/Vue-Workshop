<script setup>
import AvatarForm from './components/AvatarForm.vue'
import AvatarImage from './components/AvatarImage.vue'
</script>

<template>
  <div id="app">
    <header>
      <h1 class="has-text-primary is-size-1 has-text-centered">Avatar Builder</h1>
    </header>

    <main class="px-4">
      <AvatarForm />
      <div>
        <AvatarImage />
      </div>
    </main>
  </div>
</template>

<style scoped>
main {
  max-width: 65rem;
  margin: 2rem auto;
}
</style>
