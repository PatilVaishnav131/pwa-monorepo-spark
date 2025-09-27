import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: "Welcome to Sahara",
      mentalHealth: "Your Mental Health Matters",
      startChat: "Start Talking Now",
      takeAssessment: "Take Assessment",
      crisisHelp: "Need Immediate Help?",
      crisisHotline: "Crisis Hotline: 988"
    }
  },
  es: {
    translation: {
      welcome: "Bienvenido a Sahara",
      mentalHealth: "Tu Salud Mental Importa",
      startChat: "Comienza a Hablar Ahora",
      takeAssessment: "Realizar Evaluación",
      crisisHelp: "¿Necesitas Ayuda Inmediata?",
      crisisHotline: "Línea de Crisis: 988"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;