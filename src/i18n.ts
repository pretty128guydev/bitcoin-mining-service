import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enJson from "./locale/en.json";
import ruJson from "./locale/ru.json";
import frJson from "./locale/fr.json";
import itJson from "./locale/it.json";
import jaJson from "./locale/ja.json";
import deJson from "./locale/de.json";
import viJson from "./locale/vi.json";
import ptJson from "./locale/pt.json";
import trJson from "./locale/tr.json";
import esJson from "./locale/es.json";
import faJson from "./locale/fa.json";
import arJson from "./locale/ar.json";
import idJson from "./locale/id.json";
import elJson from "./locale/el.json";
import msJson from "./locale/ms.json";
import thJson from "./locale/th.json";
import laJson from "./locale/la.json";
import hiJson from "./locale/hi.json";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    debug: false,
    fallbackLng: 'en', // Corrected this line
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: enJson,
      fr: frJson,
      it: itJson,
      ja: jaJson,
      de: deJson,
      ru: ruJson,
      vi: viJson,
      pt: ptJson,
      tr: trJson,
      es: esJson,
      fa: faJson,
      ar: arJson,
      id: idJson,
      el: elJson,
      ms: msJson,
      th: thJson,
      la: laJson,
      hi: hiJson,
    },
  });

export default i18n;
