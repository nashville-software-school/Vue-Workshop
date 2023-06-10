# Component Basics - Pick a framework

This exercise has you building a simple component that prompts the user to click the name of their favorite JavaScript framework

![](../images/Framework_Picker.gif)

## Instructions

_For this exercise build your component in the [Vue SFC Playground](https://play.vuejs.org/)_

1. Display 3 buttons to click with the text Angular, Vue, and React.
1. When the users clicks a button, a short dynamic message should appear. Example "Good choice! {framework} is a great tool!"
1. Dynamically display the logo of the framework. For the images, you can use these URLs:

- **Angular**: https://github.com/nashville-software-school/Vue-Workshop/blob/main/assets/framework-picker-logos/angular_logo.png?raw=true
- **React**: https://github.com/nashville-software-school/Vue-Workshop/blob/main/assets/framework-picker-logos/react_logo.png?raw=true
- **Vue**: https://github.com/nashville-software-school/Vue-Workshop/blob/main/assets/framework-picker-logos/vue_logo.png?raw=true

# Code By Numbers

1. Clear out any code that is already inside the `<script setup>` section
1. Add the 3 buttons to the template with the appropriate labels
1. In the script section, import the `ref` function from vue and use it to declare 2 variables--`framework` and `imageUrl`. Give them both an initial value of `null`
1. In the script section add functions for `selectAngular` `selectReact` and `selectVue`. They should each set the `framework` and `imageUrl` variables to the appropriate values. (Don't forget to use `.value` when accessing them from your script section)
1. Bind these functions to the click events of your 3 buttons
1. Using text interpolation, add the dynamic message text to your component's template
1. Add an `<img>` element to the template and bind its `src` attribute to you` imageUrl` variable
1. Use `v-if` on the `<img>` element so it doesn't show if `imageUrl` is still `null`
1. (Optional): See if you can refactor the 3 functions into 1 function which accepts a parameter. Example

```js
const selectFramework = (name) => {
  // ...
};
```
