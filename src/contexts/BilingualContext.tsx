'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import { BilingualCVResponse, LanguageCode } from '../types/cv';

interface BilingualContextType {
  currentLanguage: LanguageCode;
  setCurrentLanguage: (language: LanguageCode) => void;
  bilingualData: BilingualCVResponse | null;
  setBilingualData: (data: BilingualCVResponse | null) => void;
  getCurrentCV: () => any; // eslint-disable-line @typescript-eslint/no-explicit-any
  hasData: boolean;
}

const BilingualContext = createContext<BilingualContextType | undefined>(undefined);

const STORAGE_KEY = 'micv-bilingual-data';
const LANGUAGE_KEY = 'micv-current-language';

export function BilingualProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguageState] = useState<LanguageCode>('spanish');
  const [bilingualData, setBilingualDataState] = useState<BilingualCVResponse | null>(null);

  // Cargar datos del localStorage al inicializar
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      const savedLanguage = localStorage.getItem(LANGUAGE_KEY) as LanguageCode;
      
      if (savedData) {
        setBilingualDataState(JSON.parse(savedData));
      }
      
      if (savedLanguage && (savedLanguage === 'spanish' || savedLanguage === 'english')) {
        setCurrentLanguageState(savedLanguage);
      }
    } catch (error) {
      console.error('Error loading bilingual data from localStorage:', error);
    }
  }, []);

  // Función para cambiar idioma y persistir en localStorage
  const setCurrentLanguage = (language: LanguageCode) => {
    setCurrentLanguageState(language);
    localStorage.setItem(LANGUAGE_KEY, language);
  };

  // Función para guardar datos bilingües y persistir en localStorage
  const setBilingualData = (data: BilingualCVResponse | null) => {
    setBilingualDataState(data);
    if (data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  // Función para obtener el CV en el idioma actual
  const getCurrentCV = () => {
    if (!bilingualData) return null;
    return bilingualData[currentLanguage];
  };

  const hasData = bilingualData !== null;

  const value: BilingualContextType = {
    currentLanguage,
    setCurrentLanguage,
    bilingualData,
    setBilingualData,
    getCurrentCV,
    hasData,
  };

  return (
    <BilingualContext.Provider value={value}>
      {children}
    </BilingualContext.Provider>
  );
}

export function useBilingual() {
  const context = useContext(BilingualContext);
  if (context === undefined) {
    throw new Error('useBilingual must be used within a BilingualProvider');
  }
  return context;
}
