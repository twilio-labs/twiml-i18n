# TwiML I18n Middleware

`twiml-i18n` is a lightweight middleware designed to facilitate the internationalization (i18n) of Twilio Markup Language (TwiML) responses for Twilio webhook endpoints. The middleware leverages i18next to provide translation capabilities based on the country associated with the incoming phone number.

It supports [Express.js](https://expressjs.com/) and [Fastify](https://fastify.io/).

## Features

- Automatic language detection based on the country code of the caller's phone number.
- Integrates cleanly with Express
- Built on top of [`i18next`](https://github.com/i18next/i18next) and supports translation features including namespaces, variables, and pluralization.

## Installation

To install the middleware, run:

```
npm install @twilio-labs/twiml-i18n
# or
yarn add @twilio-labs/twiml-i18n
```

## Usage

First, set up your internationalization resources and configure the `i18n` middleware for use with your Express application.

```js
// Require dependencies
const express = require("express");
const bodyParser = require("body-parser");
const twilio = require("twilio");
const twimlI18n = require("@twilio-labs/twiml-i18n");
const en = require("./locale/en.json");
const de = require("./locale/de.json");

// Initialize express
const server = express();
const port = process.env.PORT || 3000;
server.use(bodyParser.urlencoded({ extended: false }));

// Handle incoming messages
server.post(
  "/webhook",
  twimlI18n.i18n({
    fallbackLng: "en",
    resources: {
      en,
      de,
    },
  }),
  async (request, reply) => {
    const req = request;
    const twimlResponse = new twilio.twiml.MessagingResponse();
    twimlResponse.message(req.t("hello"));
    twimlResponse.message(req.t("placeholder", { number: request.body.From }));
    reply.type("text/xml");
    reply.send(twimlResponse.toString());
  },
);

// Start server
server.listen({ port }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.info(`Server started on ${port}`);
});
```

> There's also a [typescript example](./examples/express-server.ts).

Make sure you have your translation files, e.g., `en.json`, `de.json`, `es.json`, which contain the translations for each language.

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

> There's also a [typescript example](./examples/fastify-server.ts).

## Other Frameworks?

Are you interested in using `twiml-i18n` but you work with another framework? Feel free to open an [issue](https://github.com/twilio-labs/twilio-i18n/issues/new) to talk about it.

## License

This project is open-source and available under the MIT License.

## Contributions

Contributions are welcome! Please ensure you follow the project's coding conventions and submit your pull requests for review.
