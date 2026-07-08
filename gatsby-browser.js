/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from 'react';
import AppProvider from '@context/AppContext';

// eslint-disable-next-line react/prop-types, react/display-name
export const wrapRootElement = ({ element }) => <AppProvider>{element}</AppProvider>;
