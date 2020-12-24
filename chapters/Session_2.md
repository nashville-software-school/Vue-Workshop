![Vue Logo](../images/banner.jpg)

\*\* TODO: Prerequisites are spread op and object property shorthand

[![](https://img.shields.io/badge/component-data-green?logo=vue.js)](https://vuejs.org/v2/guide/instance.html#Data-and-Methods)
[![](https://img.shields.io/badge/component-text_interpolation-green?logo=vue.js)](https://vuejs.org/v2/guide/syntax.html#Text)
[![](https://img.shields.io/badge/component-v--for-green?logo=vue.js)](https://vuejs.org/v2/guide/list.html)
[![](https://img.shields.io/badge/component-props-green?logo=vue.js)](https://vuejs.org/v2/guide/components-props.html)
[![](https://img.shields.io/badge/component-class_binding-green?logo=vue.js)](https://vuejs.org/v2/guide/class-and-style.html)
[![](https://img.shields.io/badge/component-$emit_custom_events-green?logo=vue.js)](https://vuejs.org/v2/guide/components-custom-events.html)
[![](https://img.shields.io/badge/component-computed_properties-green?logo=vue.js)](https://vuejs.org/v2/guide/computed.html)

# Much ToDo About Vue

> **Learning Objectives**: By the end of this chapter you should know how to
>
> - Use multiple components
> - Render lists using `v-for`
> - Pass data to child components via `props`
> - $emit custom events to parent components
> - Define computed properties on a component
> - Use class binding to conditionally add CSS to an HTML element

## Use the CLI to create a project

TODO

## Creating dummy data

Let's start out by creating some data to play with. Create a `data.js` file inside the `src` directory and add the following data. Feel free to change these items any way you like.

```js
export const todoItems = [
  {
    id: 1,
    name: "Walk the dog",
    complete: false,
  },
  {
    id: 2,
    name: "Take out the trash",
    complete: false,
  },
  {
    id: 3,
    name: "Fold laundry",
    complete: false,
  },
];
```

## Adding a component

In the components folder add a new file and call it `TodoList.vue`. Stub out the 3 sections of the component and put a simple header in the template

```vue
<template>
  <div>
    <h3>ToDo List</h3>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
```

Now update the script section to import the array of items from `data.js` and store a copy of it in the component's `data`

```vue
<script>
import { todoItems } from "../data/todos";

export default {
  data() {
    return {
      todos: [...todoItems],
    };
  },
};
</script>
```

We've defined this component but we're not using it in our application yet. Let's have the `App` component use our new `TodoList` component. Update the script section of the `App` component to the following

```vue
<script>
import TodoList from "./components/TodoList";

export default {
  components: {
    TodoList,
  },
};
</script>
```

By adding a `components` property to our component object we can specify the other vue components we'll be using in this file. Now we're free to use our `TodoList` component in our template. Update the template in `App.vue` to use the `TodoList` component

```html
<template>
  <div id="app">
    <todo-list />
  </div>
</template>
```

You should now see the header from your `TodoList` component on the screen.

**NOTE**: When we imported the `TodoList` component in the script section we use **PascalCasing**, however when when use the component in our template we use **kebab-casing**. If you prefer your components to use PascalCasing in your templates (as you would in React), Vue also allows that. You could just as easily written that same statement above like this

```vue
<template>
  <div id="app">
    <TodoList />
  </div>
</template>
```

Either way is fine, however it's important to remain consistent throughout your application. The examples in this workshop will use kebab-casing.

## Iterating over the list

Our next step will be to create a component for a single ToDo item. Then we'll loop over the list of all items and render a component for each of them.

Create a `TodoItem.vue` file in the `components` folder and add the following code

```vue
<template>
  <div>
    <h2>I'm a todo item</h2>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
```

We want to be able to use this new component from our `TodoList` so let's take the same steps as before to import it. Add an import statement and a `components` property back in `TodoList.vue`

```vue
<script>
import { todoItems } from "../data/todos";
import TodoItem from "./TodoItem.vue";

export default {
  components: { TodoItem },
  data() {
    return {
      todos: [...todoItems],
    };
  },
};
</script>
```

Now in our template we can loop over every item and render a `TodoItem` component. Update your `TodoList` template to use the `v-for` directive

```html
<template>
  <div>
    <h3>ToDo List</h3>
    <div v-for="item in todos" :key="item.id">
      <todo-item />
    </div>
  </div>
</template>
```

You should now see 3 separate `TodoItem` components rendered--one for every item in the list.

If you're coming from a React background, the `key` attribute should feel familiar. If you're looping over an array in a template, Vue will want you to provide a unique key for each item so it can efficiently track the elements.
