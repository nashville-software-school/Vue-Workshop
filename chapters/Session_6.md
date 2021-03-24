![Vue Logo](../images/banner.jpg)

> **NOTE**: This chapter has prerequisites
>
> - [What is Firestore](https://www.youtube.com/watch?v=v_hR4K4auoQ)
> - [Getting started with Firestore](https://us02web.zoom.us/rec/play/XP0ieGjaMcy7W7r1go2uNTQYBqnAFp_o4d3MehvdVkpo3hFG7A30eHTpwm4sdGLuWba0AP6BaQrEE6mQ.qcWmOjYQliQN0Zas)

[![](https://img.shields.io/badge/router-defining_routes-orange?logo=vue.js)](https://router.vuejs.org/guide/#html)
[![](https://img.shields.io/badge/router-dynamic_routes-orange?logo=vue.js)](https://router.vuejs.org/guide/essentials/dynamic-matching.html)
[![](https://img.shields.io/badge/router-programmatic_navigation-orange?logo=vue.js)](https://router.vuejs.org/guide/essentials/navigation.html)
[![](https://img.shields.io/badge/component-lifecycle_methods-green?logo=vue.js)](https://v3.vuejs.org/api/options-lifecycle-hooks.html#beforecreate)

# Using the Vue Router to create Single Page Apps

In this chapter we're going to use the Vue Router to create an SPA with multiple views. The application we'll be building is a public feed for developers to share memes about Vue. It will have 4 views

- A "Welcome" page
- A "Create a Meme" page
- A public feed of all shared memes
- A "Details" page which just shows a single meme

A demo of this application can been seen [here](https://nss-vue-meme-forum.web.app/)

> **Learning Objectives**: By the end of this chapter you should be able to
>
> - Define multiple routes in an application
> - Use the `router-view` and `router-link` components to allow users to navigate an app with multiple routes
> - Use the `$router.push` method to programmatically navigate users from your JS code
> - Access route parameters in your component

## Project setup

1. `cd` into the directory you'd like to add your new project and run

```sh
vue create meme-forum
```

|           prompt           |             answer              |
| :------------------------: | :-----------------------------: |
|           Preset           |    Manually select features     |
|      Features needed       | Babel, Router, Linter/Formatter |
|        History mode        |                Y                |
|       Linter config        |        ESLint + Prettier        |
|    Additional lint feat    |          Lint on save           |
| Config location preference |    In dedicated config files    |
|       Save as preset       |                N                |

2. Add the Vuetify library and choose the `Default` preset

```sh
vue add vuetify
```

3. Remove the boilerplate code in `App.vue`

## Firebase/Firestore Setup

We're going to use Firebase's Firestore database to persist our user's shared memes.

1. On the [Firebase website](https://console.firebase.google.com/u/0/) create a new project and give our Vue meme app a name.
1. Once the project is created, click the "Cloud Firestore" link in the left sidebar. Next click the button that says "Create database" and select the option for "Test Mode" when prompted
1. Toward the top of the left sidebar click the "Project Overview" link. On the Project Overview page, click the "+ Add app" button toward the top. It will ask you what kind of app you're building. Click the "Web" button. Finally give your app a nickname (something like "Meme App") and click the "Register app" button and leave the generated javascript code on the page--we'll need it for the next step.
1. In your Vue application, add a `.env.local` file at the root of your project and add in the following key value pairs. Replace the values with the ones from the firebase website
   ```
   VUE_APP_API_KEY=your_firebase_apiKey
   VUE_APP_AUTH_DOMAIN=your_firebase_authDomain
   VUE_APP_PROJECT_ID=your_firebase_projectId
   VUE_APP_APP_ID=your_firebase_appId
   ```
1. Install the firebase package to your Vue app by running `npm install firebase`
1. Add a `firebase.js` file in your `src` directory and add the following code

```js
import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT_ID,
  appId: process.env.VUE_APP_APP_ID,
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
```

Now you're ready to go with the firestore. This `firebase.js` file exports a `db` object which will represent our database.

## Defining our routes

Because we told the Vue CLI that we wanted routing in our application, it created a couple new directories we haven't seen before--`views` and `router`. The files in the `views` folder are components. There's nothing special about them other than these are meant to be the top level components for each page. The components we put in the `components` directory are meant to be more reusable components that may be used in multiple pages.

The Vue CLI created us a Home page and an About page. We want some kind of "Welcome" page in our app so let's keep `Home.vue` for now, but we can delete the `About.vue` file. Stub out 3 new files here for our other routes. Name them `Create.vue`, `Details.vue`, and `Feed.vue`, and give them all a simple header tag in their templates

> Create.vue

```vue
<template>
  <h1>This is the Create page</h1>
</template>

<script>
export default {};
</script>

<style></style>
```

Remove all the code inside the `Home` component as well and give it the same sort of empty template.

Now it's just a matter of attaching these components to specific routes. We can say that we'd like our routes to look like this

- `/create` should show the `Create` component
- `/feed` should show the `Feed` component
- `/meme/{some-meme-id}` should show the `Details` component
- `/` should show the `Home` component

We define these routes in the `index.js` method inside the `router` folder. Add the following objects to the `routes` array (and don't forget to import the necessary components at the top of the file)

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
];
```

The `:memeId` part of the Details path is our route parameter. This is a dynamic route so whether the URL looks like `/details/abc` or `/details/xyz`, the user will be presented the Details page.

We've got one last step before we can start navigating the different pages in our app. We have to decide where in our app we want these different page components to go.

## Specify where our route components should go with `<router-view>`

Go into `App.vue` and empty out everything in the `<app-bar>` component and remove the `<HelloWorld>` component from the template. While you're at it, since this is an app for Vue specific memes, let's change the app bar color to either dark green or teal. Your `App` component should now look like this

```vue
<template>
  <v-app>
    <v-app-bar app color="teal darken-2" dark> </v-app-bar>

    <v-main> </v-main>
  </v-app>
</template>

<script>
export default {};
</script>
```

We want to keep the app header bar on every page, but we want what's inside that `<v-main>` tag to be the content that changes depending out the route. We can use the `<router-view>` component to do exactly that.

```html
<v-main>
  <router-view></router-view>
</v-main>
```

Now run the application and try changing the URL to each of the routes we specified.

## Adding links with `<router-link>`

Let's add some links to our top navbar. Instead of using `<a>` tags for our links, we use a `<router-link>` component. Add a `h1` and these two links to the navbar. Warning: the color is a bit harsh! We'll style this in a bit...

```html
<v-app-bar app color="teal darken-2" dark>
  <h1>Vue Meme Forum</h1>
  <v-spacer></v-spacer>
  <router-link to="/create"> Create </router-link>
  |
  <router-link to="/feed"> Memes </router-link>
</v-app-bar>
```

So why use this `<router-link>` component instead of a normal anchor tag? For one, it's going to make navigating to dynamic routes simpler, and second, a nice benefit we get from the component is that it will automatically add a class onto any links that match the current route. That way we can style them to show that they're active. Try adding this CSS to your `App` component and click the nav links

```vue
<style scoped>
a {
  text-decoration: none;
}
.router-link-active {
  color: rgb(255, 200, 100);
}
</style>
```

Pretty cool, but it's still pretty hard to look at. Let's make it a bit nicer by adding some Vuetify buttons.

```html
<router-link to="/create">
  <v-btn text> Create </v-btn>
</router-link>
|
<router-link to="/feed">
  <v-btn text> Memes </v-btn>
</router-link>
```

If you want to keep the same styling on the active buttons, change the CSS selector to include the `v-btn` class

```css
.router-link-active .v-btn {
  color: rgb(255, 200, 100);
}
```

## A quick aside about Lifecycle methods

As the user navigates around the application, Vue is handling our page components mounting and un-mounting. This feels like a opportunity to do another look at some of the component lifecycle methods--specifically the `mounted` and `beforeDestroy` methods. Add some logging inside the `Create` and `Feed` components that will write to the console when these events happen

> Create.vue

```js
export default {
  mounted() {
    console.log("Create component mounted");
  },
  beforeDestroy() {
    console.log("Create component about to be destroyed");
  },
};
```

Run the app and click back and forth between the two routes to see how the `mounted` method gets fired when the component first gets rendered and the `beforeDestroy` method is called right before the next component mounts.

Before continuing you're welcome to leave these logging statements in or take them out.

## Building a form for the Create page

When a user wants to create a meme we'll need to capture an image URL, the top text, and the bottom text. In the `Create` component we'll add 3 text inputs to the template and add 3 properties inside `data` to hook up to the input fields.

```vue
<template>
  <div>
    <form>
      <input type="text" v-model="imageURL" />
      <input type="text" v-model="topText" />
      <input type="text" v-model="bottomText" />
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageURL: "",
      topText: "",
      bottomText: "",
    };
  },
};
</script>
```

Now create a button to submit the form. Eventually this will be what generates the meme. For now we'll just log to the console.

```vue
<template>
  <div>
    <form @submit.prevent="generateMeme">
      <input placeholder="Image URL" type="text" v-model="imageURL" />
      <input placeholder="Top Text" type="text" v-model="topText" />
      <input placeholder="Bottom Text" type="text" v-model="bottomText" />
      <button type="submit">Generate Meme!</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageURL: "",
      topText: "",
      bottomText: "",
    };
  },
  methods: {
    generateMeme() {
      console.log("building a meme....");
    },
  },
};
</script>
```

Before we get to showing the generated meme we should build a component for it.

## Making a Meme component

Our Meme component will be used in multiple places in our app so we'll add it to the `components` directory. Have it specify that it should accept props for `top` `bottom` and `imageURL`

```vue
<template></template>

<script>
export default {
  props: ["top", "bottom", "imageURL"],
};
</script>

<style></style>
```

Update the template to use a Vuetify `<v-image>` tag with 2 header tags nested inside it.

```html
<template>
  <v-img :src="imageURL" :width="800">
    <h1 id="top">{{ top.toUpperCase() }}</h1>
    <h1 id="bottom">{{ bottom.toUpperCase() }}</h1>
  </v-img>
</template>
```

Back in the `Create` component let's use our new `Meme` component. Import it in the `<script>` section and add it to the template below the form. Don't forget to include the necessary props

```html
<meme :top="topText" :bottom="bottomText" :imageURL="imageURL"></meme>
```

Try running the app.

This is a good start but we don't want to show the meme until the user hits the "Generate Meme!" button. We can solve this by adding a boolean to our component called `showMeme` which is `false` by default and flipped to `true` when the `generateMeme` method gets called.

```vue
<script>
import Meme from "../components/Meme.vue";

export default {
  components: { Meme },
  data() {
    return {
      imageURL: "",
      topText: "",
      bottomText: "",
      showMeme: false,
    };
  },
  methods: {
    generateMeme() {
      this.showMeme = true;
    },
  },
};
</script>
```

Now add a `div` with a `v-if` directive around the Meme tag in the template

```html
<div v-if="showMeme">
  <meme :top="topText" :bottom="bottomText" :imageURL="imageURL" />
</div>
```

## Adding styles

A meme isn't a meme without impact font. We'll have to add the proper styling to our `Meme` component so it may live up to its namesake. Add the following styling to `Meme.vue`. Don't forget the `scoped` attribute, otherwise your header will start to yell at you

```vue
<style scoped>
h1 {
  color: white;
  text-align: center;
  font-size: 3rem;
  font-family: impact, sans-serif;
  font-weight: bold;
  text-shadow: 0 0 10px black;
  width: 100%;
  position: absolute;
  text-align: center;
}

#bottom {
  bottom: 20px;
}

#top {
  top: 20px;
}
</style>
```

Let's show some love to our Create form and add some Vuetify styling to it. Update the template to the following

```html
<template>
  <v-container>
    <v-form @submit.prevent="generateMeme">
      <v-row justify="space-between">
        <v-col>
          <v-text-field
            outlined
            v-model="imageURL"
            type="text"
            label="Image URL"
          />
        </v-col>
        <v-col>
          <v-text-field
            outlined
            v-model="topText"
            type="text"
            label="Top Text"
          />
        </v-col>
        <v-col>
          <v-text-field
            outlined
            v-model="bottomText"
            type="text"
            label="Bottom Text"
          />
        </v-col>
      </v-row>
      <v-row v-if="!showMeme" justify="center">
        <v-btn :disabled="!imageURL" text color="primary" type="submit">
          Generate meme!
        </v-btn>
      </v-row>
    </v-form>

    <div v-if="showMeme">
      <meme
        class="mx-auto"
        :top="topText"
        :bottom="bottomText"
        :imageURL="imageURL"
        :width="800"
      />
    </div>
  </v-container>
</template>
```

## Saving a meme to the database

We can create a button below the generated meme to allow users to share it on the public feed. To do this we'll save all the information about the meme to the firestore database. Start by importing the `db` object into `Create.vue`

```js
import { db } from "../firebase";
```

Add a new method called `saveMeme` in the components methods. This will add it to a collection called "memes" back in the firestore database.

```js
methods: {
  generateMeme() {
    this.showMeme = true;
  },
  async saveMeme() {
    await db.collection("memes").add({
      topText: this.topText,
      bottomText: this.bottomText,
      imageURL: this.imageURL,
      normalized: `${this.topText.toUpperCase()} ${this.bottomText.toUpperCase()}`
    });
  }
}
```

Note that we're also including a property called `normalized` which concats the top and bottom texts. This will be helpful if we want to implement a search feature later.

Now add a button in the template just below the generated meme and bind the `saveMeme` method to its click event

```html
<div v-if="showMeme">
  <meme
    class="mx-auto"
    :top="topText"
    :bottom="bottomText"
    :imageURL="imageURL"
    :width="800"
  />
  <div class="text-center mt-3">
    <v-btn type="button" @click="saveMeme" color="primary">
      Save this meme
    </v-btn>
  </div>
</div>
```

Clicking the button should now persist the meme data in our firestore database although nothing happens in our UI. Let's fix that by navigating away after the save is complete.

## Programmatic navigation with `$router.push`

Let's take the user to the feed after they save a meme. We can easily do that with the `$router.push` method which takes a path as a parameter. Update the `saveMeme` method to call it

```js
async saveMeme() {
  await db.collection("memes").add({
    topText: this.topText,
    bottomText: this.bottomText,
    imageURL: this.imageURL,
    normalized: `${this.topText.toUpperCase()} ${this.bottomText.toUpperCase()}`
  });

  this.$router.push("/feed");
}
```

Next we'll start to build out the `Feed` component

## Loading data when the component mounts

As soon as a user comes to the `Feed` page, we want to grab all the memes from firestore. This is a great opportunity to use the `mounted` lifecycle method. In the `Feed` component, let's do the following things:

1. Add a `memes` property to `data` and give it an initial value of an empty array
1. Use the `mounted` lifecycle hook to get the memes from firebase and assign them to `this.memes`

```js
import { db } from "../firebase";
import Meme from "../components/Meme";

export default {
  components: { Meme },
  data() {
    return {
      memes: [],
    };
  },

  mounted() {
    db.collection("memes").onSnapshot((snap) => {
      const memes = snap.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });
      this.memes = memes;
    });
  },
};
```

Using the Vue devtools we can confirm that the memes from the database get loaded into the component's data when the page loads. Now we just have to iterate over each and render them in the template

```html
<template>
  <v-container>
    <div v-for="meme in memes" :key="meme.id" class="py-5">
      <meme
        class="mx-auto"
        :top="meme.topText"
        :bottom="meme.bottomText"
        :imageURL="meme.imageURL"
      />
    </div>
  </v-container>
</template>
```

## Navigating to the Details page

When a user clicks on one of the memes in the feed, they should be directed towards the Details page which has just that one meme on it. That way people can send links out to their friends that show off a particularly hilarious meme.

All memes have ID's which were generated by firebase. We'll use those ID's as our route params so that when a user navigates to `/meme/abcd` they'll see the meme with the ID `abcd`. To make each meme in the feed clickable, simply wrap it in the `<router-link>` component and dynamically add the meme's id in the path

```html
<router-link :to="`/meme/${meme.id}`">
  <meme
    class="mx-auto mt-6"
    :top="meme.topText"
    :bottom="meme.bottomText"
    :imageURL="meme.imageURL"
  />
</router-link>
```

Try running the app and clicking one of the memes. You should be taken to the details page and the ID of the clicked meme should be in your URL.

## Reading a route param from a component

To fill out the details page we once again need to check firebase as soon as the component mounts. We want to grab just the meme whose ID is in the URL. We can access that in our component via

```js
this.$route.params.memeId;
```

The `memeId` property on the `params` object is named according to what we specified back in the `router/index.js` file.

Update the `Details` component to grab the meme object when the component mounts

```js
import { db } from "../firebase";

export default {
  data() {
    return {
      meme: null,
    };
  },

  async mounted() {
    const memeId = this.$route.params.memeId;
    const snapshot = await db.collection("memes").doc(memeId).get();
    this.meme = snapshot.data();
  },
};
```

Now that the component has access to the meme object, we can use it in the template. (Remember to import the Meme component)

```html
<template>
  <div v-if="meme">
    <meme
      class="mx-auto"
      :top="meme.topText"
      :bottom="meme.bottomText"
      :imageURL="meme.imageURL"
    />
  </div>
</template>
```

## Wrapping up

You're all set with an awesome meme generator app! We didn't add anything to the homepage so feel free to add a nice welcome message there (maybe in an Impact font) and a good image

# Deployment

[Deploy to firebase](./Firebase_Deployment.md)

# What's next?

You're now free to work on any project from the [Project Vault](../project-vault/README.md)
