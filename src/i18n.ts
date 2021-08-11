import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import axios from "axios";

const fallbackLanguage = 'en'

const projectToken = "5e13e3019cff4dc6abe36009445f0883"; // YOUR PROJECT TOKEN
const apiKey = ""; // YOUR API KEY

const getTranslationsEndpoint = `https://cdn.simplelocalize.io/${projectToken}/_latest/{{lng}}`;
const addMissingTranslationsEndpoint = `https://api.simplelocalize.io/api/v1/translations`;

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use (initReactI18next)
  .init({
    fallbackLng: fallbackLanguage,
    backend: {
      loadPath: getTranslationsEndpoint
    },
    saveMissing: true,
    missingKeyHandler: (lngs, ns, key, fallbackValue) => {

      const configuration = {
        headers: {
          'X-SimpleLocalize-Token': apiKey
        }
      };

      const requestBody = {
        content: [
          {
            key: key,
            language: fallbackLanguage,
            text: fallbackValue
          }
        ]
      }
      axios.post(addMissingTranslationsEndpoint, requestBody, configuration)
    }
  })

export default i18n;
