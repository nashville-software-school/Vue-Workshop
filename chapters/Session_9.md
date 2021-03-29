![Vue Logo](../images/banner.jpg)

[![](https://img.shields.io/badge/router-lazy_loading-orange?logo=vue.js)](https://router.vuejs.org/guide/advanced/lazy-loading.html#lazy-loading-routes)

# Lazy loading routes

In this chapter we're going to look at optimizing our application by splitting it into chunks

> **Leaning Objectives**: By the end of this chapter you should be able to
>
> - Understand what code splitting is and why it's useful
> - Know when it's appropriate to use code splitting
> - How to lazy load chunks of your application

## What happens when we run `npm run build`

When we've been deploying our projects, we've run the `npm run build` command as our first step. What is it doing?

When we create projects with the Vue CLI, it provides us with [webpack](https://survivejs.com/webpack/what-is-webpack/) tooling which will take all the code in our application, look at the entry point (in our case this is `main.js`), recursively examine all the import statements, and bundle all our code up into a single JS file and make that file as small as possible by doing things like removing all whitespace and renaming our variables to single letters. It then outputs this code in the `dist/` directory. This has pros and cons.

On the positive side, users only have to download a single JS file instead of a bunch of individual files when they come to our site. This means less network requests on their part and the app gets delivered to them faster.

On the negative side, visitors of our site will always download the entire application, regardless of whether or not they visit all the pages. And the bigger the bundle size, the longer it takes to get on the user's computer.

Consider a couple scenarios

### Scenario 1

Let's say we've built an app that has an extensive User Profile section where users can customize a ton about their experience on the site. On these customization pages, users can specify their preferred color theme on the site, font choices, update their profile images and bio, and change their password. All users have access to these pages however each user will infrequently visit any of these routes.

Regardless of whether or not a user visits these settings pages, they will always be downloading the single JS bundle every time they visit the site which contains the code of those pages.

### Scenario 2

Let's say we've built an app with 3 different types of users, and each user type is restricted to the routes they are able to visit.

- User Type 1 can visit routes A, B, and C
- User Type 2 can visit routes A, D, E, and F
- User Type 3 can visit routes A, G, and H

When _any_ user comes to the application, they will download the single bundled JS file. Regardless of what type of user it is, they will be downloading code that they theoretically can't even access.

## The fix

A solution to this is to split our code into meaningful chunks. We can decide what code needs to go into a "main" JS bundle that should be delivered immediately for all users, and then have users subsequently request additional JS chunks as they navigate throughout the app.

In scenario 1, we might say that all the routes except the customization/profile views belongs in the main bundle. When then create separate chunks for the customization and password routes.

In scenario 2, all users have access to route A (let's say this is maybe a homepage). Route A might go in the main bundle. User 1 waits until they navigate to route B or C before downloading the chunk containing the code for those routes. User 2 will never go to routes B or C and therefore never download that chunk.



If we were to consider our meme application and realize that most of our user base doesn't chose to authenticate--instead most users browse the feed--we can come to the conclusion that the `/my-meme` and `/create` routes should be in separate chunks.

## Code splitting with Vue

This non-trivial problem is made incredibly simple with Vue. We can split our code easily by routes when we define them. Update the `my-memes` and `create` routes inside `router/index.js` so that the `component` property is set equal to a function that calls `import`.

> Create route

```js
{
  path: "/create",
  name: "Create",
  component: () => import("../views/Create"),
  beforeEnter: (to, from, next) => {
    if (!auth.currentUser) {
      return next({
        path: "/",
        query: { unauthorized: true }
      });
    } else {
      return next();
    }
  }
}
```

> My Memes route

```js
{
  path: "/my-memes",
  name: "MyMemes",
  component: () => import("../views/MyMemes"),
  beforeEnter: (to, from, next) => {
    if (!auth.currentUser) {
      return next({
        path: "/",
        query: { unauthorized: true }
      });
    } else {
      return next();
    }
  }
}
```

Lastly, the critical piece is to _remove_ the `import` statements at the top of the file that would otherwise import the `Create` and `MyMemes` components. Since webpack only bundles what it finds while recursively examines our `import` statements, those components (along with all of _their_ dependencies) will no longer be in the main bundle.

Try running `npm run build` and you will see in your terminal as well as in the `dist/` directory that two additional chunks have been created. Now try running the application with your `Network` tab open and inspect the JS requests made. Your browser will request an initial `app.js` file. If you navigate to the `/create` or `/my-memes` routes you will see your browser make requests for additional JS files. This technique is called _lazy loading_. We're not loading resources until we need them. This is an alternative to _eager loading_ which is when we load resources immediately whether or not we'll actually need them.

Upon inspection, your numbers will likely be a bit different but here are the benchmarks I collected while examining the main bundle before and after code splitting.

### Benchmarks

|    Mode     | app.js w/o splitting | app.js w/ splitting | Reduction |
| :---------: | :------------------: | :-----------------: | :-------: |
| Development |        293kB         |        234kB        |    20%    |
| Production  |        11.4kb        |        9.5kB        |    17%    |

## Grouping chunks

In our above example, the `my-memes` and `create` routes each got their own chunks. But what if we wanted to bundle the two of them together so that our app only had 2 chunks? The syntax is a bit strange but we can do that by defining a name for this chunk in a comment. Since these are views that are accessible only by logged in users, we'll call this chunk `userPages`

> Create route

```js
{
  path: "/create",
  name: "Create",
  component: () => import( /* webpackChunkName: "userPages" */ "../views/Create"),
  beforeEnter: (to, from, next) => {
    if (!auth.currentUser) {
      return next({
        path: "/",
        query: { unauthorized: true }
      });
    } else {
      return next();
    }
  }
```

> My Memes route

```js
{
  path: "/my-memes",
  name: "MyMemes",
  component: () => import( /* webpackChunkName: "userPages" */ "../views/MyMemes"),
  beforeEnter: (to, from, next) => {
    if (!auth.currentUser) {
      return next({
        path: "/",
        query: { unauthorized: true }
      });
    } else {
      return next();
    }
  }
}
```

Since these routes share the same `webpackChunkName`, they will be bundled together. A user will load this bundle whenever they go to either route.

## Happy Chunking

![](../images/chunk.jpg)
