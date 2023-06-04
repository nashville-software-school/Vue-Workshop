# Create a simple Scoreboard

For this project, create a scoreboard for two teams with `+` and `-` buttons and display the currently leading team.

[**View a Demo**](https://nss-vue-scoreboard.web.app/)

## Part 1

- Display a header saying Team 1 vs Team 2 (feel free to name these something else)
- Below the header dislpay a score card for each team which displays the team's current score, along with a `+` and `-` button that increments and decrements the team's score. The score should not be allowed to go below zero

## Part 2

- The name of the currently leading team in the top header should be highlighted

## Part 3

- Add a subheader below the header to say how great the lead is (e.g. "Team 1 is leading by 5 points"). If the game is tied, the subheader should say "The game is currently tied"
  - Use correct pluralization (i.e. "leading by 1 point" or "leading by 10 points")

# Code By Numbers

1. Create a new app using `npm create vue@3` and empty out all the boilerplate code
2. Inside the `App.vue` script add two ref objects called `team1` and `team2` . Give them each a name and a score property. The names can be "Team 1" and "Team 2" if you like or feel free to be creative
3. Create a new component called `MatchupTitle` and have it accept two props for each of the team objects. You can also call these props `team1` and `team2` (or something else if you'd rather)
4. Have the `MatchupTitle` component dynamically display "Team 1 vs Team 2" by using the objects it receives from props
5. Use the `<MatchupTitle>` component in `App.vue` and put it towards the top of the view. Pass in the two team objects as props
6. Add a `ScoreCard` component and have it accept a `score` prop. Render the score in the template and add the two plus and minus buttons.
7. Add a function (or functions) to add to the button click events. These should emit an event to the parent that the score is being updated
8. Add two `<ScoreCard>` components to `App.vue` and pass in each team's score via props
9. Add event listeners to `<ScoreCard>` to listen for the custom events you created in the previous step. This should be handled by incrementing or decrementing the team's score. Be sure to prevent a score below zero
10. In `MatchupTitle.vue` create a CSS class named `winning` which uses a different font color. Conditionally add the winning class to the team name if they are leading
11. Create a `GameStatus` component for the subheader. It should accept two team objects as props. It should have a computed variable called `gameLeaderDisplay` which should evaluate what the message should say. Render the message in the template
12. Use the `<GameStatus>` component in App and pass in the two team objects as props

#### Still Stuck?

Try checking out the solution files [here](https://github.com/nashville-software-school/Vue-Workshop/tree/main/projects/scoreboard)
