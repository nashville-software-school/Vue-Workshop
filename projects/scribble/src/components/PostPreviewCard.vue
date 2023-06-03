<script setup>
import Avatar from 'primevue/avatar'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Tag from 'primevue/tag'

const props = defineProps(['post'])
</script>

<template>
  <Card class="w-25rem">
    <template #header>
      <div
        class="w-full h-10rem bg-primary bg-cover bg-center"
        :style="{ backgroundImage: `url(${props.post.imageUrl})` }"
      ></div>
    </template>
    <template #title>{{ props.post.title }}</template>
    <template #subtitle>{{ props.post.subtitle }}</template>

    <template #content>
      <div>
        <div class="flex align-items-center text-xs mb-2">
          <Avatar :image="props.post.authorAvatar" shape="circle" />
          <span class="ml-2"><strong>Written by</strong> {{ props.post.authorName }}</span>
        </div>
        <div class="flex mb-3">
          <Tag v-for="tag in props.post.tags" :key="tag" class="mr-1" :value="tag"></Tag>
        </div>
        <div class="text-sm text-600">
          <i class="pi pi-clock"></i>
          <span class="ml-1"> Read Time: {{ props.post.readTime }}min </span>
        </div>
      </div>
    </template>
    <template #footer>
      <RouterLink :to="`/post/${post.id}`">
        <Button outlined>Read Article</Button>
      </RouterLink>
    </template>
  </Card>
</template>
