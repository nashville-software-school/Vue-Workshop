![Vue Logo](../images/banner.jpg)

[![](https://img.shields.io/badge/component-mixins-green?logo=vue.js)](https://vuejs.org/v2/guide/mixins.html)

# DRY up code with Mixins

In this chapter we're going to look at Vue mixins as a way to create reusable parts of components

> **Learning Objectives**: By the end of this chapter you should be able to
>
> - Know when to use a mixin for your components
> - Know how to define and use a mixin

At some point you're likely to end up with lots of components with duplicate computed properties or methods. This can come up a lot with things like formatting dates or currency, concatenating names, etc. Vue offers a **mixin** feature which allows us to define any part of a component (data, computed properties, methods, lifecycle hooks) in one place and then easily add it in wherever we need it.

Back in our Movie Vuer application we had two components that displayed dates--the Movie Details and the Reviews. It'd be nice if we took the time to format them into something more readable, and if we defined a `formatDate` method in our components we're destined to repeat the same code in both places. We'll instead create a mixin that both components can use

## Defining our mixin

In the Movie Vuer project create a `mixins` folder inside the `src` directory. Inside `mixins` add a file named `movieMixins.js`. Inside we'll define a reusable method for formatting dates using the JavaScript `Intl.DateTimeFormat` class

```js
export const dateMixin = {
  methods: {
    formatDate(dateString) {
      const d = new Date(dateString);
      const formatOptions = { day: "numeric", year: "numeric", month: "long" };
      return new Intl.DateTimeFormat("en-US", formatOptions).format(d);
    },
  },
};
```

Nothing Vue specific here--we're just defining a JavaScript object with a `methods` property on it.

## Using the mixin

Let's see how we can consume this from our Vue components. Start by going into `MovieDetails.vue`, importing the `dateMixin` object, and declare it as a mixin

```js
import { mapState } from "vuex";
import { dateMixin } from "../mixins/movieMixins";

export default {
  mixins: [dateMixin],
  computed: {
    ...mapState(["movieDetails"]),
  },
};
```

That's it! Now you've got access to the `formatDate` method just as if it had been declared in the component and we can use it in our template

```html
<div class="mt-2">
  <v-icon>mdi-calendar</v-icon>
  Released {{ formatDate(movieDetails.release_date) }}
</div>
```

Now try importing the mixin into the `MovieReviews` component and using it there too.
