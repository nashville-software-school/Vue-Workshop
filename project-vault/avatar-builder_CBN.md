# Create an Avatar Builder

For this project, create a form for users to build their own avatar. To do this, use the [DiceBear](https://www.dicebear.com/styles/personas) service which allows you to customize an avatar image URL by adding certain query parameters to the URL. Here are some examples. Click into each and take a look at how the URL parameters are affecting the avatar image

- Base Avatar: https://api.dicebear.com/6.x/personas/svg
- w/ mohawk https://api.dicebear.com/6.x/personas/svg?hair=mohawk
- w/ mohawk and smirk https://api.dicebear.com/6.x/personas/svg?hair=mohawk&mouth=smirk

The image URLs accept parameters for:

- body type
- clothing color
- eyes
- facial hair
- hair
- hair color
- mouth
- nose
- skin color

Take a look at the documentation site to see all the URL parameters it will accept and all the options for each. Your form should include at least four of these customizations for the user to select.

[**View a Demo**](https://nss-vue-avatar-builder.web.app/)

**HINTS & GOTCHAS**

1. While it's certainly not necessary to use a store for an application this small, try keeping the user's selections in a `avatarStore` file. In a larger application, something like a user avatar would be handy to have in a global store.
1. For picking colors, you can use normal `<input>` elements with a `type="color"` attribute
1. Be aware that color inputs will give you hex values with a `#` prefix e.g. `#ffffff` but when you use these hex values in your DiceBear URLs, it is does not want the `#` included. You'll want to remove that character in the URL e.g. `hairColor=ffffff`
1. If you want to add facial hair to your avatar, I noticed that it's not enough to just supply the `facialHair` parameter to the URL. I can't tell if this was intended or not, but you'll also need to supply the `facialHairProbability` parameter and give it a value of 100. e.g. `facialHair=goatee&?facialHairProbability=100`

## Part 1

1. Create a form with at least 4 avatar option for users to customize (e.g. skin tone, hair, hair color, eyes). Selectable options should be ones that you find from the DiceBear documentation
1. Using the options the user has selected, show the avatar using the DiceBear URL

## Part 2 (Optional)

1. Add a download button below the image for the user to save the avatar

# Code By Numbers

1. Create a new app using `npm create vue@3` and remove all the boilerplate code and add a simple `h1` element to the top of `App.vue` to display the title
2. Create a `stores` directory inside the src folder and add a file called `avatarStore.js`
3. Inside avatarStore export a ref variable called `avatarOptions` and give it properties for all the avatar options you want to support (eyes, facialHair, hair, hairColor, skinTone, etc) and default all the values to `null`
4. Stub out two empty components called `AvatarForm.vue` and `AvatarImage.vue` and render them inside the App component
5. Inside AvatarForm create array variables for each of the options you're supporting (e.g. `skinToneOptions`, `hairOptions`, `eyesOptions`, etc). The items in all the arrays should be objects with a `text` property and a `value` property. The `text` will hold the nicely formatted/human readable text, and the `value` property will hold the value that DiceBear is expecting. Example

```
const hairOptions = [
  { text: 'Curly Bun', value: 'curlyBun' },
  { text: 'Curly High Top', value: 'curlyHighTop' },
  ...
]
```

6. Import the `avatarOptions` object from the store into AvatarForm
7. In the form's template add select boxes for each of your customization options. Inside the `<select>` elements use a `v-for` on the `<options>` to dynamically add all the options to each. In the `<options>` tag, use text interpolation to render the options `text` property, but bind the `<option>` element's `value` attribute to the object's `value` property.
8. Add the appropriate `v-model`s to each of the `<select>` elements
9. For any customization that requires a color, create an `input` element with a `type="color"` attribute.
10. In the avatarStore create and export a computed variable called `avatarUrl`. For starters just have it return the DiceBear base URL:

```
https://api.dicebear.com/6.x/personas/svg
```

11. Inside the AvatarImage component import the `avatarUrl` variable from the store and bind it to the `src` of an `<img>` tag inside the template
12. In the avatarStore update the logic inside `avatarUrl` so that it creates a dynamic url based on the values inside `avatarOptions`.
13. Inside AvatarImage add a button underneath the image to trigger a download. You may need to google _"how to download images using javascript"_

#### Still Stuck?

Take a look at the demo code [here](https://github.com/nashville-software-school/Vue-Workshop/tree/main/projects/avatar-builder)
