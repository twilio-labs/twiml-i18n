import Fastify, {
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
} from "fastify";

import { twiml } from "twilio";
import { i18nPlugin } from "@twilio-labs/twiml-i18n";
import en from "./locale/en.json";
import de from "./locale/de.json";

const server: FastifyInstance = Fastify({
  logger: false,
});

const port: number = +(process.env.PORT || "") || 3000;

server.register(require("@fastify/formbody"));
server.register(i18nPlugin, {
  fallbackLng: "en",
  resources: {
    en,
    de,
  },
});

//@ts-ignore
server.post(
  "/webhook",
  async (
    request: FastifyRequest<{
      Body: {
        From?: string;
      };
    }>,
    reply: FastifyReply,
  ) => {
    const twimlResponse = new twiml.MessagingResponse();
    twimlResponse.message(request.t("hello"));
    twimlResponse.message(
      request.t("placeholder", { number: request.body.From }),
    );

    reply.type("text/xml").send(twimlResponse.toString());
  },
);

server.listen({ port }, function (err) {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  console.info(`Server started on ${port}`);
});
