<script setup>
import Fieldset from 'primevue/fieldset'
import { favorites } from '../stores/favoritesStore'
import RecipeListItem from './RecipeListItem.vue'
</script>

<template>
  <Fieldset legend="Favorite Recipes" toggleable>
    <RecipeListItem
      v-for="recipe in favorites"
      :key="recipe.recipeId"
      :recipe-id="recipe.recipeId"
      :image-url="recipe.imageUrl"
      :title="recipe.title"
      :url="recipe.url"
      :categories="recipe.categories"
      :minutes="recipe.minutes"
      :servings="recipe.servings"
    />
  </Fieldset>
</template>
