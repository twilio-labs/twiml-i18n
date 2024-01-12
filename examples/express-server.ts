import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { twiml } from "twilio";
import i18n from "../src/i18n-express";
import en from "./locale/en.json";
import de from "./locale/de.json";
import { LocalizedRequest } from "..";

const server = express();
const port = process.env.PORT || 3000;

server.use(bodyParser.urlencoded({ extended: false }));

server.post(
  "/webhook",
  i18n({
    fallbackLng: "en",
    resources: {
      en,
      de,
    },
  }),
  async (request: Request, reply: Response) => {
    const req = request as LocalizedRequest;
    const twimlResponse = new twiml.MessagingResponse();
    twimlResponse.message(req.t("hello"));
    twimlResponse.message(req.t("placeholder", { number: request.body.From }));
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
