<script setup>
import { avatarUrl } from '../stores/avatarStore'

const downloadImage = async () => {
  const response = await fetch(avatarUrl.value)
  const blobImage = await response.blob()

  const url = URL.createObjectURL(blobImage)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = 'Avatar.svg'

  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
  window.URL.revokeObjectURL(url)
}
</script>

<template>
  <div>
    <img :src="avatarUrl" alt="Avatar" class="is-block mx-auto" />
    <div class="is-flex mt-4 is-justify-content-center">
      <button class="button has-text-centered is-info is-outlined" @click="downloadImage">
        Download Avatar.svg
      </button>
    </div>
  </div>
</template>

<style scoped>
img {
  height: 30rem;
}
</style>
