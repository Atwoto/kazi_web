import { Language } from "./translations";

// Language mapping for browser languages and country codes
const LANGUAGE_MAP: { [key: string]: Language } = {
  // English
  'en': 'en',
  'en-US': 'en',
  'en-GB': 'en',
  'en-CA': 'en',
  'en-AU': 'en',
  'en-NZ': 'en',
  'en-IE': 'en',
  'en-ZA': 'en',

  // Spanish
  'es': 'es',
  'es-ES': 'es',
  'es-MX': 'es',
  'es-AR': 'es',
  'es-CO': 'es',
  'es-PE': 'es',
  'es-VE': 'es',
  'es-CL': 'es',
  'es-EC': 'es',
  'es-GT': 'es',
  'es-CU': 'es',
  'es-BO': 'es',
  'es-HN': 'es',
  'es-PY': 'es',
  'es-UY': 'es',
  'es-DO': 'es',
  'es-CR': 'es',
  'es-PA': 'es',
  'es-NI': 'es',
  'es-SV': 'es',

  // Catalan
  'ca': 'ca',
  'ca-ES': 'ca',
  'ca-FR': 'ca', // Catalan in France
};

/**
 * Detects the user's preferred language based on browser settings
 * Priority: localStorage → Browser Language → IP Geolocation
 */
export async function detectLanguage(): Promise<Language> {
  // 1. Check if user has previously selected a language (localStorage)
  const savedLang = typeof window !== 'undefined'
    ? localStorage.getItem('kazi-lang')
    : null;

  if (savedLang && (savedLang === 'en' || savedLang === 'es' || savedLang === 'ca')) {
    return savedLang;
  }

  // 2. Detect from browser language (Accept-Language header)
  const browserLang = detectFromBrowser();
  if (browserLang) {
    return browserLang;
  }

  // 3. Detect from IP geolocation (optional, fallback)
  try {
    const geoLang = await detectFromGeolocation();
    if (geoLang) {
      return geoLang;
    }
  } catch (error) {
    console.log('Geolocation detection failed:', error);
  }

  // 4. Default to English
  return 'en';
}

/**
 * Detect language from browser's Accept-Language header
 */
function detectFromBrowser(): Language | null {
  if (typeof window === 'undefined') return null;

  const browserLang = navigator.language || (navigator as any).languages?.[0];

  if (!browserLang) return null;

  // Check exact match first
  if (LANGUAGE_MAP[browserLang]) {
    return LANGUAGE_MAP[browserLang];
  }

  // Check language code without region (e.g., 'en-US' -> 'en')
  const langCode = browserLang.split('-')[0].toLowerCase();
  if (LANGUAGE_MAP[langCode]) {
    return LANGUAGE_MAP[langCode];
  }

  return null;
}

/**
 * Detect language from IP geolocation
 * Uses ipapi.co (free tier: 1000 requests/month)
 */
async function detectFromGeolocation(): Promise<Language | null> {
  if (typeof window === 'undefined') return null;

  try {
    // Use ipapi.co for geolocation (no API key required for basic usage)
    const response = await fetch('https://ipapi.co/json/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Geolocation service unavailable');
    }

    const data = await response.json();

    // If from Spain, prefer Catalan, otherwise Spanish
    if (data.country_code === 'ES') {
      return 'ca'; // Catalan for Spain
    }

    // Spanish-speaking countries
    const spanishSpeakingCountries = [
      'MX', 'AR', 'CO', 'PE', 'VE', 'CL', 'EC', 'GT', 'CU', 'BO',
      'HN', 'PY', 'UY', 'DO', 'CR', 'PA', 'NI', 'SV', 'ES', 'GQ',
      'PY', 'UY'
    ];

    if (spanishSpeakingCountries.includes(data.country_code)) {
      return 'es';
    }

    // Default to English for other countries
    return 'en';
  } catch (error) {
    console.warn('IP geolocation failed:', error);
    return null;
  }
}

/**
 * Check if a language code is supported
 */
export function isSupportedLanguage(lang: string): lang is Language {
  return lang === 'en' || lang === 'es' || lang === 'ca';
}

/**
 * Get user's browser language preference
 */
export function getBrowserLanguages(): string[] {
  if (typeof window === 'undefined') return [];

  const lang = navigator.language;
  const languages = (navigator as any).languages || [lang];

  return languages.filter(Boolean);
}
