# Events Platform

This repo is for a Community Cinema website which allows 'staff' users to create events, and 'non-staff' users to attend events.

Events can be free, paid for, or pay as you want.

When a user has signed up to attend an event, they can add events to a Google calendar.

## Setting up your repo

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

### Creating a dotenv file

You now need to create a file called ".env" at the root of your folder in which you will store environmental variables.

For now, it can be left empty.

### Getting an OMDb Key

OMDb is an API that contains information on movies, used by this project to provide users with information about the movie being shown at an event.

Follow the steps on OMBDb to generate an API key: https://www.omdbapi.com/apikey.aspx

Once you have receive the email with an API key, enter the following into your .env file, replacing ****** with your given key:

```
VITE_OMDB_KEY=******
```