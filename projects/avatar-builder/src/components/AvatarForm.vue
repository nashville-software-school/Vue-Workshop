<script setup>
import { avatarOptions } from '../stores/avatarStore'

const skinToneOptions = [
  { text: 'Skin Tone 1', value: '#FFDBAC' },
  { text: 'Skin Tone 2', value: '#F1C27D' },
  { text: 'Skin Tone 3', value: '#E0AC69' },
  { text: 'Skin Tone 4', value: '#C68642' },
  { text: 'Skin Tone 5', value: '#8D5524' },
  { text: 'Skin Tone 6', value: '#38160A' }
]

const hairOptions = [
  { text: 'Bald', value: 'bald' },
  { text: 'Balding', value: 'balding' },
  { text: 'Beanie', value: 'beanie' },
  { text: 'Bob Cut', value: 'bobCut' },
  { text: 'Bob Cut w/ Bangs', value: 'bobBangs' },
  { text: 'Undercut', value: 'bunUndercut' },
  { text: 'Buzzed', value: 'buzzcut' },
  { text: 'Cap', value: 'cap' },
  { text: 'Curly', value: 'curly' },
  { text: 'Curly Bun', value: 'curlyBun' },
  { text: 'Curly High Top', value: 'curlyHighTop' },
  { text: 'Long', value: 'long' },
  { text: 'Extra Long', value: 'extraLong' },
  { text: 'Fade', value: 'fade' },
  { text: 'Mohawk', value: 'mohawk' },
  { text: 'Pigtails', value: 'pigtails' },
  { text: 'Short Combover', value: 'shortCombover' },
  { text: 'Short Combover w/ Chops', value: 'shortComboverChops' },
  { text: 'Side Shave', value: 'sideShave' },
  { text: 'Bun', value: 'straightBun' }
]

const eyesOptions = [
  { text: 'Open', value: 'open' },
  { text: 'Closed', value: 'sleep' },
  { text: 'Happy', value: 'happy' },
  { text: 'Glasses', value: 'glasses' },
  { text: 'Sunglasses', value: 'sunglasses' },
  { text: 'Wink', value: 'wink' }
]

const facialHairOptions = [
  { text: 'None', value: null },
  { text: 'Full Beard', value: 'beardMustache' },
  { text: 'Goatee', value: 'goatee' },
  { text: 'Pyramid Mustache', value: 'pyramid' },
  { text: 'Walrus Mustache', value: 'walrus' },
  { text: 'Shadow', value: 'shadow' },
  { text: 'Soul Patch', value: 'soulPatch' }
]
</script>

<template>
  <div class="columns">
    <div class="field column is-one-fifth">
      <label class="label">Skin Tone</label>
      <div class="control">
        <div class="select">
          <select v-model="avatarOptions.skinColor">
            <option :value="null">Select</option>
            <option v-for="option in skinToneOptions" :key="option.value" :value="option.value">
              {{ option.text }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div class="field column is-one-fifth">
      <label class="label">Hairstyle</label>
      <div class="control">
        <div class="select">
          <select v-model="avatarOptions.hair">
            <option :value="null">Select</option>
            <option v-for="option in hairOptions" :key="option.value" :value="option.value">
              {{ option.text }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div class="field column is-one-fifth">
      <label class="label">Eyes</label>
      <div class="control">
        <div class="select">
          <select v-model="avatarOptions.eyes">
            <option :value="null">Select</option>
            <option v-for="option in eyesOptions" :key="option.value" :value="option.value">
              {{ option.text }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div class="field column is-one-fifth">
      <label class="label">Facial Hair</label>
      <div class="control">
        <div class="select">
          <select v-model="avatarOptions.facialHair">
            <option v-for="option in facialHairOptions" :key="option.value" :value="option.value">
              {{ option.text }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div class="field column is-one-fifth">
      <label class="label">Hair Color</label>
      <div class="control">
        <input v-model="avatarOptions.hairColor" class="input" type="color" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.control,
select,
.select {
  width: 100%;
}
</style>
