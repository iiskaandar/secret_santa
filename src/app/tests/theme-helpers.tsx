import React from 'react';
import { injectIntl, IntlProvider } from 'react-intl';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '../styles/themes';

const translationsEn = require('@assets/i18n/en.json');
const everything = require('../../../mocked-server/everything.json');

export const articleMock = everything.articles[0];

/* eslint-disable react/display-name */
export const withProviders = (Component: any) => {
  const ComponentInjected = injectIntl(Component);

  return (props: any) => (
    <ThemeProvider theme={defaultTheme}>
      <IntlProvider locale="en" messages={translationsEn}>
        <ComponentInjected {...props} />
      </IntlProvider>
    </ThemeProvider>
  );
};

export const withAdditionalProperties = (additionalProps: any) => {
  return (Component: any) => {
    return (props: any) => <Component {...props} {...additionalProps} />;
  };
};
