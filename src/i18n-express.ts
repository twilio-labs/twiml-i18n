// Copyright (c) 2024 Twilio Inc.

import i18next, { InitOptions } from "i18next";
import { Request, Response, NextFunction } from "express";
import { getCountry } from "./helper";
import { LocalizedRequest } from "..";

const i18nMiddleware: (
  defaultConfig: InitOptions,
) => (request: Request, _: Response, next: NextFunction) => void = (
  defaultConfig,
) => {
  return (request, _, next): void => {
    const req = request as LocalizedRequest;
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
