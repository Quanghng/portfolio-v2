/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import React from 'react';
import AppProvider from '@context/AppContext';

// eslint-disable-next-line react/prop-types, react/display-name
export const wrapRootElement = ({ element }) => <AppProvider>{element}</AppProvider>;

// Set the color theme before paint to avoid a flash of the wrong theme (FOUC).
export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents([
    <script
      key="theme-init"
      dangerouslySetInnerHTML={{
        __html: `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`,
      }}
    />,
  ]);
};
