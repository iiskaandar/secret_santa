import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as MaterialThemeProvider } from '@material-ui/styles';

import { addLocaleData, IntlProvider } from 'react-intl';
import en from 'react-intl/locale-data/en';

import { defaultTheme, GlobalStyles, materialTheme } from '@styles/themes';
import { AppRoutes } from '@core/config/routes';

import '@assets/external-styles/main.css';
import 'antd/dist/antd.css';

import MainState from '@store/state';

const translationsEn = require('@assets/i18n/en.json');

addLocaleData([...en]);

interface Translations {
  en: any;
  [key: string]: any;
}

const translations: Translations = {
  en: translationsEn,
};

const locale = 'en';

ReactDOM.render(
  <IntlProvider locale={locale} messages={translations[locale]}>
    <ThemeProvider theme={defaultTheme}>
      <MaterialThemeProvider theme={materialTheme}>
        <MainState>
          <GlobalStyles />
          <AppRoutes />
        </MainState>
      </MaterialThemeProvider>
    </ThemeProvider>
  </IntlProvider>,
  document.getElementById('root'),
);
