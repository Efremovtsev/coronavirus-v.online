import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontSize: 16,
    body1: {
      fontSize: 18,
    },
  },

  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          position: 'relative',
          maxWidth: '90rem',
          margin: '0 auto',
          padding: 0,
          font:
            // eslint-disable-next-line max-len
            '300 16px/1.5 "Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif',
          color: '#d3ddef',
          backgroundColor: '#21252b',
        },
      },
    },
    MuiTooltip: {
      tooltip: {
        fontSize: 12,
      },
    },
  },

  palette: {
    // primary: {
    //   main: '#20C997',
    // },
    // gray: {
    //   main: '#877F7F',
    // },
  },

  MuiTypography: {
    root: {
      whiteSpace: 'pre-wrap',
    },
  },
});

export default theme;
