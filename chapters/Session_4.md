![Vue Logo](../images/banner.jpg)

\*\* TODO: Prerequisites: Destructuring, video intro on Vuex, seatgeek API

[![](https://img.shields.io/badge/component-lifecycle_methods-green?logo=vue.js)](https://vuejs.org/v2/api/#Options-Lifecycle-Hooks)
[![](https://img.shields.io/badge/component-text_interpolation-green?logo=vue.js)](https://vuejs.org/v2/guide/syntax.html#Text)
[![](https://img.shields.io/badge/component-v--for-green?logo=vue.js)](https://vuejs.org/v2/guide/list.html)
[![](https://img.shields.io/badge/Vuex-state-yellow?logo=vue.js)](https://vuex.vuejs.org/guide/state.html)
[![](https://img.shields.io/badge/Vuex-mutations-yellow?logo=vue.js)](https://vuex.vuejs.org/guide/mutations.html)
[![](https://img.shields.io/badge/Vuex-actions-yellow?logo=vue.js)](https://vuex.vuejs.org/guide/actions.html)
[![](https://img.shields.io/badge/Vuex-getters-yellow?logo=vue.js)](https://vuex.vuejs.org/guide/getters.html)

# Event Dashboard

In this chapter we're going to look at another way to manage state in our application. We'll explore a state management pattern called **Vuex** while we build a dashboard app to show events happening in Nashville

# Why Vuex

The apps we've built so far have fairly simple component trees, which has made managing state relatively easy. As a reminder, here's a look at the component tree we had in our Phonebook application

![](../images/Phonebook_Component_Tree.png)

We saw how we can have components communicate with each other. Parent components can **pass data down via props** and children components can **emit events up** to talk to parents.
