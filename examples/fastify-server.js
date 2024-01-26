const Fastify = require("fastify");

const twilio = require("twilio");
const twimlI18n = require("@twilio-labs/twiml-i18n");
const en = require("./locale/en.json");
const de = require("./locale/de.json");
const server = Fastify({
  logger: false,
});

const port = +(process.env.PORT || "") || 3000;

server.register(require("@fastify/formbody"));
server.register(twimlI18n.i18nPlugin, {
  fallbackLng: "en",
  resources: {
    en,
    de,
  },
});

server.post("/webhook", async (request, reply) => {
  const twimlResponse = new twilio.twiml.MessagingResponse();
  twimlResponse.message(request.t("hello"));
  twimlResponse.message(
    request.t("placeholder", { number: request.body.From }),
  );

  reply.type("text/xml").send(twimlResponse.toString());
});

// Run the server!
server.listen({ port }, function (err) {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  console.info(`Server started on ${port}`);
});
