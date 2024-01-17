// Copyright (c) 2024 Twilio Inc.

import { ICountry, countries } from "countries-list";
import { PhoneNumberUtil } from "google-libphonenumber";

const phoneUtil = PhoneNumberUtil.getInstance();

export function getCountry(phone: string): ICountry | undefined {
  const number = phoneUtil.parseAndKeepRawInput(phone.replace("whatsapp:", ""));
  return Object.values(countries).find((country) => {
    const countryCode = number.getCountryCode();
    if (countryCode) {
      return country.phone.includes(countryCode);
    }
  });
}
