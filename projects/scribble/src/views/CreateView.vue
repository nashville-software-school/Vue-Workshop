<script setup>
import { Timestamp, addDoc } from 'firebase/firestore'
import { getDownloadURL, ref as getStorageRef, uploadBytes } from 'firebase/storage'
import Button from 'primevue/button'
import Chips from 'primevue/chips'
import FileUpload from 'primevue/fileupload'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { postsCollection, storage } from '../firebase'
import { user, username } from '../stores/authStore'

const form = ref({
  title: '',
  subtitle: '',
  content: '',
  imageUrl: 'https://picsum.photos/600/400', // TODO
  tags: [],
  publishDate: null,
  readTime: 0,
  authorId: user.value.uid,
  authorAvatar: user.value.photoURL,
  authorName: username.value
})

const image = ref(null)

const onFileSelect = (event) => {
  image.value = event.files[0]
}

const router = useRouter()

const onSubmit = async () => {
  if (image.value) {
    const originalFilename = image.value.name
    const fileExtension = originalFilename.split('.').pop()
    const newFileName = `${Date.now()}.${fileExtension}`

    // This is a reference to where in Firebase this particular file will be stored
    const imageRef = getStorageRef(storage, newFileName)
    await uploadBytes(imageRef, image.value)
    const newImageUrl = await getDownloadURL(imageRef)

    form.value.imageUrl = newImageUrl
  }

  // Set publish date to now
  form.value.publishDate = Timestamp.now()

  // calculate the read time
  const totalWords = form.value.content.split(' ').length
  const readTime = Math.floor(totalWords / 250)
  form.value.readTime = readTime

  const response = await addDoc(postsCollection, form.value)

  router.push(`/post/${response.id}`)
}
</script>

<template>
  <div>
    <form @submit.prevent="onSubmit">
      <div class="flex flex-column mt-6">
        <InputText v-model="form.title" placeholder="Title" class="mb-2" />
        <InputText v-model="form.subtitle" placeholder="Subtitle" class="mb-2" />
        <Chips v-model="form.tags" placeholder="Tags" class="mb-2" />
        <FileUpload
          custom-upload
          accept="image/*"
          :max-file-size="1_000_000"
          choose-label="Choose Image"
          mode="basic"
          class="mb-2"
          @select="onFileSelect"
        />
        <Textarea v-model="form.content" auto-resize rows="30" class="mb-2" />
      </div>

      <Button type="submit">Publish</Button>
    </form>
  </div>
</template>
