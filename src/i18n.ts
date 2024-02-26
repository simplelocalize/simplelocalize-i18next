import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import {initReactI18next} from 'react-i18next'
import axios from "axios";

const isProductionCode = process.env.NODE_ENV === 'production';
const fallbackLanguage = 'en'

const projectToken = "XXXXXXXXXXXXXX"; // YOUR PROJECT TOKEN
const apiKey = "XXXXXXXXXXXXXX"; // YOUR API KEY

const apiBaseUrl = "https://api.simplelocalize.io/api";
const cdnBaseUrl = "https://cdn.simplelocalize.io";
const environment = "_latest"; // or "_production"
const loadPath = `${cdnBaseUrl}/${projectToken}/${environment}/{{lng}}`;
const loadPathWithNamespaces = `${cdnBaseUrl}/${projectToken}/${environment}/{{lng}}/{{ns}}`;
const configuration = {
    headers: {
        'X-SimpleLocalize-Token': apiKey
    }
};

const createTranslationKeys = async (requestBody: any) => axios.post(`${apiBaseUrl}/v1/translation-keys/bulk`, requestBody, configuration)
const updateTranslations = async (requestBody: any) => axios.patch(`${apiBaseUrl}/v2/translations/bulk`, requestBody, configuration)

const missing: any[] = [];
const saveMissing = async () => {
    if (missing.length === 0 || isProductionCode) {
        return;
    }
    console.info(`Saving ${missing.length} missing translation keys`);

    const translationKeys = missing.map((element) => ({
        key: element.translationKey,
        namespace: element.namespace,
    }));

    await createTranslationKeys({translationKeys})
        .catch((error) => console.error(`Error during creating translation keys: ${error}`));

    const translations = missing.map((element) => ({
        key: element.translationKey,
        namespace: element.namespace,
        language: element.language,
        text: element.fallbackValue,
    }));
    await updateTranslations({translations})
        .catch((error) => console.error(`Error during updating translations: ${error}`));
    missing.length = 0;
}

setInterval(async () => {
    await saveMissing();
}, 30_000); // decreasing this value may lead to the API rate limit

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
        saveMissing: !isProductionCode,
        defaultNS: "", // you can set default namespace here
        missingKeyHandler: async (languages, namespace, translationKey, fallbackValue) => {
            console.debug(`[${namespace}][${translationKey}] not available in Translation Hosting`);
            missing.push({
                translationKey: translationKey,
                namespace: namespace ?? "",
                language: languages[0] ?? fallbackLanguage,
                fallbackValue: fallbackValue ?? ""
            });
        }
    })


export default i18n;