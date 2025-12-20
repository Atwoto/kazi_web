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
  'ca-AD': 'ca', // Catalan in Andorra
};

// Catalan-speaking regions in Spain (by region/city)
const CATALAN_REGIONS = [
  'catalonia', 'catalunya', 'cataluña',
  'barcelona', 'girona', 'lleida', 'tarragona',
  'valencia', 'valenciana', 'alicante', 'castellon', 'castelló',
  'balearic', 'balears', 'mallorca', 'menorca', 'ibiza', 'eivissa',
];

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

  // 2. Detect from browser language (Accept-Language header) - most reliable
  const browserLang = detectFromBrowser();
  if (browserLang) {
    return browserLang;
  }

  // 3. Detect from IP geolocation (fallback)
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

  // Check all browser languages in order of preference
  const languages = (navigator as any).languages || [navigator.language];
  
  for (const browserLang of languages) {
    if (!browserLang) continue;
    
    // Check exact match first
    if (LANGUAGE_MAP[browserLang]) {
      return LANGUAGE_MAP[browserLang];
    }

    // Check language code without region (e.g., 'en-US' -> 'en')
    const langCode = browserLang.split('-')[0].toLowerCase();
    if (LANGUAGE_MAP[langCode]) {
      return LANGUAGE_MAP[langCode];
    }
  }

  return null;
}

/**
 * Detect language from IP geolocation
 * Uses multiple services with fallback
 */
async function detectFromGeolocation(): Promise<Language | null> {
  if (typeof window === 'undefined') return null;

  // Try primary service first
  try {
    const result = await tryIpApi();
    if (result) return result;
  } catch (e) {
    console.log('Primary geolocation failed, trying fallback...');
  }

  // Try fallback service
  try {
    const result = await tryIpWhoIs();
    if (result) return result;
  } catch (e) {
    console.log('Fallback geolocation also failed');
  }

  return null;
}

/**
 * Primary geolocation service: ipapi.co
 */
async function tryIpApi(): Promise<Language | null> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

  try {
    const response = await fetch('https://ipapi.co/json/', {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) throw new Error('Service unavailable');

    const data = await response.json();
    return determineLanguageFromGeo(data.country_code, data.region, data.city);
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

/**
 * Fallback geolocation service: ipwhois.app
 */
async function tryIpWhoIs(): Promise<Language | null> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch('https://ipwho.is/', {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) throw new Error('Service unavailable');

    const data = await response.json();
    return determineLanguageFromGeo(data.country_code, data.region, data.city);
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

/**
 * Determine language based on country, region, and city
 */
function determineLanguageFromGeo(
  countryCode: string,
  region?: string,
  city?: string
): Language {
  // Andorra - Catalan is official language
  if (countryCode === 'AD') {
    return 'ca';
  }

  // Spain - check if in Catalan-speaking region
  if (countryCode === 'ES') {
    const locationStr = `${region || ''} ${city || ''}`.toLowerCase();
    
    // Check if in Catalan-speaking region
    const isCatalanRegion = CATALAN_REGIONS.some(r => locationStr.includes(r));
    
    if (isCatalanRegion) {
      return 'ca';
    }
    
    // Rest of Spain - Spanish
    return 'es';
  }

  // Spanish-speaking countries in Latin America
  const spanishSpeakingCountries = [
    'MX', 'AR', 'CO', 'PE', 'VE', 'CL', 'EC', 'GT', 'CU', 'BO',
    'HN', 'PY', 'UY', 'DO', 'CR', 'PA', 'NI', 'SV', 'GQ', 'PR'
  ];

  if (spanishSpeakingCountries.includes(countryCode)) {
    return 'es';
  }

  // Default to English for other countries
  return 'en';
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
