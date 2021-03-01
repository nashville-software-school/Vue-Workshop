

# Installations

### A Quick Note on Permissions
Some of the installations below are global which can mean they require a higher level of permissions. If you are using macOS and encounter issues during installation, you may need to add  `sudo` to the beginning of the command in order to run it properly.

## Vue CLI

The Vue CLI is a command line tool that makes it easy to create new Vue applications. It can be installed globally via npm

```sh
npm install -g @vue/cli
```

## Vue Devtools

Vue Devtools is a browser extension that makes inspecting and debugging Vue applications easy.

- [Install for Chrome](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=en)

- [Install for Firefox](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)

## Vetur: VSCode Extension

Vetur is an extension for VSCode that adds snippets, formatting, and intellisense for Vue apps. Install it directly from VsCode or from [the website](https://marketplace.visualstudio.com/items?itemName=octref.vetur)

## Firebase Setup

We'll be using firebase to deploy our projects and occasionally using the firestore database. To do this, you'll need a firebase account and the firebase CLI.

If you don't already have a firebase account you can create one by going to the [firebase website](https://firebase.google.com/) and sign in with Google.

Once you have an account you can install the firebase CLI globally via npm.

```sh
npm install -g firebase-tools
```

After the npm package finishes installing you can log in through the CLI by running the following command in your terminal

```sh
firebase login
```

This should open a browser window for you to log in. Once you do, you're all set.
