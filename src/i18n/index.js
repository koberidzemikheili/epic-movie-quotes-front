import { createI18n } from "vue-i18n";
import en from "./lang/en/index.js";
import ka from "./lang/ka/index.js";

const messages = {
  en,
  ka,
};
function getStartingLocale() {
  if (localStorage.getItem("last-locale")) {
    return localStorage.getItem("last-locale");
  }
  return "en";
}

const i18n = createI18n({
  locale: getStartingLocale(),
  fallbackLocale: "en",
  messages,
  legacy: false,
});

export default i18n;
