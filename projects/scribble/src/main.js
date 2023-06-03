import { onAuthStateChanged } from 'firebase/auth'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import PrimeVue from 'primevue/config'
import 'primevue/resources/primevue.min.css'
import 'primevue/resources/themes/mdc-light-indigo/theme.css'
import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import { auth } from './firebase'
import router from './router'
import { user } from './stores/authStore'

let initialAuthStateChecked = false
onAuthStateChanged(auth, (firebaseUser) => {
  const app = createApp(App)
  app.use(router)
  app.use(PrimeVue)

  user.value = firebaseUser
  if (!initialAuthStateChecked) {
    initialAuthStateChecked = true
    app.mount('#app')
  }
})
