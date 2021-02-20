# Build a Nashville Geocaching App

For this project, you'll need to use Vue Router, Firebase, [Leaflet](https://leafletjs.com/), and optionally Vuex to create a map-focused SPA that shows geocaches around Nashville. The app will allow users to register geocaches they've hidden and ones they've found

[What is Geocaching?](https://www.youtube.com/watch?v=xE-zMPhiAi0)

[**View a Demo**](https://nss-vue-geonash.web.app/)

## Part 1

1. On the home route of the application, use the [Leaflet](https://leafletjs.com/) and [Vue Leaflet](https://vue2-leaflet.netlify.app/) libraries to display a map centered on Nashville. **Hint**: The lat/long center of Nashville is 36.1627°, -86.7816° and the zoom level of `13` is a good spot to keep the entire city in the bounds of your screen

## Part 2

1. Allow users to sign in via Google auth
1. Authenticated users should have access to a `/hide` route. The `/hide` route should show a form where users can register a new hidden geocache. The form should have the following fields:
   - A text field capturing for the title of the geocache
   - 2 text fields capturing the latitude and longitude values of the geocache
   - A dropdown to select the difficulty rating (options should be "Easy", "Moderate", and "Difficult")
   - A textarea to capture the description of the geocache
1. Submitting the form should save the record to the Firestore database. The record should also capture the ID and name of the user who created it. After submitting the form, the user should be redirected to the map view
1. **Optional Challenge** - Add validation to the form so that users can not submit coordinates outside a 50 mile radius from the center of Nashville

## Part 3

1. Update the map view to add [Markers](https://vue2-leaflet.netlify.app/components/LMarker.html#demo) for each of the hidden geocaches
1. When the user clicks a marker, display a [Popup](https://vue2-leaflet.netlify.app/components/LPopup.html#demo) which shows the details of the geocache. The details should include:
   - The geocache title
   - The user who hid it
   - The lat/long coordinates
   - The difficulty
   - A link to view the details (built in the next step)

## Part 4

1. Create a route for `/geocache/:id` to show the details of a given geocache. This view should include:
   - - The geocache title
   - The user who hid it
   - The lat/long coordinates
   - The difficulty
   - The description of the cache
1. If the current user is authenticated, the view should also include a button with the text `I FOUND THIS`. Clicking this button should launch a modal where users can enter the date they found the cache and a message they'd like to add to the log. Submitting this form should save a record to that geocache's Logs. In addition to the date and message, the saved record should also include the user's ID, name, and photoURL (these are all given to you by Google when a user signs in). **HINT**: It's recommended that you use a [subcollection](https://firebase.google.com/docs/firestore/data-model#subcollections) to store Logs in Firestore where each geocache document has a `Logs` subcollection.

## Part 5

1. Add the list of Logs to the geocache details page so we can see all the users who have found the cache. Each list item should include:
   - The photo of the user
   - The name of the user
   - The date they found it
   - The message they left
1. **Optional Challenge** - The application should try to get the current location of the user when they first enter the app. When viewing the details of a geocache, the view should also display the distance in miles the user is from the cache

## Part 6 (optional)

1. Add a navigation guard on the `/hide` route so that it is only accessible to authenticated users
1. Lazy load the `/hide` route so that its code is not in the main bundle

# Tips

There is no Code-by-Numbers for this project so here are some tips to help you get started:

- Create a firebase project, add Google auth, and create a Firestore database
- Decide if you want to use Vuex. It's not required and this application could be built without it. It would be recommended if you want more experience using it
- Plan in advance how you'd like to structure your data in Firestore. It's recommend that you have a `geocaches` collection and each document has a `logs` subcollection
- If your Leaflet markers are not showing on your map, try [this fix](https://vue2-leaflet.netlify.app/quickstart/#marker-icons-are-missing) in your `main.js` file

#### Still Stuck?

Try checking out the solution files [here](https://github.com/NSS-Vue-Workshop/Geo-Nash)
