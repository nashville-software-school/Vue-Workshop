![Vue Logo](../images/banner.jpg)

\*\* TODO: Prerequisites are Vuetify

[![](https://img.shields.io/badge/component-v--model-green?logo=vue.js)](https://vuejs.org/v2/guide/forms.html)
[![](https://img.shields.io/badge/component-lifecycle_methods-green?logo=vue.js)](https://vuejs.org/v2/api/#Options-Lifecycle-Hooks)
[![](https://img.shields.io/badge/component-data-green?logo=vue.js)](https://vuejs.org/v2/guide/instance.html#Data-and-Methods)
[![](https://img.shields.io/badge/component-text_interpolation-green?logo=vue.js)](https://vuejs.org/v2/guide/syntax.html#Text)
[![](https://img.shields.io/badge/component-v--for-green?logo=vue.js)](https://vuejs.org/v2/guide/list.html)
[![](https://img.shields.io/badge/component-props-green?logo=vue.js)](https://vuejs.org/v2/guide/components-props.html)
[![](https://img.shields.io/badge/component-$emit_custom_events-green?logo=vue.js)](https://vuejs.org/v2/guide/components-custom-events.html)
[![](https://img.shields.io/badge/component-computed_properties-green?logo=vue.js)](https://vuejs.org/v2/guide/computed.html)

# Vue Phonebook

In this chapter we'll take a look at forms and build a phonebook application

> **Learning Objectives**: By the end of this chapter you should know how to
>
> - Utilize a component library
> - Use `v-model` to bind to form controls such as text inputs and select elements
> - Add form validation to create a solid user experience

## Project setup

TODO: create with CLI, add vuetify, empty out App.vue

## Creating the Phonebook component

Add a file to the `components` directory named `Phonebook.vue`. This will be the top level component for the app. Give it a hard coded header for now and add an empty array in the component's `data` to hold the contacts.

```vue
<template>
  <h1>Phonebook stuff goes here</h1>
</template>

<script>
export default {
  data() {
    return {
      contacts: [],
    };
  },
};
</script>

<style></style>
```

Now let's use this component in our `App.vue` file. Update the file to import our new component and add it to the template inside the `<v-main>` element

```vue
<template>
  <v-app>
    <v-app-bar app color="teal" dark>
      <div class="d-flex align-center">
        <h3>Phonebook</h3>
      </div>
    </v-app-bar>

    <v-main class="ma-5">
      <phonebook />
    </v-main>
  </v-app>
</template>

<script>
import Phonebook from "./components/Phonebook";

export default {
  components: {
    Phonebook,
  },
};
</script>
```

## Creating the contact form component

Let's build out a form for adding a contacts to our phonebook. The form will collect the following information

- first name
- last name
- phone number
- type (home, cell, office)
- email

Start by creating a new file in the `components` directory named `ContactForm.vue`. Give it an empty form element in the template and in the component `data`, declare an object called `form` that will hold the values of our form fields

```vue
<template>
  <div>
    <h3 class="teal--text">New Contact</h3>
    <v-form></v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        firstName: null,
        lastName: null,
        phone: null,
        type: null,
        email: null,
      },
    };
  },
};
</script>

<style></style>
```

Before we start adding inputs onto our form let's add our `ContactForm` component to our `Phonebook` component. Update `Phonebook.vue` to import it and add it to the template

```vue
<template>
  <contact-form />
</template>

<script>
import ContactForm from "./ContactForm.vue";

export default {
  components: { ContactForm },
  data() {
    return {
      contacts: [],
    };
  },
};
</script>

<style></style>
```

## Binding to forms with `v-model`

We're ready to start adding inputs to our form component, so let's start with the `firstName` field. We can use Vue's `v-model` directive to bind a property to an input. Update the template of the `ContactForm` to include a Vuetify text field and include a `v-model`

```html
<v-form>
  <v-text-field outlined label="First Name" v-model="form.firstName" />
</v-form>
```

> Note: The `outlined` attribute is a prop for the Vuetify component to add some styling

The `v-model` directive sets up what's called _two-way binding_. This means two things

1. When the value of the input element changes, the value for `form.firstName` is updated
1. If we were to change the value of `form.firstName` for some reason, the input's value would also change

Let's add more form fields for the rest of the fields, but let's skip `type` for now since that will use a `select` box.

```html
<v-form>
  <v-text-field outlined label="First Name" v-model="form.firstName" />
  <v-text-field outlined label="Last Name" v-model="form.lastName" />
  <v-text-field outlined label="Phone" v-model="form.phone" />
  <!-- TODO: phone type -->
  <v-text-field outlined label="Email" v-model="form.email" />
</v-form>
```

## Adding a select box

The Vuetify `<v-select>` component wants us to pass it an array of items as a prop so it can know what options to render. Let's define that array in our component's `data`

```js
data() {
  return {
    form: {
      firstName: null,
      lastName: null,
      phone: null,
      type: null,
      email: null
    },
    phoneTypeOptions: ["Home", "Cell", "Office"]
  };
}
```

Now we can use the `<v-select>` component and pass in this array as props. Add the select below the input for Phone Number

```html
<v-select
  outlined
  label="Phone Type"
  :items="phoneTypeOptions"
  v-model="form.type"
/>
```

## Submitting the form

To submit the form let's start by adding a button and hooking into the form's submit event. Add the button just before the closing form tag and give it a `type` attribute of "submit"

```html
<v-btn type="submit" color="teal" dark>Submit</v-btn>
```

We can now listen for the `submit` event on the form by adding an event listener. When the form submits we'll call a method named `handleSubmit`. We'll define that method in just a moment.

```html
<v-form @submit="handleSubmit"></v-form>
```

Now add a `methods` property to the component and stub out `handleSubmit`. For starters let's just have it log the `form` object to the console.

```js
methods: {
  handleSubmit() {
    console.log(this.form);
  }
}
```

Try filling out the form and clicking the submit button. You'll notice that we're falling victim to a pesky page refresh! You're probably saying to yourself that we can simply have `handleSubmit` take in the event object and call `preventDefault` on it, and you'd be absolutely correct. However Vue also gives us a shorthand for this. We can simply change from this

```html
<v-form @submit="handleSubmit"></v-form>
```

to this

```html
<v-form @submit.prevent="handleSubmit"></v-form>
```

This is an example of an **event modifier** in Vue. Vue provides a handful of helpful modifiers to deal with common tasks like this. To see a full list, check out [the docs](https://vuejs.org/v2/guide/events.html#Event-Modifiers)

## Adding the new contact to the list

Instead of just logging the new contact object to the console, let's add that person to the array of contacts in the parent component. In the last lesson we learned that when a child component wants to alert its parent that an event has occurred it can call `this.$emit`, so let's utilize that. Update `handleSubmit` to the following implementation

```js
handleSubmit() {
  this.$emit("contact-submit", this.form);
  // TODO: clear form fields
}
```

The `Phonebook` component can now listen for the `contact-submit` event in order to add the new contact to its array. Update `Phonebook.vue` to add this listener.

```vue
<template>
  <contact-form @contact-submit="addContact" />
</template>

<script>
import ContactForm from "./ContactForm.vue";

export default {
  components: { ContactForm },
  data() {
    return {
      contacts: [],
    };
  },
  methods: {
    addContact(newContact) {
      this.contacts.push(newContact);
    },
  },
};
</script>

<style></style>
```

By inspecting the Vue devtools we can confirm that the new contact is indeed getting added to the array. Now it'd be nice if the form reset after submission.

## Resetting the form using refs

We have a couple options for resetting the form. The first would be to manually change all the property values of `this.form` back to null. Since we have two-way binding, the input fields would automatically empty out. This option is a little verbose though, and doesn't scale very well. If we wanted to add more inputs to our form we'd have to remember to null those values out as well.

If the `handleSubmit` method had access to the actual DOM element for the `<form>` it could use the `reset` method which clears out all inputs. You might think to do something like `document.querySelector('form')` as a way to get a hold of that element, however when working with Vue (or most frontend frameworks for that matter), we don't want to use the `document` object ourselves.

Vue provides us with an attribute called `ref` which we can add to any HTML element and this is how we can access the underlying DOM node. Here is how we can use it on the form

```html
<v-form @submit.prevent="handleSubmit" ref="contactForm"></v-form>
```

You can give the ref any name you want, and then in your methods you can reference it like this

```js
handleSubmit() {
  this.$emit("contact-submit", this.form);
  // this.$refs.contactForm is the form DOM element
  this.$refs.contactForm.reset();
}
```
