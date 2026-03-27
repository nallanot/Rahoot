import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

i18next
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    lng: 'en', // default language
    fallbackLng: 'en', // fallback language
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    resources: {
      en: {
        translation: {
          // Your translation keys here
          "welcome": "Welcome",
          "goodbye": "Goodbye"
        }
      },
      // Add other languages here
    }
  });

export default i18next;