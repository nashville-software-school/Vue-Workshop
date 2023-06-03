<script setup>
import ProgressSpinner from 'primevue/progressspinner'
import { isFetching, keywords, searchResults } from '../stores/recipeStore'
import RecipeListItem from './RecipeListItem.vue'
</script>

<template>
  <div>
    <div v-if="keywords.length">
      <div v-if="isFetching">
        <h5 class="text-center">Searching for recipes...</h5>
        <div class="flex justify-content-center">
          <ProgressSpinner />
        </div>
      </div>
      <div v-else>
        Found {{ searchResults.length }} recipe(s) using
        <strong class="text-color-secondary">{{ keywords.join(', ') }}</strong>
      </div>
    </div>
    <p v-else>Add ingredients to find recipes</p>

    <div v-for="recipe in searchResults" :key="recipe.id" class="mt-3">
      <RecipeListItem
        :recipe-id="recipe.id"
        :image-url="recipe.image"
        :title="recipe.title"
        :categories="recipe.dishTypes"
        :minutes="recipe.readyInMinutes"
        :servings="recipe.servings"
        :url="recipe.sourceUrl"
      />
    </div>
  </div>
</template>
