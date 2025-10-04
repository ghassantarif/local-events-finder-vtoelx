
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18nManager } from 'react-native';
import { I18n } from 'i18n-js';

// Translation files
const translations = {
  en: {
    // Navigation
    home: 'Home',
    profile: 'Profile',
    events: 'Events',
    
    // Home Screen
    localEvents: 'Local Events',
    noEventsFound: 'No events found',
    noEventsText: 'Try adjusting your filters to see more events in your area.',
    categories: 'Categories',
    distance: 'Distance',
    
    // Categories
    all: 'All',
    music: 'Music',
    sports: 'Sports',
    arts: 'Arts',
    food: 'Food',
    technology: 'Technology',
    business: 'Business',
    health: 'Health',
    education: 'Education',
    entertainment: 'Entertainment',
    
    // Distance options
    '5km': '5 km',
    '10km': '10 km',
    '20km': '20 km',
    '50km': '50 km',
    anyDistance: 'Any distance',
    
    // Event Details
    eventDetails: 'Event Details',
    dateTime: 'Date & Time',
    location: 'Location',
    price: 'Price',
    organizer: 'Organizer',
    kmAway: 'km away',
    saveEvent: 'Save Event',
    addToCalendar: 'Add to Calendar',
    eventNotFound: 'Event Not Found',
    eventNotFoundText: 'The event you\'re looking for doesn\'t exist or has been removed.',
    goBack: 'Go Back',
    mapsNotSupported: '📍 Maps are not supported in Natively right now, but you can copy the address above to your preferred maps app.',
    
    // Profile Screen
    myEvents: 'My Events',
    savedEvents: 'Saved Events',
    attendedEvents: 'Attended Events',
    myReviews: 'My Reviews',
    preferences: 'Preferences',
    notificationSettings: 'Notification Settings',
    locationSettings: 'Location Settings',
    categoryPreferences: 'Category Preferences',
    languageSettings: 'Language Settings',
    account: 'Account',
    editProfile: 'Edit Profile',
    privacySettings: 'Privacy Settings',
    helpSupport: 'Help & Support',
    signOut: 'Sign Out',
    version: 'Version',
    
    // Language Selection
    selectLanguage: 'Select Language',
    english: 'English',
    hebrew: 'עברית',
    languageChanged: 'Language changed successfully',
    
    // Common
    free: 'Free',
    at: 'at',
    cancel: 'Cancel',
    save: 'Save',
    done: 'Done',
  },
  he: {
    // Navigation
    home: 'בית',
    profile: 'פרופיל',
    events: 'אירועים',
    
    // Home Screen
    localEvents: 'אירועים מקומיים',
    noEventsFound: 'לא נמצאו אירועים',
    noEventsText: 'נסה לשנות את המסננים כדי לראות יותר אירועים באזור שלך.',
    categories: 'קטגוריות',
    distance: 'מרחק',
    
    // Categories
    all: 'הכל',
    music: 'מוזיקה',
    sports: 'ספורט',
    arts: 'אמנות',
    food: 'אוכל',
    technology: 'טכנולוגיה',
    business: 'עסקים',
    health: 'בריאות',
    education: 'חינוך',
    entertainment: 'בידור',
    
    // Distance options
    '5km': '5 ק"מ',
    '10km': '10 ק"מ',
    '20km': '20 ק"מ',
    '50km': '50 ק"מ',
    anyDistance: 'כל מרחק',
    
    // Event Details
    eventDetails: 'פרטי האירוע',
    dateTime: 'תאריך ושעה',
    location: 'מיקום',
    price: 'מחיר',
    organizer: 'מארגן',
    kmAway: 'ק"מ משם',
    saveEvent: 'שמור אירוע',
    addToCalendar: 'הוסף ליומן',
    eventNotFound: 'האירוע לא נמצא',
    eventNotFoundText: 'האירוע שאתה מחפש לא קיים או הוסר.',
    goBack: 'חזור',
    mapsNotSupported: '📍 מפות לא נתמכות ב-Natively כרגע, אבל אתה יכול להעתיק את הכתובת למעלה לאפליקציית המפות המועדפת עליך.',
    
    // Profile Screen
    myEvents: 'האירועים שלי',
    savedEvents: 'אירועים שמורים',
    attendedEvents: 'אירועים שהשתתפתי',
    myReviews: 'הביקורות שלי',
    preferences: 'העדפות',
    notificationSettings: 'הגדרות התראות',
    locationSettings: 'הגדרות מיקום',
    categoryPreferences: 'העדפות קטגוריה',
    languageSettings: 'הגדרות שפה',
    account: 'חשבון',
    editProfile: 'ערוך פרופיל',
    privacySettings: 'הגדרות פרטיות',
    helpSupport: 'עזרה ותמיכה',
    signOut: 'התנתק',
    version: 'גרסה',
    
    // Language Selection
    selectLanguage: 'בחר שפה',
    english: 'English',
    hebrew: 'עברית',
    languageChanged: 'השפה שונתה בהצלחה',
    
    // Common
    free: 'חינם',
    at: 'ב',
    cancel: 'ביטול',
    save: 'שמור',
    done: 'סיום',
  },
};

type Language = 'en' | 'he';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => Promise<void>;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = '@app_language';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setCurrentLanguage] = useState<Language>('en');
  const [i18n] = useState(() => {
    const i18nInstance = new I18n(translations);
    i18nInstance.defaultLocale = 'en';
    i18nInstance.locale = 'en';
    return i18nInstance;
  });

  const isRTL = language === 'he';

  useEffect(() => {
    loadSavedLanguage();
  }, []);

  useEffect(() => {
    i18n.locale = language;
    // Note: In a real app, you might want to restart the app for RTL changes
    // For now, we'll just update the locale
    console.log('Language changed to:', language, 'RTL:', isRTL);
  }, [language, i18n, isRTL]);

  const loadSavedLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'he')) {
        setCurrentLanguage(savedLanguage as Language);
      }
    } catch (error) {
      console.log('Error loading saved language:', error);
    }
  };

  const setLanguage = async (lang: Language) => {
    try {
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
      setCurrentLanguage(lang);
    } catch (error) {
      console.log('Error saving language:', error);
    }
  };

  const t = (key: string): string => {
    return i18n.t(key);
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
    isRTL,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
