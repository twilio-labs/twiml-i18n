# TwiML i18n Support Middleware

TwiML i18n Middleware is a lightweight Express.js middleware designed to facilitate internationalization (i18n) of Twilio Markup Language (TwiML) responses for Twilio webhook endpoints. The middleware leverages i18next to provide translation capabilities based on the country associated with the incoming phone number.

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
import express, { Request, Response } from "express";
import { twiml } from "twilio";
import bodyParser from "body-parser";
import i18nMiddleware from "twiml-i18n-middleware";

// Initialize Express
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// Setup i18n middleware
app.use(
  i18nMiddleware({
    fallbackLng: "en",
    resources: {
      en: { translation: require("./locale/en.json") },
      es: { translation: require("./locale/es.json") },
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

## License

This project is open-source and available under the Apach 2.0 License.

## Contributions

Contributions are welcome! Please ensure you follow the project's coding conventions and submit your pull requests for review.
