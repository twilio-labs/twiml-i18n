import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { twiml } from "twilio";
import i18n, { LocalizedRequest } from "../src/i18n-express";
import en from "./locale/en.json";
import de from "./locale/de.json";

const server = express();
const port = process.env.PORT || 3000;

server.use(bodyParser.urlencoded({ extended: false }));

server.post(
  "/webhook",
  // @ts-ignore
  i18n({
    fallbackLng: "en",
    resources: {
      en,
      de,
    },
  }),
  async (request: LocalizedRequest, reply: Response) => {
    const twimlResponse = new twiml.MessagingResponse();
    twimlResponse.message(request.t("hello"));
    twimlResponse.message(
      request.t("placeholder", { number: request.body.From }),
    );
    reply.type("text/xml");
    reply.send(twimlResponse.toString());
  },
);

const running = server.listen({ port }, (err?: Error) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.info(`Server started on ${port}`);
});

export default running;
