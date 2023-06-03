import { ref } from 'vue'

const apiKey = import.meta.env.VITE_APP_API_KEY
const spoonacularBaseUrl = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}`

export const keywords = ref([])
export const searchResults = ref([])
export const isFetching = ref(false)

export const search = async (ingredients) => {
  keywords.value = [...ingredients]
  isFetching.value = true

  const url = `${spoonacularBaseUrl}&number=8&tags=${ingredients.join(',')}`
  const res = await fetch(url)
  const data = await res.json()

  searchResults.value = data.recipes
  isFetching.value = false
}
