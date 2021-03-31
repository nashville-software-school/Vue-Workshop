![Vue Logo](../images/banner.jpg)

[![](https://img.shields.io/badge/router-navigation_guards-orange?logo=vue.js)](https://router.vuejs.org/guide/#html)
[![](https://img.shields.io/badge/router-query_params-orange?logo=vue.js)](https://router.vuejs.org/guide/#html)
[![](https://img.shields.io/badge/component-lifecycle_methods-green?logo=vue.js)](https://v3.vuejs.org/api/options-lifecycle-hooks.html#beforecreate)

# Authenticating users and blocking routes

In this chapter we're going to give users the ability to log in. We're also going to enforce the rule that only authenticated users can create memes. We're also going to create an additional route that will show only the current user's memes.

> **Learning Objectives**: By the end of this chapter you should be able to
>
> - Use firebase to create a simple authentication flow
> - Use the `beforeEnter` method in route definitions to prevent unauthorized users from entering certain routes

## Firebase setup

We need to tell firebase that we'd like it to handle authentication for us. On the firebase website click the "Authentication" link in the left sidebar. Then click the "Get started" button and click the toggle to enable Google authentication. Confirm your email address and click "Save"

We need to make some updates to the `firebase.js` file in your Vue app. Start by importing the `firebase/auth" package at the top of the file

```js
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
```

At the bottom of the file export methods for `signIn`, `signOut`, and `auth`. The `auth` object we get from firebase will be handy since it has a `currentUser` property on it as well as a method named `onAuthStateChanged` which lets us hook into when users log in and out

```js
export const auth = firebase.auth();
export const signOut = () => auth.signOut();
export const signIn = () => {
  return auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
};
```

Firebase will check for the current logged in user as soon as the page loads, but that operation is asynchronous. We want to make sure that the Vue app doesn't mount or render anything until firebase knows the state of the user. We can easily do that by updating `main.js` to the following

```js
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { auth } from "./firebase";

Vue.config.productionTip = false;

let userLoaded = false;

auth.onAuthStateChanged(() => {
  if (!userLoaded) {
    new Vue({
      router,
      vuetify,
      render: (h) => h(App),
    }).$mount("#app");

    userLoaded = true;
  }
});
```

## Signing users in

We want to add an item in the top navbar that either says "Sign in " or "Sign out" depending on the user state. Start by modifying `App.vue` so it has a sign in and sign out method.

```js
import { signIn, signOut } from "./firebase";

export default {
  methods: {
    signIn() {
      return signIn();
    },
    signOut() {
      signOut();

      if (this.$route.path != "/") {
        this.$router.push("/");
      }
    },
  },
};
```

Attach these methods to two new buttons in the navbar. We'll get around to only showing one at a time but for now add both the Sign In and Sign Out buttons to the template

```html
<v-app-bar app color="teal darken-2" dark>
  <h1>Vue Meme Forum</h1>
  <v-spacer></v-spacer>
  <router-link to="/create">
    <v-btn text> Create </v-btn>
  </router-link>
  |
  <router-link to="/feed">
    <v-btn text> Memes </v-btn>
  </router-link>
  |
  <v-btn text @click="signIn"> Sign In </v-btn>
  <v-btn text @click="signOut"> Sign Out </v-btn>
</v-app-bar>
```

Although our firebase library is keeping track of the current logged in user, our Vue app isn't. We can fix that by simply saving the current user in the `App` component's `data`. We'll also ask firebase to let us know when the state of the user changes. Update the `App` component to include a `user` property in its `data`. Also include a `mounted` hook so that `user` is updated every time firebase hears a login or logout event

```js
import { auth, signIn, signOut } from "./firebase";

export default {
  data() {
    return {
      user: auth.currentUser,
    };
  },
  mounted() {
    auth.onAuthStateChanged((user) => {
      this.user = user;
    });
  },
  methods: {
    signIn() {
      return signIn();
    },
    signOut() {
      signOut();

      if (this.$route.path != "/") {
        this.$router.push("/");
      }
    },
  },
};
```

We can now use the `user` property in our template to conditionally show the correct button

```html
<v-btn v-if="user" text @click="signOut">Sign Out </v-btn>
<v-btn v-else text @click="signIn"> Sign In </v-btn>
```

You should now be able to sign in and out of the app!

## Including a user ID when creating a meme

When a user creates a meme in the app we should save the user's ID. This is a simple update to our `Create` component. Include a `userId` property in the object that gets saved to the database. Don't forget to import the `auth` object at the top of the script

```js
import { db, auth } from "../firebase";
```

```js
async saveMeme() {
  await db.collection("memes").add({
    topText: this.topText,
    bottomText: this.bottomText,
    imageURL: this.imageURL,
    normalized: `${this.topText.toUpperCase()} ${this.bottomText.toUpperCase()}`,
    userId: auth.currentUser.uid
  });

  this.$router.push("/feed");
}
```

## Adding a "My Memes" route

We'll add one last route to our app which will show just the list of memes created by the current user. Let's start by setting up a bare bones component and getting it hooked up to the router. Create a new file in the `views` directory named `MyMemes.vue`

```vue
<template>
  <h1 class="teal--text text-center">My Memes</h1>
</template>

<script>
export default {};
</script>

<style></style>
```

Now register this component with the router. Update `router/index.js` to import the `MyMemes` component and add the following object to the `routes` array.

```js
import MyMemes from "../views/MyMemes";
```

```js
{
  path: "/my-memes",
  name: "MyMemes",
  component: MyMemes
}
```

If you run the app and hit the `/my-memes` route directly from your URL bar you should need the new component.

Update `MyMemes` so that when it mounts it will fetch data from firestore and grab just the memes where the `userId` field matches the current logged in user's.

```js
import { db, auth } from "../firebase";

export default {
  data() {
    return {
      memes: [],
    };
  },
  async mounted() {
    const currentUserId = auth.currentUser.uid;
    const snapshot = await db
      .collection("memes")
      .where("userId", "==", currentUserId)
      .get();

    this.memes = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
  },
};
```

This code should look familiar with the exception of the `where` method. The filtering syntax for firestore is a bit odd but the way that it works is you give it 3 params. The first is the document field you want to filter on (in our case it's the meme's `userId` field). The second is the comparison operator (e.g "==", "!=", "<", ">"). And finally the value that you want to check against.

Now that we're filtering for memes belonging only to the current user, we can iterate over them in the template. Let's also display a message if a user doesn't have any memes and add a link to the `Create` view.

```html
<template>
  <v-container>
    <h1 class="teal--text text-center">My Memes</h1>

    <div v-if="memes.length">
      <div v-for="meme in memes" :key="meme.id" class="my-5">
        <meme
          class="mx-auto"
          :top="meme.topText"
          :bottom="meme.bottomText"
          :imageURL="meme.imageURL"
        />
      </div>
    </div>
    <div v-else class="text-center mx-auto mt-5">
      <h3>You don't currently have any memes</h3>
      <v-btn to="/create" color="teal" dark> Create Memes </v-btn>
    </div>
  </v-container>
</template>
```

Lets also add a link to the navbar to take us to this page. The link should only be visible if there is a logged in user. Add the following button as the first link in the navbar inside `App.vue` (and don't forget the vertical pipe)

```html
<router-link v-if="user" to="/my-memes">
  <v-btn text> My Memes </v-btn>
</router-link>
<span v-if="user">|</span>
```

## Blocking routes

If your `v-if` statements are set up correctly, users should not see any links on the navbar that would take them to pages they shouldn't go to. But there's currently nothing in place to prevent someone from directly accessing `/my-memes` or `/create` if they weren't logged in.

What we need is a way to check a user's auth status before they access those routes. We can do this in our route definitions using the `beforeEnter` method. Inside `router/index.js` update the two protected routes to check if the user is logged it

```js
import { auth } from "../firebase";
```

```js
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/create",
    name: "Create",
    component: Create,
    beforeEnter: (to, from, next) => {
      if (!auth.currentUser) {
        return next("/");
      } else {
        return next();
      }
    },
  },
  {
    path: "/meme/:memeId",
    name: "Details",
    component: Details,
  },
  {
    path: "/feed",
    name: "Feed",
    component: Feed,
  },
  {
    path: "/my-memes",
    name: "MyMemes",
    component: MyMemes,
    beforeEnter: (to, from, next) => {
      if (!auth.currentUser) {
        return next("/");
      } else {
        return next();
      }
    },
  },
];
```

The `beforeEnter` method gives us a hook into the event right before Vue is about to load the next route component. It takes 3 params:

- `to` is the target route the user is trying to access
- `from` is the route they are coming from
- `next` is a resolve function. If `next` is called with no params, then the navigation works as expected. If `next` is called with a param of `false` the navigation will be prevented and the user will stay on the same route. `next` can also be called with a string or object to specify a redirect. In this example we're redirecting the user to the home page if they are not logged in.

> **NOTE**: Although this code works fine for our small application, it isn't exactly DRY--we're repeating the logic inside both `beforeEnter` methods. For a look at a nicer way to solve this check out [Route Meta Fields](https://router.vuejs.org/guide/advanced/meta.html)

> **NOTE**: The Vue router gives us hooks into other navigation events. One that also comes in handy often is `beforeRouteLeave`. This is a good opportunity to do things like alert a user they have unsaved changes before navigating away. To read more about these hooks [check out the docs](https://router.vuejs.org/guide/advanced/navigation-guards.html#in-component-guards)

## Creating a better UX with redirects

We've successfully guarded our authenticated routes and are sending users back to the homepage if they are unauthorized, however they're being sent there without any context as to why the aren't on the page they intended. To them, the app might just appear broken. There are a bunch of ways you could handle this. For this app, let's continue to redirect them to the Home page, but let's add an alert at the top with a message telling them they should log in first. Here's the strategy

1. If the `beforeEnter` method sends a user back to the `/` route, it will also include a query param in the URL. The URL it will actually send them to is `/?unauthorized=true`
1. The `Home` component will be updated to check for the existence of a query param. If it finds an `unauthorized=true` param, it will show an alert at the top of the page

Update each of the `beforeEnter` methods in `router/index.js` to include a query param in the redirect

```js
beforeEnter: (to, from, next) => {
  if (!auth.currentUser) {
    return next({
      path: "/",
      query: { unauthorized: true },
    });
  } else {
    return next();
  }
};
```

Try running the app and hitting some guarded routes while logged out. You should still be redirected to the `Home` page but there should now be a query param in the URL.

Go to `Home.vue` and update the component to check for the existence of the query param

```js
export default {
  data() {
    return {
      errorMessage: null,
    };
  },
  mounted() {
    const hasAuthErr = this.$route.query.unauthorized === "true";
    if (hasAuthErr) {
      this.errorMessage = "You must be logged in to do that";
    }
  },
};
```

Remember that all query param values are strings. That's why we have to run our equality check with `=== "true"`

Update the template to add a Vuetify alert tag if `errorMessage` exists.

```html
<template>
  <v-container>
    <div class="mx-auto mt-6">
      <v-alert
        v-if="errorMessage"
        elevation="2"
        bor
        der="left"
        colored-border
        type="error"
      >
        <h5>{{ errorMessage }}</h5>
      </v-alert>
      <h1>WELCOME</h1>
      <img :src="require('@/assets/logo.png')" />
      <h1>VUE MEMES ONLY</h1>
    </div>
  </v-container>
</template>
```
