import i18next, { InitOptions, TFunction } from "i18next";
import { Request, Response, NextFunction } from "express";
import { getCountry } from "./helper";

const i18nMiddleware: (
  defaultConfig: InitOptions,
) => (req: LocalizedRequest, _: Response, next: NextFunction) => void = 
(  defaultConfig) => {
  return (req, _, next): void => {
    let lng;
    if (req.body.From) {
      lng = getCountry(req.body.From)?.languages[0];
    }
    i18next.createInstance(
      {
        lng,
        ...defaultConfig,
      },
      (err, translate) => {
        if (err) {
          console.error(err);
        }
        req.t = translate;
        next();
      },
    );
  };
};

export default i18nMiddleware;

// Define interface for custom request type that includes the t function from i18n
export interface LocalizedRequest extends Request {
  t: TFunction;
}
