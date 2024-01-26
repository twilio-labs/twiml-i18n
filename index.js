const expressMiddleware = require("./dist/src/i18n-express");
const fastifyPlugin = require("./dist/src/i18n-fastify");

module.exports = {
  default: expressMiddleware.default,
  i18n: expressMiddleware.default,
  i18nPlugin: fastifyPlugin.default,
};
