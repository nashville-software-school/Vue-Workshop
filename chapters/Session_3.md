![Vue Logo](../images/banner.jpg)

> **NOTE**: There are prerequisites for this chapter
>
> In this chapter we will be using the Vuetify component library. It's recommended that your explore the [docs](https://vuetifyjs.com/en/) ahead of time--particularly the UI Components section. All projects that are done in class will be built with Vuetify so it will be helpful if you get familiar with the components they offer and how to read their documentation.
>
> The application we will build in this chapter will make use of the [Grid System](https://vuetifyjs.com/en/components/grids/), [Text Field](https://vuetifyjs.com/en/components/text-fields/), and [Simple Table](https://vuetifyjs.com/en/components/simple-tables/) components. Read through the documentation on each to see how they are used.

[![](https://img.shields.io/badge/component-v--model-green?logo=vue.js)](https://vuejs.org/v2/guide/forms.html)
[![](https://img.shields.io/badge/component-lifecycle_methods-green?logo=vue.js)](https://vuejs.org/v2/api/#Options-Lifecycle-Hooks)
[![](https://img.shields.io/badge/component-data-green?logo=vue.js)](https://vuejs.org/v2/guide/instance.html#Data-and-Methods)
[![](https://img.shields.io/badge/component-text_interpolation-green?logo=vue.js)](https://vuejs.org/v2/guide/syntax.html#Text)
[![](https://img.shields.io/badge/component-v--for-green?logo=vue.js)](https://vuejs.org/v2/guide/list.html)
[![](https://img.shields.io/badge/component-props-green?logo=vue.js)](https://vuejs.org/v2/guide/components-props.html)
[![](https://img.shields.io/badge/component-$emit_custom_events-green?logo=vue.js)](https://vuejs.org/v2/guide/components-custom-events.html)

# Vue Phonebook

In this chapter we'll take a look at forms and build a phonebook application.

A demo of the application we'll be building can be seen [here](https://nss-vue-phonebook.web.app/)

> **Learning Objectives**: By the end of this chapter you should know how to
>
> - Utilize a component library
> - Use `v-model` to bind to form controls such as text inputs and select elements
> - Use the `mounted` lifecycle hook to call a method when a component enters the DOM
> - Add form validation to create a solid user experience

## Project setup

`cd` into the directory you'd like to add your new project and run

```sh
vue create phonebook
```

|           prompt           |          answer           |
| :------------------------: | :-----------------------: |
|           Preset           | Manually select features  |
|      Features needed       |  Babel, Linter/Formatter  |
|       Linter config        |     ESLint + Prettier     |
|    Additional lint feat    |       Lint on save        |
| Config location preference | In dedicated config files |
|       Save as preset       |             N             |

`cd` into the new phonebook directory. We'll be using the [Vuetify](https://vuetifyjs.com/en/) component library which can be added to our project by running

```sh
vue add vuetify
```

and choosing the `Default` preset.

This will add a bunch of boilerplate code that we don't want. Empty out all the code in `App.vue` except for the following

```vue
<template>
  <v-app>
    <v-app-bar app color="teal" dark>
      <div class="d-flex align-center">
        <h3>Phonebook</h3>
      </div>
    </v-app-bar>

    <v-main class="mt-5">
      <!-- Stuff will go here -->
    </v-main>
  </v-app>
</template>

<script>
export default {};
</script>
```

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
        firstName: "",
        lastName: "",
        phone: "",
        type: "",
        email: "",
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
  <v-text-field type="number" outlined label="Phone" v-model="form.phone" />
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
      firstName: "",
      lastName: "",
      phone: "",
      type: "",
      email: ""
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

By inspecting the Vue devtools we can confirm that the new contact is indeed getting added to the array. Now it'd be nice if the form reset after submission. Since we have two-way binding, all we have to do in the `ContactForm` component is set the properties on the `form` object back to empty strings and the input controls will automatically empty out.

```js
handleSubmit() {
  this.$emit("contact-submit", this.form);
  this.form = {
    firstName: "",
    lastName: "",
    phone: "",
    type: "",
    email: ""
  }
}
```

## Displaying the contacts

Next we'll build out a simple table to display contacts in the phonebook. Create a new file in the `components` directory and name it `ContactsTable.vue`. It will rely on the parent component to pass it an array of contacts via props.

```vue
<template>
  <div class="mb-5">
    <h3 class="teal--text">Contacts</h3>
  </div>
</template>

<script>
export default {
  props: ["contacts"],
};
</script>

<style></style>
```

Now import and use this new component in `Phonebook.vue`

```vue
<template>
  <div>
    <contacts-table :contacts="contacts" />
    <contact-form @contact-submit="addContact" />
  </div>
</template>

<script>
import ContactForm from "./ContactForm.vue";
import ContactsTable from "./ContactsTable.vue";

export default {
  components: { ContactForm, ContactsTable },
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

Back in `ContactsTable.vue` let's stub out a simple table using Vuetify's `<v-simple-table>` component. For starters, lets add the column headers. We'll iterate over the array of contacts in the next step

```html
<template>
  <div class="mb-5">
    <h3 class="teal--text">Contacts</h3>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Type</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <!-- TODO: Loop over contacts and display row for each -->
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>
```

The basic layout of the table should be visible on the screen. Inside the table body we can now begin to iterate of the contacts that get received as props using `v-for`. We currently don't have a unique ID on contacts, so we'll use the `phone` property as our key. Add the following code to the table body

```html
<tbody>
  <tr v-for="contact in contacts" :key="contact.phone">
    <td>{{ contact.firstName }} {{ contact.lastName }}</td>
    <td>{{ contact.phone }}</td>
    <td>{{ contact.type }}</td>
    <td>{{ contact.email }}</td>
  </tr>
</tbody>
```

## Persist data in local storage

We currently lose all our contacts every time the page reloads so let's fix that. In the `Phonebook` component, every time a new contact gets added let's save the array in local storage

```js
addContact(newContact) {
  this.contacts.push(newContact);

  localStorage.setItem("contacts", JSON.stringify(this.contacts));
}
```

If we add a new contact now and inspect local storage, we can confirm that the contact gets persisted. Now we have to handle getting the array _out_ of local storage when the page first loads.

## Utilizing lifecycle methods

What we need is a way to call a method immediately after our `Phonebook` component gets rendered. In that method we'll be able to get our list out of localStorage and set it in our component's `data`.

Vue allows you to hook into certain events of a component's lifecycle. The most commonly used ones we'll see in this course are `mounted` and `beforeDestroy`

- **mounted** - This method will be called immediately after a vue component has been created and mounted to the DOM. The component has already run it's first render by the time this method is called

- **beforeDestroy** - This method is called right before a component is destroyed and leaves the DOM. If your component does something like call `setInterval`, this lifecycle hook is a good opportunity to clear the interval.

If you'd like to see the other lifecycle events you can hook into, take a look at [the docs](https://vuejs.org/v2/guide/instance.html#Instance-Lifecycle-Hooks)

Update the `Phonebook` component to use the `mounted` method and get the contacts out of local storage

```js
export default {
  components: { ContactForm, ContactsTable },
  data() {
    return {
      contacts: [],
    };
  },
  mounted() {
    const existingContacts = JSON.parse(localStorage.getItem("contacts"));
    this.contacts = existingContacts || [];
  },
  methods: {
    addContact(newContact) {
      this.contacts.push(newContact);

      localStorage.setItem("contacts", JSON.stringify(this.contacts));
    },
  },
};
```

We can now safely refresh the browser and still see all our contacts!

## Cleaning up the layout

Let's take a quick moment to organize the layout in the `Phonebook` so we don't have giant form fields. We can utilize the excellent grid system in Vuetify to create a better responsive layout.

```html
<template>
  <div>
    <v-row>
      <v-col :lg="8" :sm="12">
        <contacts-table :contacts="contacts" />
      </v-col>
      <v-col :lg="4" :sm="12">
        <contact-form @contact-submit="addContact" />
      </v-col>
    </v-row>
  </div>
</template>
```

## Form Validation

> **NOTE**: Form validation can be tricky, and to help out with that problem, there are a few popular libraries that Vue developers like to lean on. The Vuetify input components have a built in validation so that's what we'll be using for this project but if you'd like to explore some other popular options, give these two packages a look
>
> - [Vuelidate](https://vuelidate.js.org/)
> - [VeeValidate](https://vee-validate.logaretm.com/v3)

Let's keep the data in our phonebook clean and add some validation rules to our contact form. We'll use Vuetify to accomplish this.

Vuetify input components accept a prop named `rules`. If we pass that prop an array of validator functions, Vuetify will run each of those functions every time the input value changes and check it validity.

Inside `ContactForm.vue` update the component's `data` to include a property named validators. Start with just a couple simple validators to check whether the **firstName** value exists and is less than 25 characters.

```js
data() {
  return {
    form: {
      firstName: "",
      lastName: "",
      phone: "",
      type: "",
      email: ""
    },
    phoneTypeOptions: ["Home", "Cell", "Office"],
    validators: {
      firstName: [
        val => !!val || "Contact first name is required",
        val => val.length < 25 || "First name must be less than 25 characters"
      ]
    }
  };
},
```

Now that we have our validator functions for the **firstName** field we can hook these up to the text field in the template.

```html
<v-text-field
  outlined
  label="First Name"
  v-model="form.firstName"
  :rules="validators.firstName"
/>
```

Add validation rules for the **lastName**, **phone** and **email** fields as well. Last name should not be required, but it should be less than 25 characters. Phone should be required and exactly 10 numbers. Email is not required but should include an `@` symbol.

> **NOTE**: Better validation rules for a phone numbers and email address would include complex regular expressions. If you're feeling adventurous give that a try

## Prevent submit when the form is invalid

When the `handleSubmit` function is called, we should first check if the form is valid. To do this, we need a **reference** to the form component inside the function. Fortunately Vue makes this easy. If we simply add a `ref` attribute on the form component and give it a name like this

```html
<v-form @submit.prevent="handleSubmit" ref="contactForm"></v-form>
```

we can reference it in our component functions with code that looks like this

```js
this.$refs.contactForm;
```

If you haven't already, add the `ref` attribute to the form. Now update the `handleSubmit` method to use the form reference and validate it. If the form is invalid, exit the function. If it is valid, remember to reset the validation after submit (otherwise you'll see validation errors on the screen after the form empties out).

```js
handleSubmit() {
  const isValid = this.$refs.contactForm.validate();
  if (!isValid) {
    // Form is not valid. Exit the method
    return;
  }

  this.$emit("contact-submit", this.form);
  this.form = {
    firstName: "",
    lastName: "",
    phone: "",
    type: "",
    email: ""
  };
  this.$refs.contactForm.resetValidation();
}
```

# Deployment

[Deploy to firebase](./Firebase_Deployment.md)

# What's next?

You're now free to work on any Level 1 or Level 2 projects from the [Project Vault](../project-vault/README.md)
