import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import {initReactI18next} from 'react-i18next'
import axios from "axios";

const fallbackLanguage = 'en'

const projectToken = "5e13e3019cff4dc6abe36009445f0883"; // YOUR PROJECT TOKEN
const apiKey = ""; // YOUR API KEY

const cdnBaseUrl = "https://cdn.simplelocalize.io";
const environment = "_latest"; // or "_production"
const loadPath = `${cdnBaseUrl}/${projectToken}/${environment}/{{lng}}`;
// const loadPathWithNamespaces = `${cdnBaseUrl}/${projectToken}/${environment}/{{lng}}/{{ns}}`;
const endpoint = `https://api.simplelocalize.io/api/v1/translations`;
const configuration = {
  headers: {
    'X-SimpleLocalize-Token': apiKey
  }
};

let translationKeyIds: string[] = [];

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: fallbackLanguage,
    backend: {
      loadPath: loadPath,
      //loadPath: loadPathWithNamespaces # uncomment if you use namespaces
    },
    saveMissing: true,
    missingKeyHandler: async (lngs, ns, key, fallbackValue) => {

      console.debug("Missing translation key", ns, key);
      const translationKeyId = `${ns}_${key}`;
      if (translationKeyIds.includes(translationKeyId)) {
        console.debug("Skipping translation key creation: " + key);
        return;
      }

      const requestBody = {
        content: [
          {
            key: key,
            //namespace: ns, # uncomment if you use namespaces
            language: fallbackLanguage,
            text: fallbackValue
          }
        ]
      }

      axios.post(endpoint, requestBody, configuration)
        .then(() => {
          console.debug("Create translation key: " + key);
          translationKeyIds.push(translationKeyId);
        })
        .catch(error => {
          if (error.response) {
            const status = error.response.status;
            if (status === 429) {
              console.warn(`Too many requests`);
            } else if (status === 403) {
              console.error(`Incorrect API Key`);
            } else if (status === 400) {
              console.error(`Incorrect request`, error.response.data);
            } else {
              console.error(`Request failed with ${status} code`, error.response.data);
            }
          }
        })
    }
  })


export default i18n;
