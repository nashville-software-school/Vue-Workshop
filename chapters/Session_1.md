![Vue Logo](../images/banner.jpg)

# Getting Started

> **Learning Objectives**: By the end of this chapter you should know how to
>
> - Create a single file component
> - Declare state in a component
> - Dynamically render component state in a template
> - Define a method on a component and call it from the template
> - Conditionally render parts of your template

Let's start out by playing with some of the Vue syntax inside of [CodeSandbox](https://codesandbox.io/s). At the `Create Sandbox` prompt, select the Vue option. The created vue app is similar to a brand new project created with Create-React-App.

## Exploring the starter files

### main.js

This is the entry point for our Vue applications. Every app will start by creating a new Vue instance, and will decide which component will should be rendered at the top of our component tree. Here we can see that the default behavior is to render the `App` component at the top of the tree.

```js
import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
```

### App.vue

This `App.vue` component is top of our component tree. Looking at the boilerplate code we get our first look into the structure of a Vue component.

This is an example of what Vue calls a Single File Component (SFC). The beauty here is that components have a separation of concerns. The file is split up into 3 distinct sections

- **template** - Where we define the html of our component
- **script** - Where we define the state and behavior of our component
- **style** - Where we define the styling of our components. By default, styling is done in CSS, however it can very easily be set up to use SCSS, LESS, or Stylus if that's your preference

We don't want any of this boiler plate code though, so lets empty out each of these sections so that the file look like this

```vue
<template>
  <div></div>
</template>

<script>
export default {};
</script>

<style></style>
```

Now behold our blank canvas and ponder the infinite possibilities!

## Making it our own

Let's start by hard coding something into the template. Add an `h1` tag into the template with the message "Hello World"

```vue
<template>
  <div>
    <h1>Hello World</h1>
  </div>
</template>
```

Now let's start to make it a little more dynamic. To do this, we'll need to add some _state_ to our component.

## Declaring State

To declare state in our component, add a method named `data` inside the object defined in the `<script>` tag. The data method should always return an object. The properties of that object are whatever you need to put in your component state. Update your `<script>` tag to include the following

```js
export default {
  data() {
    return {
      greeting: "Hello, Vue Developer",
    };
  },
};
```

## Template Binding

Our component now knows about a `name` property. We can render that property in our template using a set of double curly brackets.

```html
<template>
  <div>
    <h1>{{ greeting }}</h1>
  </div>
</template>
```

## Component Methods

Just like in React, our component is _reactive_--if we change the state of `greeting` we'll see the page re-render. Let's add a button to the template, and every time the user clicks it we'll add an exclamation mark to the greeting.

Underneath the `data` method, define a property on the object named `methods` whose value is an object. Inside that object define a method named `increaseExcitement` that looks like this

```js
export default {
  data() {
    return {
      greeting: "Hello, Vue Developer",
    };
  },
  methods: {
    increaseExcitement() {
      this.greeting += "!";
    },
  },
};
```

**IMPORTANT** Notice how inside the object, if we ever need a component to reference itself, we need to use the `this` keyword.

If we create a button in our template we can bind the `increaseExcitement` method to its click event.

```html
<template>
  <div>
    <h1>{{ greeting }}</h1>
    <button @click="increaseExcitement">More Excitement</button>
  </div>
</template>
```

We put an `@` symbol in front of events to let Vue know to call a method when that event happens. Want to experiment?? Try changing `@click` to `@mouseover`. Now `increaseExcitement` will be called any time your mouse touches the button (yikes!)

## Conditional Rendering with `v-if`

You're probably used to using ternary statements in your React code in order to conditionally render things. In Vue, if you want to show a DOM element only if some condition is true, you can use the simple `v-if` directive. Let's put a message on the screen if the greeting ends with at least 3 exclamation marks.

```html
<template>
  <div>
    <h1>{{ greeting }}</h1>
    <button @click="increaseExcitement">More Excitement</button>
    <div v-if="greeting.endsWith('!!!')">
      <p>Ok, we're sufficiently excited!</p>
    </div>
  </div>
</template>
```
