![Vue Logo](../images/banner.jpg)

> **NOTE**: There are ES6 prerequisites for this chapter
>
> - [Object property and method shorthand](https://www.youtube.com/watch?v=FtLRx14wl9s)
> - [Destructuring and spread operator](https://www.youtube.com/watch?v=NIq3qLaHCIs)

[![](https://img.shields.io/badge/component-data-green?logo=vue.js)](https://vuejs.org/v2/guide/instance.html#Data-and-Methods)
[![](https://img.shields.io/badge/component-text_interpolation-green?logo=vue.js)](https://vuejs.org/v2/guide/syntax.html#Text)
[![](https://img.shields.io/badge/component-v--for-green?logo=vue.js)](https://vuejs.org/v2/guide/list.html)
[![](https://img.shields.io/badge/component-props-green?logo=vue.js)](https://vuejs.org/v2/guide/components-props.html)
[![](https://img.shields.io/badge/component-class_binding-green?logo=vue.js)](https://vuejs.org/v2/guide/class-and-style.html)
[![](https://img.shields.io/badge/component-$emit_custom_events-green?logo=vue.js)](https://vuejs.org/v2/guide/components-custom-events.html)
[![](https://img.shields.io/badge/component-computed_properties-green?logo=vue.js)](https://vuejs.org/v2/guide/computed.html)

# Much ToDo About Vue

In this chapter we're going to use multiple components to make a simple ToDo application.

> **Learning Objectives**: By the end of this chapter you should know how to
>
> - Use multiple components
> - Render lists using `v-for`
> - Pass data to child components via `props`
> - $emit custom events to parent components
> - Use class binding to conditionally add CSS to an HTML element
> - Define computed properties on a component

## Use the CLI to create a project

`cd` into the directory you'd like to add your new project and run

```sh
vue create todo
```

This will take you through the Vue CLI project setup. Answer the questions with the following responses

|           prompt           |          answer           |
| :------------------------: | :-----------------------: |
|           Preset           | Manually select features  |
|      Features needed       |  Babel, Linter/Formatter  |
|       Linter config        |     ESLint + Prettier     |
|    Additional lint feat    |       Lint on save        |
| Config location preference | In dedicated config files |
|       Save as preset       |             N             |

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

We want this component to hold the list of all the todo items. Update the script section to import the array of items from `data.js` and store a copy of it in the component's `data`

```vue
<script>
import { todoItems } from "../data";

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

**NOTE**: When we imported the `TodoList` component in the script section we use **PascalCasing**, however when when use the component in our template we use **kebab-casing**. If you prefer your components to use PascalCasing in your templates (as you would in React), Vue also allows that. You could just as easily have written the statement above like this

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
import { todoItems } from "../data";
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

## Passing props to child components

The `TodoList` component needs to tell each `TodoItem` component about the data it should render. This is possible through the use of props. These are used just like HTML attributes in our template. Here's how we can modify our `v-for` loop to pass a todo item to the `ToDoItem` component

```html
<div v-for="item in todos" :key="item.id">
  <todo-item :todo="item" />
</div>
```

This is just like setting any other HTML attribute. Remember though that when we want to bind an attribute to an object or JavaScript expression we need to prefix it with a colon `:`

## Accepting props in a child component

Now we need to make it so the `TodoItem` component knows to expect an object to be passed to it by the name of `todo`. In the `TodoItem` component, update the script to the following

```vue
<script>
export default {
  props: ["todo"],
};
</script>
```

> Note: We won't be prop-typing in this course however it's not uncommon to specify the type of each prop. If you'd like to look at the syntax for doing this, you can see it [here in the docs](https://vuejs.org/v2/guide/components-props.html#Prop-Types)

And here is how we can use the value of the `todo` prop that gets passed in. Update the `TodoItem` template to the following

```html
<template>
  <div>
    <h2>{{ todo.name }}</h2>
  </div>
</template>
```

Our props are bound to the component, so we can use them in the same way we use anything in our `data` object.

## Scoped styling

We should add a little bit of styling so we can clearly see each todo item. Inside the `TodoItem` style tag add a border and some margin to the surrounding `<div>` element

```vue
<style>
div {
  border: 3px solid tomato;
  margin: 15px;
  padding: 10px;
}
</style>
```

Whoa! That looks a little crazy... We can see that our styling is affecting every `<div>` element on the page. You might be saying to yourself that we should add a class to the element and target that in our CSS, and you'd have a very valid point; but this is also an opportunity to look at Vue's _scoped_ styling.

Update your `<style>` tag to include a `scoped` attribute and watch the difference

```html
<style scoped>
```

Now all the CSS we put in this file only affects this component.

## Emitting events

Let's add a button on each item for the user to mark a todo as completed.

```html
<template>
  <div>
    <h2>{{ todo.name }}</h2>
    <button>Mark Completed</button>
  </div>
</template>
```

When the user clicks the button we want to have the `TodoItem` component alert to the `TodoList` component so that it can update the list. When child components want to alert parent components that an event has taken place, the child component can _emit_ that event.

Update the `TodoItem` component to include a method named
`handleClick`. This method will emit an event to let the parent know that a todo item should be updated.

```vue
<script>
export default {
  props: ["todo"],

  methods: {
    handleClick() {
      this.$emit("status-change", this.todo);
    },
  },
};
</script>
```

Now update the template to call `handleClick` when the button is clicked.

```html
<template>
  <div>
    <h2>{{ todo.name }}</h2>
    <button @click="handleClick">Mark Completed</button>
  </div>
</template>
```

When `handleClick` gets called, it will create a custom event called `status-change`. The parent component can now listen to for this event in the same way it would listen for a click or onChange event.

Update the `TodoList` template to listen for the new status change event.

```html
<todo-item :todo="item" @status-change="handleStatusChange" />
```

Now we need to define our `handleStatusChange` method and decide what should happen when this event is received. Update the component to include the following

```js
methods: {
  handleStatusChange(item) {
    item.complete = !item.complete;
    console.log(item);
  },
}
```

If you open your console and click the buttons we can see that the todo object is getting updated on each click

## Class binding

Currently there's no visual representation of an item's completion status, so let's update `TodoItem` so that the todo name has a ~~line through~~ when it's completed.

Start by defining a CSS class in the style that will add that effect.

```css
.completed {
  text-decoration: line-through;
}
```

What we want now is to conditionally add this CSS class to the `<h2>` element if the item is complete. We can do that with Vue's class binding

```html
<h2 :class="{ completed: todo.complete }">{{ todo.name }}</h2>
```

The syntax here involves passing in an object to the `class` attribute. If the value of a property is `true`, the property name will get added as a class to the element. In the case above for example, if `todo.complete` evaluates to `true` then `completed` will be added as a class to the `h2`. Try clicking the buttons and watch the `completed` class get added a removed from the header as the complete status changes.

## Computed properties

Let's add a subheader above the list of items that will keep count of how many items are remaining. It should start off by saying

`There are 3 items left to do today`

and it should update every time an item gets changed.

Because we can put full JavaScript expressions in our template, we technically could do something like this

(Don't actually add this...)

```html
<h5>
  There are {{ todos.filter((t) => !t.complete).length }} items left to do today
</h5>
```

But our goal should always be to keep logic **out** of the template. The beauty of Vue is separation of concerns, and logic like this belongs in our `<script>`. We _could_ make a method that implements that logic and call that from the template, but the better option is to use something called **computed properties**

Update the `TodoList` component to add a section for `computed`

```js
export default {
  components: { TodoItem },
  data() {
    return {
      todos: [...todoItems],
    };
  },
  methods: {
    handleStatusChange(item) {
      item.complete = !item.complete;
      console.log(item);
    },
  },
  computed: {},
};
```

We can start to define our computed properties inside this object. Let's add one called `itemsRemaining`

```js
computed: {
  itemsRemaining() {
    return this.todos.filter((t) => !t.complete);
  },
},
```

Even though we define it here as a function, we don't have to invoke it in our template. We simply use `itemsRemaining` as a property

```html
<h5>There are {{ itemsRemaining.length }} items left to do today</h5>
```

The incredible part about these computed properties is that Vue will automatically recognize the dependencies of each computed property (in this case it's our `todos` array), and it will know to only re-evaluate the computed property again when any of the dependencies change.

Finally let's add a computed property on our `TodoItem` component so that the on the button switches between "Mark Completed" and "Mark Incomplete" depending on the state of the item.

Add the following code in `TodoItem.vue` below the `methods`

```js
computed: {
  buttonText() {
    return this.todo.complete ? "Mark Incomplete" : "Mark Complete";
  },
}
```

Now use the computed property in the template

```html
<button @click="handleClick">{{ buttonText }}</button>
```

# What's next?

You're now free to work on any Level 1 projects from the [Project Vault](../project-vault/README.md)
