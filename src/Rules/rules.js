import { defineRule, configure } from "vee-validate";
import { localize } from "@vee-validate/i18n";
import {
  min,
  max,
  numeric,
  required,
  alpha_num,
  confirmed,
  email,
} from "@vee-validate/rules";

defineRule("required", required);
defineRule("min", min);
defineRule("max", max);
defineRule("numeric", numeric);
defineRule("alpha_num", alpha_num);
defineRule("confirmed", confirmed);
defineRule("email", email);

configure({
  generateMessage: localize({
    en: {
      messages: {
        required: "This field is required",
        min: `at least  0:{min} symbols.`,
        max: `use less than 0:{max} symbols.`,
        numeric: "must be number",
        email: "must be email",
      },
    },
    ka: {
      messages: {
        required: "შევსება აუცილებელია",
        min: `მინიმუმ 0:{min} სიმბოლო.`,
        max: `0:{max} სიმბოლოზე ნაკლები.`,
        numeric: "მონაცემი უნდა იყოს რიცხვი",
        email: "გთხოვთ შეიყვანოთ იმეილი",
      },
    },
  }),
});
