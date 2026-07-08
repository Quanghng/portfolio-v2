import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import translations from '@i18n/translations';

// Theme and i18n are kept in separate contexts so that toggling the color
// theme does not re-render i18n consumers (and vice-versa). This prevents the
// nav links from re-animating/flickering when only the theme changes.
const ThemeContext = createContext({ theme: 'dark', toggleTheme: () => {} });
const I18nContext = createContext({ lang: 'en', toggleLang: () => {}, t: key => key });

export const useTheme = () => useContext(ThemeContext);
export const useI18n = () => useContext(I18nContext);

const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');
  const [lang, setLang] = useState('en');

  // Sync from the values set pre-paint (data-theme attribute) and localStorage.
  useEffect(() => {
    if (typeof document !== 'undefined' && document.documentElement.dataset.theme) {
      setTheme(document.documentElement.dataset.theme);
    }
    if (typeof window !== 'undefined') {
      const storedLang = window.localStorage.getItem('lang');
      if (storedLang) {
        setLang(storedLang);
      }
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      if (typeof document !== 'undefined') {
        document.documentElement.dataset.theme = next;
        window.localStorage.setItem('theme', next);
      }
      return next;
    });
  }, []);

  const toggleLang = useCallback(() => {
    setLang(prev => {
      const next = prev === 'en' ? 'fr' : 'en';
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('lang', next);
      }
      return next;
    });
  }, []);

  const themeValue = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  const i18nValue = useMemo(() => {
    const t = key => {
      const dict = translations[lang] || translations.en;
      return dict[key] || translations.en[key] || key;
    };
    return { lang, toggleLang, t };
  }, [lang, toggleLang]);

  return (
    <ThemeContext.Provider value={themeValue}>
      <I18nContext.Provider value={i18nValue}>{children}</I18nContext.Provider>
    </ThemeContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
