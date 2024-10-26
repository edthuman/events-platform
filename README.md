# Events Platform

This repo is for a Community Cinema website which allows 'staff' users to create events, and 'non-staff' users to attend events.

Events can be free, paid for, or pay as you want.

When a user has signed up to attend an event, they can add events to a Google calendar.

## Copying the repo

To begin working on the repo, navigate in your shell to the directory where you wish to save it. Then download a copy of the repo using the command:

```
git clone https://github.com/edthuman/events-platform
```

You then need to install the relevant dependencies for the project, using command:

```
npm install
```

## Getting your secrets

### Creating a gitignore

Create a file called ".gitignore" at the root of your folder, in which you type (or copy and paste): 

```
.gitignore
node_modules
.env
```

This is a necessary step to prevent secrets from being shared.

### Creating a dotenv

You now need to create a file called ".env" at the root of your folder in which you will store environmental variables.

For now, it can be left empty.

### Getting an OMDb key

OMDb is an API that contains information on movies, used by this project to provide users with information about the movie being shown at an event.

Follow the steps on OMBDb to generate an API key: https://www.omdbapi.com/apikey.aspx

Once you have receive the email with an API key, enter the following into your .env file, replacing ****** with your given key:

```
VITE_OMDB_KEY="******"
```

### Getting Stripe keys

Stripe is an API being used to take payments for tickets by this project.

First create or log into an account on https://dashboard.stripe.com

Then follow the steps to create a business - if you are only testing the site, you do not need to input full business details, you can continue to use test mode and perform only test payments. You can always finish your business profile later to begin taking live payments.

You are now able to get your API keys. If you have fully filled in your business profile already, you will have 4 keys, 2 for live mode and 2 for test mode, it is up to you which set of keys you wish to use with the site.

You can find your keys on the API keys page - in the "Developers" tab. 

If you are struggling to find this page, search "api keys" in the search bar at the top of your page, and click the suggestion that says "Developers > API keys"

Here, under "Standard Keys", you should see a "Publishable Key", which should begin with "pk_". Copy this key and paste it into a new line in your .env file, replacing ****** with your key

```
VITE_STRIPE_PUBLISHABLE_KEY="******"
```

> [!NOTE]
> The ordering of variables in the .env file does not matter.

Go back to Stripe's API key page, and below your publishable key should be a "Secret Key" with a "Reveal test key". Press the Reveal test key button in order to copy your Secret Key. Then paste this into a new line of your .env file using the following formatting, replacing ****** with your secret key.

```
VITE_STRIPE_KEY="******"
```

> [!WARNING]
> This secret key must be kept secret, double check that ".env" is included in your gitignore to prevent this from being seen publicly.

### Setting up Firebase

The Firebase API allows the website to connect with two databases: a Firestore database which contains details of showings and their related users, and a Authentication database which is used to allows users to log into the website.

To begin, create an account with Firebase or log in to https://console.firebase.google.com

You can then click "Create Project" and name your project whatever you like.

Click the "Build" button on the left hand toolbar and select "Firestore Database", then "Create Database".

You do not need to add any events to your database yet, but you may if you wish.

Then, click the "Build" button again, and select "Authentication", then "Get Started". You can configure the settings however you wish. The hosted version of this repo is build to allow Email or Google login, but you can add further options as you please.

### Getting Firebase secrets

With Firebase set-up complete, click the "Project Overview" button with a home icon. Once there, click the "Add app" button, then select the web option.

Enter a name for your web app, and then the code segment shown under "Add Firebase SDK" will include your Firebase secrets in an object called firebaseConfig with the keys: apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId, appId, measurementId.

From these, you may ignore the databaseURL and measurementId values.

Copy and paste the other values into your .env file. Use the following structure, and replace the <variable names> with the values given on the Firebase website.

```
VITE_FIREBASE_KEY="<apiKey>"
VITE_FIREBASE_AUTH_DOMAIN="<authDomain>"
VITE_FIREBASE_PROJECT_ID="<projectId>"
VITE_FIREBASE_STORAGE_BUCKET="<storageBucket>"
VITE_FIREBASE_SENDER_ID="<messagingSenderId>"
VITE_FIREBASE_APP_ID="<appId>"
```

> [!NOTE]
> These secrets can be obtained at a later stage if needed. 
> Click the settings icon to the right of your "Project Overview" button, then select "Project Settings". You will be able to see the same code segment shown in the "Your Apps" section.

## Preview your website

You can see a live verison of your website as you make changes to your code by using the shell command:

```
npm run dev
```

And then visiting the link shown in your terminal.