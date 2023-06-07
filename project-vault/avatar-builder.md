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

#### Stuck?

Need help? Try the [Code by Numbers](./avatar-builder_CBN.md)
