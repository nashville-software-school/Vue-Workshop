# Build an Event Dashboard with the SeatGeek API

For this project, build an event dashboard that uses the [SeatGeek API](https://platform.seatgeek.com/) to receive data on theater, music, and sporting events in a given date range. Manage your state inside a store so it's easily shared across components.

[**View a Demo**](https://nss-vue-event-dashboard.web.app/)

> **NOTE**: Before you begin, you'll need to [register for a SeatGeek API key](https://seatgeek.com/?next=%2Faccount%2Fdevelop#login). Take a moment and explore the [documentation on querying events](https://platform.seatgeek.com/#events). To give you a hint, the URL you will be hitting will look something like this:
>
> ```
> https://api.seatgeek.com/2/events?taxonomies.name=${eventType}&client_id=${API_KEY}&venue.city=nashville&venue.state=TN&sort=score.desc&datetime_local.gte=${startDate}&datetime_local.lte=${endDate}
> ```

## Part 1

1. Add a form control to allow users to select a date range with a starting date and ending date. (**NOTE**: The calendar date picker in the demo application is from an older component library. If you would like to use PrimeVue to build this app, you might substitute this control for just 2 date inputs)
1. Add a header to the top of the screen with the title `Event Dashboard` (or whatever you'd like to call your app). Add a subheader that shows a nicely formatted version of the date range the user has selected. For example: `Sat Mar 13 - Sat Mar 27`

## Part 2

1. As soon as the user selects or changes the date range, make a call to the SeatGeek API to get a list of all Sporting events that are happening in Nashville in the given date range. Display a tile/card above the date controls that shows just the number of sporting events happening. Give the tile/card a header with the text "Sporting Events"

> **HINT**: The SeatGeek taxonomy name for sporting event is "sports"

## Part 3

1. Add another tile/card next to Sporting Events that will show Theater Events. As soon as the user selects or changes the date range, make a call to the SeatGeek API to get a list of all Theater events in Nashville in the given date range. Show the total number of events in the card and add a header with the text "Theater Events"

> **HINT 1**: The SeatGeek taxonomy name for theater performances is "theater"
> **HINT 2**: You'll need to make separate calls to SeatGeek for each type of data

## Part 4

1. Create a third tile/card with the same functionality as the previous two but with Concerts/Musical events

> **HINT**: The SeatGeek taxonomy for concerts is "concert"

## Part 5

1. Display a table showing rows for the top 3 most popular Sporting events. Each row should show the event's name, venue, date, and price range (if available)
1. Make the price range values clickable and link to the SeatGeek listing for the event

> **HINT**: Adding the param `&sort=score.desc` to the SeatGeek URL will ensure that the results are returned in order of popularity. To get the 3 most popular, simply take the first 3 records in the data that's returned

## Part 6

1. Recreate Step 5 for Theater events and Concerts
