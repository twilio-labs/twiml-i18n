import { InitOptions, TFunction } from "i18next";
import {
  RequestHandler as FastifyRequestHandler,
  FastifyRequest,
} from "fastify";
import { RequestHandler as ExpressRequestHandler, Request } from "express";

export function i18n(options: i18nOptions): ExpressRequestHandler;
export function i18nPlugin(
  options: i18nOptions,
  callback: Callback,
): FastifyRequestHandler;
export interface LocalizedRequest extends Request {
  t: TFunction;
}
