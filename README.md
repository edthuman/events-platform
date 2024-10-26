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