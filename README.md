# LinkedOut
A replication of the popular LinkedIn social media website created using React and Firebase.

## Core Features
- User login with Google authentication
- Create and read posts made by other users
- Attach an image to a posts
- Delete posts

## Known Issues
- User profile picture will occasionally not render correctly
- App is not responsive at all screen resolutions (currently stable at 1920x1080)

## How To Run Locally:
1. Clone repository with ```git clone https://github.com/RaymoZou/linked-out.git```
2. Install dependencies with ```npm install```
3. Navigate to `src` directory and create a `firebaseConfig.js` file that exports the following object. This information can be found in your Firebase project dashboard.
 ```
export const firebaseConfig = {
  apiKey: {YOUR_API_KEY_HERE},
  authDomain: {AUTH_DOMAIN},
  projectId: {PROJECT_ID},
  storageBucket: {STORAGE_BUCKET},
  messagingSenderId: {ID},
  appId: {YOUR_APP_ID_HERE}
};

```

## Images
![preview 1](https://i.imgur.com/fqHO7R4.png)
![preview 2](https://i.imgur.com/4PtVmys.png)


## Live Preview
Feel free to check it out [here](https://linked-out-raymozou.vercel.app/)! 


