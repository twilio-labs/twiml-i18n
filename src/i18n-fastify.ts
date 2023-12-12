import i18next, { InitOptions, TFunction } from "i18next";
import { getCountry } from "./helper";
import {
  FastifyPluginCallback,
  FastifyRequest,
  FastifyReply,
  HookHandlerDoneFunction,
} from "fastify";
import fp from "fastify-plugin";

// using declaration merging, add your plugin props to the appropriate fastify interfaces
// if prop type is defined here, the value will be typechecked when you call decorate{,Request,Reply}
declare module "fastify" {
  interface FastifyRequest {
    t: TFunction;
  }
}

interface BodyType {
  From?: string;
}

// define options
export interface MyPluginOptions extends InitOptions {}

// define plugin using callbacks
const myPluginCallback: FastifyPluginCallback<MyPluginOptions> = (
  fastify,
  options,
  done,
) => {
  fastify.decorateRequest("t");

  // @ts-ignore Related to this issue? https://github.com/fastify/fastify/issues/4960
  fastify.addHook(
    "preHandler",
    (
      req: FastifyRequest<{ Body: BodyType }>,
      _: FastifyReply,
      next: HookHandlerDoneFunction,
    ) => {
      let lng;
      if (req.body.From) {
        lng = getCountry(req.body.From)?.languages[0];
      }
      i18next.createInstance(
        {
          lng,
          ...options,
        },
        (err, translate) => {
          if (err) {
            console.error(err);
          } else {
            req.t = translate;
          }
          next();
        },
      );
    },
  );

  done();
};

export default fp(myPluginCallback, "4.x");
