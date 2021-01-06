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

- Run `npm run build`
- Run `firebase deploy`
- Profit
