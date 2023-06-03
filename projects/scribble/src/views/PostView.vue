<script setup>
import { doc, getDoc } from 'firebase/firestore'
import Avatar from 'primevue/avatar'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { postsCollection } from '../firebase'

const post = ref(null)
const route = useRoute()

onMounted(async () => {
  const postRef = doc(postsCollection, route.params.id)
  const snapshot = await getDoc(postRef)
  post.value = snapshot.data()
})
</script>

<template>
  <div v-if="post" class="mt-4">
    <div
      class="w-full h-24rem bg-primary bg-cover bg-center bg-no-repeat"
      :style="{ backgroundImage: `url(${post.imageUrl})` }"
    ></div>
    <h1 class="mb-1">{{ post.title }}</h1>
    <p class="mt-1 text-gray-500 text-sm">{{ post.subtitle }}</p>
    <div class="flex align-items-center text-xs">
      <Avatar :image="post.authorAvatar" shape="circle" class="bg-gray-300 mb-2" />
      <span class="ml-2"><strong>Written by</strong> {{ post.authorName }}</span>
    </div>

    <p class="content line-height-4">{{ post.content }}</p>
  </div>
</template>

<style scoped>
.content {
  font-family: 'Baskervville', sans-serif;
}
</style>
