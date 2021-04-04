![Vue Logo](../images/banner.jpg)

[![](https://img.shields.io/badge/tesing-mounting-purple?logo=jest)](https://vue-test-utils.vuejs.org/api/mount.html)
[![](https://img.shields.io/badge/tesing-asserting_events-purple?logo=jest)](https://vue-test-utils.vuejs.org/guides/#testing-key-mouse-and-other-dom-events)
[![](https://img.shields.io/badge/tesing-mocking-purple?logo=jest)](https://jestjs.io/docs/mock-functions#mocking-modules)

# Testing Vue applications - part 2

In this chapter we're going to use some more advanced features of Jest in order to test our Phonebook app

> **Leaning Objectives**: By the end of this chapter you should be able to
>
> - Set up tests for applications using Vuetify
> - Make assertions about emitted events
> - Use Jest mock function implementations
> - Better understand how to use the component wrapper object to make assertions about your application

## Testing Phonebook

We're going to add tests to the Phonebook app we built in chapter 3. Start by cloning this repo:

https://github.com/NSS-Vue-Workshop/Phonebook-JSON-Server

**_A couple things to note..._**

First, in order to make this a little more "real world", we've scrapped local storage for data persistence. Instead we're going to use a tool called [json-server](https://www.npmjs.com/package/json-server) to mimic a real back end. For the purpose of this exercise, pretend that our phonebook application talks to a real production backend. You can serve the Vue application and run json-server backend by running

```
npm run dev
```

Second, instead of using `fetch` to make our HTTP requests, we're using a package called `axios`. Axios has a number of advantages over `fetch`, and one of them is that it makes testing easier.

Take a moment and poke around the codebase to get familiar with these changes.

## Setting up tests

Start getting your testing tools installed by running

```
vue add unit-jest
```

Because this app uses Vuetify, we have a bit more to set up on this project than we did on Scoreboard. When we tell our tests to mount our components, we need to make sure that they know about Vuetify components too--otherwise they'll fail with a message that looks like this:

```
Unknown custom element: <v-text-field> - did you register the component correctly?
```

To handle this, create a file named `setup.js` and put it in the `test/` directory. Add the following code

```js
import Vue from "vue";
import Vuetify from "vuetify";

Vue.use(Vuetify);
```

Now update the `jest.config.js` file with the following code. This will tell Jest to run the `setup.js` file before it starts executing our tests

```js
module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  setupFiles: ["./tests/setup.js"],
};
```

We're ready to start writing our tests now. We'll decide in a moment _what_ we want to test, but we can get started by outlining a very simple test to make sure the `Phonebook` component actually renders. Once again, because of Vuetify, we have to slightly change the way our tests are outlined. The [Vuetify docs](https://vuetifyjs.com/en/getting-started/unit-testing/#bootstrapping-vuetify) recommend setting up your tests like this

```js
import { mount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
import Phonebook from "@/components/Phonebook.vue";

describe("Phonebook.vue", () => {
  const localVue = createLocalVue();
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it("renders successfully", () => {
    const wrapper = mount(Phonebook, {
      localVue,
      vuetify,
    });

    expect(wrapper.exists()).toBe(true);
  });
});
```

A couple things to notice here. First, when we're mounting the `Phonebook` component, we're including Vuetify in the `mount` function. We're also including something called `localVue`. To better understand what this is and why we use it, see [this stackoverflow answer](https://stackoverflow.com/questions/62312842/why-is-createlocalvue-needed-when-testing-vue-components-with-vuex). We're also taking advantage of a hook that Jest gives us called `beforeEach`. This takes a function that will be run before every test gets run.

## What should we test?

Let's consider what the requirements for our application were

1. The application should show a table with all contacts in the user's phonebook

1. The application should prevent the user from submitting the Create form if there is no first name entered

1. The application should add a new record to the phonebook when the user fills out the form. The newly added contact should be included in the table.

We can start to break these into test cases and think about what components we should test in the process

**ContactsTable**

1. If the `ContactsTable` component is passed an array of 4 contacts as props, it should show table with 4 rows--one for each contact

**ContactForm**

1. If the form inside the `ContactForm` component is submitted and the first name input is left blank, the component should not emit a `contact-submit` event

1. If the form inside the `ContactForm` component is submitted and the the form is valid, the component should emit a `contact-submit` event

**Phonebook**

1. When the component mounts it should get all contacts and render them

1. When a valid form gets submitted a new row should be added to the table with the new contact's information

## Testing the `ContactsTable`

To test just the `ContactsTable` component, all we'll need to do is hard code an array of contacts, pass them to the component as props, and confirm that a table row has been created for each with their info in it. Create a `ContactsTable.spec.js` file in the `tests/unit` directory and add the following code. The sample data below comes from an online tool called [Mockaroo](https://www.mockaroo.com/) which is incredibly helpful with generating dummy data for testing

```js
import { mount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
import ContactsTable from "@/components/ContactsTable.vue";

describe("ContactsTable.vue", () => {
  const localVue = createLocalVue();
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it("shows table with all contacts passed as props", () => {
    const data = sampleData();
    const wrapper = mount(ContactsTable, {
      localVue,
      vuetify,
      propsData: {
        contacts: data,
      },
    });

    const tableRows = wrapper.findAll(".contact-row");

    expect(tableRows.length).toBe(data.length);
    expect(tableRows.at(0).text()).toContain("Geoffry Levens");
    expect(tableRows.at(1).text()).toContain("Byran McConigal");
    expect(tableRows.at(2).text()).toContain("Olive Paylor");
    expect(tableRows.at(3).text()).toContain("Dell Raoul");
  });
});

const sampleData = () => {
  return [
    {
      id: 1,
      firstName: "Geoffry",
      lastName: "Levens",
      email: "glevens0@lycos.com",
      phone: "495-850-2498",
      favorited: false,
      type: "Cell",
    },
    {
      id: 2,
      firstName: "Byran",
      lastName: "McConigal",
      email: "bmcconigal1@usgs.gov",
      phone: "613-301-9013",
      favorited: false,
      type: "Office",
    },
    {
      id: 3,
      firstName: "Olive",
      lastName: "Paylor",
      email: "opaylor2@phpbb.com",
      phone: "523-430-3130",
      favorited: false,
      type: "Cell",
    },
    {
      id: 4,
      firstName: "Dell",
      lastName: "Raoul",
      email: "draoul3@free.fr",
      phone: "185-663-5227",
      favorited: true,
      type: "Office",
    },
  ];
};
```

## Testing if events are emitted

For our `ContactForm` tests, we want to confirm that the `contact-submit` event is emitted when the form is valid but not when it's invalid. The component wrapper object gives us a method named `emitted` which allows us to check on the specified event.

It also gives us a method named `setValue` which will allow us to set the value of `<input>` elements

Add a new `ContactForm.spec.js` and add the following code

```js
import { mount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
import ContactForm from "@/components/ContactForm.vue";

describe("ContactForm.vue", () => {
  const localVue = createLocalVue();
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it("does not emit the contact-submit event when the form is invalid", async () => {
    const wrapper = mount(ContactForm, {
      localVue,
      vuetify,
    });

    await wrapper.find("#firstName").setValue(""); // Empty First Name
    await wrapper.find("#lastName").setValue("Sheaffer");
    await wrapper.find("#phone").setValue("615-555-5555");
    await wrapper.find("#email").setValue("adam@nss.com");
    await wrapper.find("#phoneType").setValue("Cell");

    await wrapper.find("#contact-form").trigger("submit.prevent");

    expect(wrapper.emitted("contact-submit")).toBeFalsy();
  });

  it("emits the contact-submit event when the form is valid", async () => {
    const wrapper = mount(ContactForm, {
      localVue,
      vuetify,
    });

    await wrapper.find("#firstName").setValue("Adam");
    await wrapper.find("#lastName").setValue("Sheaffer");
    await wrapper.find("#phone").setValue("615-555-5555");
    await wrapper.find("#email").setValue("adam@nss.com");
    await wrapper.find("#phoneType").setValue("Cell");

    await wrapper.find("#contact-form").trigger("submit.prevent");

    expect(wrapper.emitted("contact-submit")).toBeTruthy();
  });
});
```

## Using mocks to avoid making actual HTTP requests

Our last two tests are going to be more integration tests. We're going to mount the `Phonebook` component which will then mount the form and the table components as children so we can confirm they are all wired up correctly. Add a `Phonebook.spec.js` file to the `tests/unit` directory.

Now that we're testing our `Phonebook` component, we're faced with a challenge. As soon as we mount the component it will make a GET request to hit our backend API. It will also make a POST request when a new contact is added. We want to avoid this for a number of reasons:

1. Assuming our API checks our database, we can't be sure at any given time what data is actually in the database. We wouldn't know what to assert

1. We're currently just trying to test our front end code. If something went wrong with our API, our Jest tests might fail even though there's nothing wrong with our Vue code

1. When we make a POST request we don't actually want to save a new record in the database when we run that test

Imagine we started with a test that looked like this

```js
import { mount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
import Phonebook from "@/components/Phonebook.vue";

describe("Phonebook.vue", () => {
  const localVue = createLocalVue();
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it("loads all contacts on mount and display them in a table", async () => {
    const wrapper = mount(Phonebook, {
      localVue,
      vuetify,
    });

    const tableRows = wrapper.findAll(".contact-row");

    // Make some expectations about the table rows.....
  });
});
```

By doing just this, the component will try to make a request to our API, however with the help of Jest, we can change that.

Inside the `mounted` hook of `Phonebook.vue` we call this code

```js
const { data } = await axios.get("/api/contacts");
```

We can actually tell Jest to **mock** the behavior of axios' `get` method and say

_**"instead of making an actual HTTP request, just return this hard coded data"**_

```js
import { mount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
import axios from "axios";
import Phonebook from "@/components/Phonebook.vue";

jest.mock("axios");

describe("Phonebook.vue", () => {
  const localVue = createLocalVue();
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it("loads all contacts on mount and display them in a table", () => {
    const data = sampleData();
    const fakeResponse = { data };
    axios.get.mockResolvedValue(fakeResponse);

    const wrapper = mount(Phonebook, {
      localVue,
      vuetify,
    });

    const tableRows = wrapper.findAll(".contact-row");

    expect(tableRows.at(0).text()).toContain("Geoffry Levens");
    expect(tableRows.at(1).text()).toContain("Byran McConigal");
    expect(tableRows.at(2).text()).toContain("Olive Paylor");
    expect(tableRows.at(3).text()).toContain("Dell Raoul");
  });
});

const sampleData = () => {
  return [
    {
      id: 1,
      firstName: "Geoffry",
      lastName: "Levens",
      email: "glevens0@lycos.com",
      phone: "495-850-2498",
      favorited: false,
      type: "Cell",
    },
    {
      id: 2,
      firstName: "Byran",
      lastName: "McConigal",
      email: "bmcconigal1@usgs.gov",
      phone: "613-301-9013",
      favorited: false,
      type: "Office",
    },
    {
      id: 3,
      firstName: "Olive",
      lastName: "Paylor",
      email: "opaylor2@phpbb.com",
      phone: "523-430-3130",
      favorited: false,
      type: "Cell",
    },
    {
      id: 4,
      firstName: "Dell",
      lastName: "Raoul",
      email: "draoul3@free.fr",
      phone: "185-663-5227",
      favorited: true,
      type: "Office",
    },
  ];
};
```

We've brought back the `sampleData` function to create us some hard coded data. We've also added these two relevant sections

```js
jest.mock("axios");

...

const data = sampleData();
const fakeResponse = { data };
axios.get.mockResolvedValue(fakeResponse);
```

Try running the tests again...

**...IT STILL FAILS!**

The reason the test is still failing is because our `mounted` hook is async and we're trying to check the status of the table rows before the Promise gets resolved.

While there is a way to handle this with just the Vue Testing Utils, the simpler way to do this is by installing a package called `flush-promises`. Install the package as a dev dependency by running this

```
npm i -D flush-promises
```

Now import it at the top of `Phonebook.spec.js`

```js
import flushPromises from "flush-promises";
```

and now after you mount the `Phonebook` component in your test you can simply call it like this as a way to resolve all pending promises

```js
...

const wrapper = mount(Phonebook, {
  localVue,
  vuetify
});

await flushPromises();

...
```

Your test should now pass

## Mocking axios' `post` method

We saw how to mock the `get` method, so let's now take a look at how we can mock the call to `post`. Let's first take a look at how we're using the `post` method in our actual code

```js
async addContact(newContact) {
  const { data } = await axios.post("/api/contacts", newContact);

  this.contacts.push(data);
}
```

As we think about how we're going to mock this, let's take a look at how this method functions--it accepts two params; a string URL and an object. It returns a promise which when resolved will be an object with a property on it named `data`

With this in mind, we can mock it to look something like this

```js
axios.post.mockImplementation((url, obj) => Promise.resolve({ data: obj }));
```

In the code here we're saying that the mocked implementation of the `post` method will also accept two params. It will also return a promise which when resolved will be the same object that was passed in as an argument

We can now create our last test to confirm that the Add Contact feature is working. The following code mimics a user filling out the contact form and checking to see that the new contact is added after they submit

```js
it("adds the new contact to the table when a valid form is submitted", async () => {
  const data = sampleData();
  const fakeResponse = { data };
  axios.get.mockResolvedValue(fakeResponse);
  axios.post.mockImplementation((url, obj) => Promise.resolve({ data: obj }));

  const wrapper = mount(Phonebook, {
    localVue,
    vuetify,
  });

  await wrapper.find("#firstName").setValue("Adam");
  await wrapper.find("#lastName").setValue("Sheaffer");
  await wrapper.find("#phone").setValue("615-555-5555");
  await wrapper.find("#email").setValue("adam@nss.com");
  await wrapper.find("#phoneType").setValue("Cell");

  await wrapper.find("#contact-form").trigger("submit.prevent");

  await flushPromises();

  const tableRows = wrapper.findAll(".contact-row");

  expect(tableRows.length).toBe(5);
  expect(tableRows.at(0).text()).toContain("Geoffry Levens");
  expect(tableRows.at(1).text()).toContain("Byran McConigal");
  expect(tableRows.at(2).text()).toContain("Olive Paylor");
  expect(tableRows.at(3).text()).toContain("Dell Raoul");
  expect(tableRows.at(4).text()).toContain("Adam Sheaffer");
});
```
