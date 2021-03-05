# Deploy to Firebase

- Go to the [firebase website](https://console.firebase.google.com/), create a new project, give it a name and click continue

- From the root of your Vue app, run

  ```sh
  firebase init
  ```

  and select the following options

|            Prompt            |                  Answer                  |
| :--------------------------: | :--------------------------------------: |
|    Firebase CLI features     |                 Hosting                  |
|       Select an option       |         Use an existing project          |
|    Select default project    | _Whatever project name you just created_ |
| What is the public directory |                   dist                   |
|      Configure as a SPA      |                    y                     |
|     Automatic build/deploy   |                   n                      |

- Run `npm run build`
- Run `firebase deploy`
- Profit

### Firestore (optional)

If you're deploying a project using firestore (the firebase database), you will at some point need to update the "rules" to your database. The "rules" are a configuration that specifies who can read and write to the database. You can modify these for you project on the firebase website. For all the applications you build in this course, the following configuration is sufficient

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read;
      allow write: if request.auth != null;
    }
  }
}
```
