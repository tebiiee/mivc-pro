'use client'

import React from 'react';
import { LanguageCode } from '../types/cv';

interface LanguageToggleProps {
  currentLanguage: LanguageCode;
  onLanguageChange: (language: LanguageCode) => void;
  disabled?: boolean;
}

export function LanguageToggle({ 
  currentLanguage, 
  onLanguageChange, 
  disabled = false 
}: LanguageToggleProps) {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium text-gray-700">Idioma:</span>
      <div className="relative inline-flex bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => onLanguageChange('spanish')}
          disabled={disabled}
          className={`
            px-3 py-1 text-sm font-medium rounded-md transition-all duration-200
            ${currentLanguage === 'spanish'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          🇪🇸 Español
        </button>
        <button
          onClick={() => onLanguageChange('english')}
          disabled={disabled}
          className={`
            px-3 py-1 text-sm font-medium rounded-md transition-all duration-200
            ${currentLanguage === 'english'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          🇺🇸 English
        </button>
      </div>
    </div>
  );
}
