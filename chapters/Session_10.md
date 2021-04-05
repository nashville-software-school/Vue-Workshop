![Vue Logo](../images/banner.jpg)

> **NOTE**: This chapter has prerequisites
>
> - [Intro to JS testing with Jest](https://www.youtube.com/watch?v=FgnxcUQ5vho)

[![](https://img.shields.io/badge/tesing-mounting-purple?logo=jest)](https://vue-test-utils.vuejs.org/api/mount.html)
[![](https://img.shields.io/badge/tesing-assertions-purple?logo=jest)](https://jestjs.io/docs/expect)
[![](https://img.shields.io/badge/tesing-triggering_events-purple?logo=jest)](https://vue-test-utils.vuejs.org/guides/#testing-key-mouse-and-other-dom-events)

# Testing Vue applications - part 1

In these last two chapters we're going to look at how to test a couple of our Vue apps using the [Vue Test Utils](https://vue-test-utils.vuejs.org/) library and the [Jest](https://jestjs.io/) testing framework

> **Leaning Objectives**: By the end of this chapter you should be able to
>
> - Set up and run tests for your Vue applications
> - Know how to use the component wrapper object to set up and play out test cases
> - Use Jest's `expect` function to make assertions about your application

## Testing Scoreboard

Let's start by adding tests for one of the first Vue apps we built in this course--[Scoreboard](https://nss-vue-scoreboard.web.app/). If you don't have this code handy, you can clone [this repo](https://github.com/NSS-Vue-Workshop/Scoreboard). The code in this repo is what we'll be testing in this chapter

When starting to write tests for our application, there's an art to not just knowing _how_ to test, but _what_ to test. A general rule of thumb is to form tests around your application's requirements. As a reminder, here were the requirements for the Scoreboard app:

> - Display a header with the team names "Team 1" and "Team 2"
>
> - Below the header dislpay a score card for each team which displays the team's current score, along with a + and - button that increments and decrements the team's score. The score should not be allowed to go below zero
>
> - The name of the currently leading team in the top header should be highlighted
>
> - Add a subheader below the header to say how great the lead is (e.g. "Team 1 is leading by 5 points"). If the game is tied, the subheader should say "The game is currently tied"
>
> - Use correct pluralization (i.e. "leading by 1 point" or "leading by 10 points")

With this in mind we can start to think about what our test cases are. Let's plan on writing tests to assert the following:

1. When the `MatchupTitle` component mounts it should show a title of "Team 1 vs Team 2"

1. When `App` mounts both teams should start with a score of zero

1. If a team's score is zero, when a `+` button is clicked the score should be 1. If the button is clicked 3 more times. it should be 4

1. If a team's score is 10, when the `-` button is clicked the score should be 9

1. If a team's score is zero, when the `-` button is clicked the score should stay zero

1. If Team 1 has 10 points and Team 2 has 9 points, the name Team 1 should have a CSS class of "winning" on it while Team 2 should not

1. If Team 1 has 15 points and Team 2 has 20 points, the `GameStatus` component should show the text "Team 2 is leading by 5 points"

1. If Team 1 has 10 points and Team 2 has 10 points, the `GameStatus` component should show the text "The game is currently tied"

1. If Team 1 has 9 points and Team 2 has 10 points, the `GameStatus` component should show the text "Team 2 is leading by 1 point"

## Adding testing tools to the project

When setting up a new project with the CLI, one of the options is to set up unit testing right from the start. We didn't do that however, so we'll have to add these tools in now. In the Scoreboard project run

```
vue add unit-jest
```

This installs the Jest testing framework and the Vue Testing Utils library. The VTU library is going to allow us to do things like mount individual components in our tests and gives us a convenient way to do things like search for HTML elements by their CSS selectors.

We've also got a new `tests/unit` directory with an example test file. Feel free to delete this file.

Lastly, we've got a new npm script in our `package.json` file named `test:unit`. You can execute your tests by running `npm run test:unit`

## Testing the `MatchupTitle` component

The first test we decided to write was to confirm that the team names were being shown in the Matchup Title component. Let's look at the outline of how our test files should look for starters. In the `tests/unit` directory add a file named `MatchupTitle.spec.js` and add the following code

```js
import { mount } from "@vue/test-utils";
import MatchupTitle from "@/components/MatchupTitle.vue";

describe("MatchupTitle.vue", () => {
  // Tests will go in here
});
```

We're not using them yet, but we're importing the `MatchupTitle` component and the `mount` method that we get from the VTU library that will eventually be used to mount that component in each of our tests. We're also setting up a `describe` function where the first parameter is typically given the name of the file we're testing

Now let's write our first test and make our assertions

```js
import { mount } from "@vue/test-utils";
import MatchupTitle from "../../src/components/MatchupTitle.vue";

describe("MatchupTitle.vue", () => {
  it("renders both teams' names", () => {
    const componentWrapper = mount(MatchupTitle, {
      propsData: {
        team1: { name: "Team 1", score: 0 },
        team2: { name: "Team 2", score: 0 },
      },
    });

    expect(componentWrapper.text()).toContain("Team 1");
    expect(componentWrapper.text()).toContain("Team 2");
  });
});
```

Let's start to break this down...

All the tests that we'll write for `MatchupTitle` are going to go inside our `describe` block. Each test is going to start with the `it` function and we're going to explain _what it does_

In the implementation of our test we're using the `mount` function that we imported to mount the `MatchupTitle` component. If you recall, the `MatchupTitle` component is set up to accept two props--`team1` and `team2`. Using the `mount` function, we can pass it some sample data as props

What the `mount` function returns is a _component wrapper_. The cool thing about the wrapper is that in addition to all of the things we'd find on the normal component instance (e.g. data, props, methods, computed, etc), we have some helper methods courtesy of the VTU library. In this test for example, you can see that we're using a method named `text()` which will give us the text content of the component's template. Other helper methods that we'll use frequently in this chapter are `find` and `findAll` which mimic the behavior of `document.querySelector` and `document.querySelectorAll`

Now that the component is mounted we can start to make our assertions. We are setting two expectations in this test, which are that both team names are represented in the title

## Testing multiple components at once

Unit testing--as the name implies--is when we test just a single unit in isolation. Sometimes it can be helpful to also test multiple modules and components of a system together. This is considered integration testing.

Let's consider the next test we decided to write:

> When `App` mounts both teams should start with a score of zero

For this test we're going to mount the `App` component which in turn will mount all the other components as its children. We'll be setting the `data` of the `App` component but actually be testing to see that the text inside the `TeamScore` components is correct

Start by creating `App.spec.js` file and giving it the same outline code as before

```js
import { mount } from "@vue/test-utils";
import App from "../../src/App.vue";

describe("App.vue", () => {
  // Tests will go in here
});
```

Now add the first test

```js
import { mount } from "@vue/test-utils";
import App from "../../src/App.vue";

describe("App.vue", () => {
  it("starts both teams with a score of zero", () => {
    const componentWrapper = mount(App);
    const scores = componentWrapper.findAll(".score");

    expect(scores.at(0).text()).toBe("0");
    expect(scores.at(1).text()).toBe("0");
  });
});
```

We're mounting the `App` component same as before however we don't need to give it any sample data as props. Next we're using the component wrapper's `findAll` method to find all the HTML elements with the CSS class of `score`. Our expectation is that the text in the two matching elements is "0" for both

## Triggering events

Let's look at our next test case

> If a team's score is zero, when a `+` button is clicked the score should be 1. If the button is clicked 3 more times. it should be 4

To create this test case we'll need to simulate the clicking of the `+` button. Add the following test in `App.spec.js` and remember to keep all these tests inside the `describe` block

```js
it("adds 1 to the score when the plus button is clicked", async () => {
  const componentWrapper = mount(App);
  const team1AddBtn = componentWrapper.find(".button-add");
  const team1Score = componentWrapper.find(".score");

  await team1AddBtn.trigger("click");

  expect(team1Score.text()).toBe("1");

  await team1AddBtn.trigger("click");
  await team1AddBtn.trigger("click");
  await team1AddBtn.trigger("click");

  expect(team1Score.text()).toBe("4");
});
```

In this test we're using the `find` method to once again find the HTML element that matches the provided CSS selector. Once we have that element, we're manually triggering a click event. Notice that the `trigger` method is asynchronous and therefore we must `await` it and mark the function it's in as `async`

## Explicitly setting component data

Let's look at the 4th test case

> If a team's score is 10, when the `-` button is clicked the score should be 9

To get the score to be 10, it would be tedious to trigger 10 click events on the `+` button. Instead we should just manually set the `App` component's data so that Team 1 has 10 points

```js
it("subtracts 1 to the score when the minus button is clicked", async () => {
  const componentWrapper = mount(App);
  const team1MinusBtn = componentWrapper.find(".button-minus");
  const team1Score = componentWrapper.findAll(".score").at(0);

  await componentWrapper.setData({
    team1: {
      score: 10,
    },
  });

  await team1MinusBtn.trigger("click");

  expect(team1Score.text()).toBe("9");
});
```

## Finishing App.vue tests

Let's wrap up the last test case for `App.vue`

> If a team's score is zero, when the `-` button is clicked the score should stay zero

```js
it("doesn't go less than zero", async () => {
  const componentWrapper = mount(App);
  const team1MinusBtn = componentWrapper.find(".button-minus");
  const team1Score = componentWrapper.findAll(".score").at(0);

  await team1MinusBtn.trigger("click");

  expect(team1Score.text()).toBe("0");
});
```

## Verifying Styling

For the next test case we have to verify that a specific CSS class gets added to the appropriate team name

> If Team 1 has 10 points and Team 2 has 9 points, the name Team 1 should have a CSS class of "winning" on it while Team 2 should not

We're going to go back to the `MatchupTitle.spec.js` test suite for this one. Add another test below the one we created earlier

```js
it("highlights the winning team name", () => {
  const componentWrapper = mount(MatchupTitle, {
    propsData: {
      team1: { name: "Team 1", score: 10 },
      team2: { name: "Team 2", score: 5 },
    },
  });

  const teamNames = componentWrapper.findAll("h1 > span");
  const team1Name = teamNames.at(0);
  const team2Name = teamNames.at(1);

  expect(team1Name.classes()).toContain("winning");
  expect(team2Name.classes()).not.toContain("winning");
});
```

Here we're using the `classes` method on the `team1Name` element to get an array of CSS classes that it has applied. We then assert that the array contains a CSS class of "winning". Next we assert that the `team2Name` element does not have that class

# Exercise

Create a new `GameStatus.spec.js` file and add tests for cases 7-9
