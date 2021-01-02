![Vue Logo](../images/banner.jpg)

[![](https://img.shields.io/badge/router-query_params-orange?logo=vue.js)](https://router.vuejs.org/guide/#html)
[![](https://img.shields.io/badge/component-lifecycle_methods-green?logo=vue.js)](https://v3.vuejs.org/api/options-lifecycle-hooks.html#beforecreate)
[![](https://img.shields.io/badge/component-computed_properties-green?logo=vue.js)](https://vuejs.org/v2/guide/computed.html)

# Using query string parameters

In this chapter we're going to build a search feature in our meme application. We'll store the search term in the URL as query params to make bookmarking and page refreshing possible.

> **Learning Objectives**: By the end of this chapter you should be able to
>
> - Use the Vue router to set a query parameter in your app's URL
> - Read query string values from the URL when components load

## Adding a search field to the feed

Let's add a text field at the top of the feed that allows users to filter memes by their text. Add an `input` tag in the template and bind it with `v-model` to a property named `inputVal`

```html
<form>
  <input type="text" v-model="inputVal" placeholder="Search" />
</form>
```

Add 2 properties in the component's `data` named `inputVal` and `searchTerm`

```js
data() {
  return {
    memes: [],
    inputVal: "",
    searchTerm: ""
  };
},
```

The reason we're defining 2 properties here instead of 1 is because while `inputVal` will change with every keystroke, we only want to update `searchTerm` when the user submits the form/clicks Enter. When the form submits we'll update `searchTerm` with the current value of `inputVal`. Create a method in the component which will do that for us. Name it `addSearch`

```js
methods: {
  addSearch() {
    this.searchTerm = this.inputVal;
  }
},
```

Bind this method to the submit event of the form

```html
<form @submit.prevent="addSearch">
  <input type="text" v-model="inputVal" placeholder="Search" />
</form>
```

## Displaying the filtered memes

We'll define a computed property named `displayedMemes` which will decide which memes should appear on the page. If there isn't a search term, we'll just display every object in `memes`. If there is a search term we'll run a filter on the `normalized` property for memes matching the search.

```js
computed: {
  displayedMemes() {
    if (!this.searchTerm) return this.memes;

    const normalizedSearchTerm = this.searchTerm.toUpperCase();
    return this.memes.filter(m => {
      return m.normalized.includes(normalizedSearchTerm);
    });
  }
},
```

Now instead of iterating over `memes` in our `v-for` we can change the template to iterate over `displayedMemes`

```
<div v-for="meme in displayedMemes" :key="meme.id" class="py-5">
```

Typing in the search box and hitting Enter should now filter the items in the feed

## Making it safe to refresh

Search is working on the feed but there's a slight UX problem--if we refresh the page; or go to the Details page and hit the back button in our browser we lose the state of our search. We also can't bookmark the page with our search results.

We can solve this by adding a query string to the URL. That way if a user went straight to this route

```
/feed?q=vuex
```

they'd immediately be on the feed page and filtering by the term "vuex"

Let's first see how we can set this query param in the URL. Update the `addSearch` method to the following

```js
addSearch() {
  this.searchTerm = this.inputVal;
  this.$router.push({
    path: "/feed",
    query: { q: this.searchTerm }
  });
}
```

We're using the `$router.push` method again but a little differently than before. We're passing it an object with a `path` as well as a `query` property. Every key/value pair in the `query` object will result in a query string in the URL

Run the search again in the app and watch the URL change every time you hit Enter.

## Using the query params

The next part of the plan involves reading the query param when the component first loads and defaulting the `searchTerm` and `inputVal` to whatever is in the URL. We can read the query params similar to how we read route params.

```js
// get the value for the `q` query param
$route.query.q;
```

Update the `mounted` method to first check the value of the query param and default `searchTerm` and `inputVal` to it.

```js
mounted() {
  this.inputVal = this.$route.query.q;
  this.searchTerm = this.$route.query.q;

  db.collection("memes").onSnapshot(snap => {
    const memes = snap.docs.map(doc => {
      return {
        ...doc.data(),
        id: doc.id
      };
    });
    this.memes = memes;
  });
},
```

You're now free to refresh the page and your search is in tact

## Styling the input

If you like, give the template a little Vuetify love

```html
<template>
  <v-container>
    <v-row justify="center" class="mt-5">
      <v-col :sm="12" :md="6">
        <form @submit.prevent="addSearch">
          <v-text-field
            prepend-inner-icon="mdi-magnify"
            color="teal darken-2"
            rounded
            outlined
            v-model="inputVal"
            label="Search"
          />
        </form>
      </v-col>
    </v-row>
    <div v-for="meme in displayedMemes" :key="meme.id" class="py-5">
      <router-link :to="`/meme/${meme.id}`">
        <meme
          class="mx-auto"
          :top="meme.topText"
          :bottom="meme.bottomText"
          :imageURL="meme.imageURL"
        />
      </router-link>
    </div>
  </v-container>
</template>
```
