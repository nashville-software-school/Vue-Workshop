import { computed, ref } from 'vue'

export const avatarOptions = ref({
  skinColor: null,
  hair: null,
  hairColor: '#000000',
  eyes: null,
  facialHair: null
})

export const avatarUrl = computed(() => {
  const params = Object.entries(avatarOptions.value)
    .filter(([, val]) => val)
    .map(([key, val]) => `${key}=${val}`.replace('#', ''))

  let url = `https://api.dicebear.com/6.x/personas/svg?mouth=smile&${params.join('&')}`

  if (avatarOptions.value.facialHair) {
    url += '&facialHairProbability=100'
  }

  return url
})
