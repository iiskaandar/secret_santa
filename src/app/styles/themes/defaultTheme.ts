import baseStyled, { ThemedStyledInterface } from 'styled-components';
import { createMuiTheme } from '@material-ui/core/styles';

export const defaultTheme = {
  colors: {
    dark: '#222',
    light: '#fff',
    green: '#080',
    red: '#f00',
    black: '#000',
    violet: '#db7093',
    darkViolet: '#512B37',
    brown: '#996B61',
    gray: '#9D9DB9',
    lightGray: '#E9EBF1',
    nude: '#EEDDDC',
    peach: '#F2C39C',
  },
};

export const materialTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#165B33',
      dark: defaultTheme.colors.green,
    },
    secondary: {
      main: '#BB2528',
    },
  },
});

export type Theme = typeof defaultTheme;
export const styled = baseStyled as ThemedStyledInterface<Theme>;
