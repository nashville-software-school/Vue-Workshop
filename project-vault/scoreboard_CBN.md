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

1. Create a new app using `vue create scoreboard`
1. Add a `team1` and `team2` object to the `App` component's `data`. Each object should have a property for `name` and `score`. The names can be "Team 1" and "Team 2" (or something else if you like) and the scores should both be initialized to zero
1. Create a `MatchupTitle` component which accepts 2 team objects as props
1. Have the `MatchupTitle` component dynamically display "Team 1 vs Team 2" by using the objects it received from `props`
1. Use the `<matchup-title>` component in `App` to put it towards the top of the view. Pass in the two team objects as props
1. Add a `ScoreCard` component and have it accept a `score` prop. Render the score in the template and add the two plus and minus buttons.
1. Add a method or methods to add to the button click events. These should emit an event to the parent that the score is being updated
1. Add two `<score-card>` components to `App` and pass in each team's score
1. Add event listeners to `<score-card>` to listen for the custom events you created in the previous step. This should be handled by incrementing or decrementing the team's score. Be sure to prevent a score below zero
1. In `MatchupTitle` create a CSS named `winning` which uses a different font color.
1. Conditionally add the `winning` class to the team name if they are leading
1. Create a `GameStatus` component for the subheader. It should accept two team objects as props. It should have a computed property called `gameLeaderDisplay` which should evaluate what the message should say. Render the message in the template
1. Use the `<game-status>` component in `App` and pass in the two team objects as props

#### Still Stuck?

Try checking out the solution files [here](https://github.com/NSS-Vue-Workshop/Scoreboard)
