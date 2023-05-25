import { defineRule, configure } from "vee-validate";
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
  generateMessage: ({ rule }) => {
    const messages = {
      required: "must be filled",
      min: `at least  3 symbols.`,
      max: `use less than 15 symbols.`,
      numeric: "must be number",
      email: "must be email",
    };

    return messages[rule.name] || "Invalid field.";
  },
});
