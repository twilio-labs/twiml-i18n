const express = require("express");
const bodyParser = require("body-parser");
const twilio = require("twilio");
const twimlI18n = require("@twilio-labs/twiml-i18n");
const en = require("./locale/en.json");
const de = require("./locale/de.json");

const server = express();
const port = process.env.PORT || 3000;

server.use(bodyParser.urlencoded({ extended: false }));

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

server.listen({ port }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.info(`Server started on ${port}`);
});
