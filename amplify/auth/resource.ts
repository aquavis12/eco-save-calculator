import { defineAuth } from "@aws-amplify/backend";
import { I18n } from 'aws-amplify/utils';
import { translations } from '@aws-amplify/ui-react';

export const auth = defineAuth({
  loginWith: {
    email: {
      // Email verification setup with a code for account confirmation
      verificationEmailStyle: "CODE",  // Use a code for email verification
      verificationEmailSubject: "Welcome to E-Waste Recycling!",
      verificationEmailBody: (createCode) => `Use this code to confirm your account and start your recycling journey: ${createCode()}`, 

      // User invitation email that contains temporary login credentials
      userInvitation: {
        emailSubject: "Welcome to E-Waste Recycling!",
        emailBody: (user, code) =>
          `We're thrilled to have you as part of our E-Waste Recycling community! You can now log in using your username: ${user()} and temporary password: ${code()}. Please ensure you change your password upon first login.`,
      },
    },
  },

  // Correctly define user attributes without the 'type' property
  userAttributes: {
    email: undefined,  // Standard email attribute
    preferredUsername: undefined,   // Standard name attribute
  },
});

// Configure Amplify translations
I18n.putVocabularies(translations);

// Set default language
I18n.setLanguage('en'); // You can change this dynamically later based on user choice.

// Add additional translations for different languages
I18n.putVocabularies({
  en: {
    'Sign In': 'Sign In',
    'Sign Up': 'Sign Up',
  },
  fr: {
    'Sign In': 'Se connecter',
    'Sign Up': "S'inscrire",
  },
  es: {
    'Sign In': 'Registrarse',
    'Sign Up': 'Regístrate',
  },
  hi: {
    'Sign In': 'साइन इन करें',
    'Sign Up': 'साइन अप करें',
  },
});
