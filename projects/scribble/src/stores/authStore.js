import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { computed, ref } from 'vue'
import { auth } from '../firebase'

export const user = ref(null)

export const login = () => signInWithPopup(auth, new GoogleAuthProvider())
export const logout = () => signOut(auth)

export const username = computed(() => {
  if (!user.value) return null

  return user.value.displayName.split(' ')[0]
})
