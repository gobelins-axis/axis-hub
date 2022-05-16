# 💻 Axis Hub

## Environments

| Name           | URL                                                   |
| -------------- | ----------------------------------------------------- |
| **Staging**    | [axis-hub.netlify.app](https://axis-hub.netlify.app/) |
| **Production** | To be defined                                         |

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## Firebase

### Environment variables

You will need the firebase api key to run the project.
Please refer to the team to get the API Key and create an .env file looking like this:

```bash
FIREBASE_API_KEY=XXX
```

### Config

Edit the firebase configuration in **@/plugins/firebase.js**.

### Usage

The firebase services are injected to the vue application, you can access them using **this.$firebase**

## Deploy Guide

### Staging

Pushing on main trigger a build on [netlify](https://app.netlify.com/).

### Production

To be defined
