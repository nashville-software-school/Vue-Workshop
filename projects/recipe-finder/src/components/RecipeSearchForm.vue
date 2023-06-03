<script setup>
import Button from 'primevue/button'
import Chips from 'primevue/chips'
import Fieldset from 'primevue/fieldset'
import { ref } from 'vue'
import { search } from '../stores/recipeStore'
import RecipeSearchResults from './RecipeSearchResults.vue'

const ingredients = ref([])

const handleSubmit = () => {
  search(ingredients.value)
}
</script>

<template>
  <Fieldset legend="Search Recipes" :toggleable="true">
    <form @submit.prevent="handleSubmit" class="mt-4">
      <span class="p-float-label">
        <Chips id="chips" v-model="ingredients" class="block" />
        <label for="chips">Ingredients</label>
      </span>
      <div class="mt-4">
        <Button :disabled="!ingredients.length" type="submit">Search Recipes</Button>
      </div>
    </form>

    <div class="mt-6">
      <RecipeSearchResults />
    </div>
  </Fieldset>
</template>
