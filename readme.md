# TwiML I18n Middleware

`twiml-i18n` is a lightweight middleware designed to facilitate the internationalization (i18n) of Twilio Markup Language (TwiML) responses for Twilio webhook endpoints. The middleware leverages i18next to provide translation capabilities based on the country associated with the incoming phone number.

It supports [Express.js](https://expressjs.com/) and [Fastify](https://fastify.io/).

## Features

- Automatic detection of language based on the caller's phone number country code.
- Integrates cleanly with Express
- Build on [`i18next`](https://github.com/i18next/i18next) and supports translation features, including namespaces, variables, and pluralization.

## Installation

To install the middleware, run:

```
npm install twiml-i18n-middleware
# or
yarn add twiml-i18n-middleware
```

## Usage

First, setup your internationalization resources and configure the `i18n` middleware for use with your Express application.

```js
// Require dependencies
const express = require("express"),
  bodyParser = require("body-parser"),
  { twiml } = require("twilio"),
  { i18n } = require("twiml-i18n");

// Initialize Express
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// Setup i18n middleware
app.use(
  i18n({
    fallbackLng: "en",
    resources: {
      en: require("./locale/en.json"),
      de: require("./locale/de.json"),
      // Add more languages as needed
    },
  }),
);

// Handle incoming messages
app.post("/webhook", async (req, res) => {
  const twimlResponse = new twiml.MessagingResponse();
  const localizedGreeting = req.t("greeting");
  twimlResponse.message(localizedGreeting);
  res.type("text/xml");
  res.send(twimlResponse.toString());
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

Ensure you have your translation files, e.g., `en.json`, `de.json`, `es.json`, containing the translations for each language.

Example content for `./locale/en.json`:

```json
{
  "greeting": "Hello, how can I help you?"
}
```

Or for Fastify:

```js
// Require dependencies
const Fastify = require("fastify"),
  { twiml } = require("twilio"),
  { i18nPlugin } = require("twiml-i18n");

// Initialize Fastify
const server = Fastify();

server.register(require("@fastify/formbody"));

// Setup i18n plugin
server.register(i18nPlugin, {
  fallbackLng: "en",
  resources: {
    en: require("./locale/en.json"),
    de: require("./locale/de.json"),
    // Add more languages as needed
  },
});

// Handle incoming messages
server.post("/webhook", async (req, res) => {
  const twimlResponse = new twiml.MessagingResponse();
  const localizedGreeting = req.t("hello");
  twimlResponse.message(localizedGreeting);
  res.type("text/xml");
  res.send(twimlResponse.toString());
});

// Start server
const port = process.env.PORT || 3000;
server.listen({ port }, function (err) {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  console.info(`Server started on ${port}`);
});
```

## Other Frameworks?

Are you interested in using `twiml-i18n` but you work with another framework? Feel free to open an [issue](https://github.com/twilio-labs/twilio-i18n/issues/new) to talk about it.

## License

This project is open-source and available under the MIT License.

## Contributions

Contributions are welcome! Please ensure you follow the project's coding conventions and submit your pull requests for review.
