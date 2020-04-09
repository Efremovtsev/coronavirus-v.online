import React from 'react';
import { Provider } from 'react-redux';
import createReduxStore from '@src/reducers';
import rootSaga from '@src/sagas';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import theme from '@src/theme';

import Router from '@src/router';
import CssBaseline from '@material-ui/core/CssBaseline';

const store = createReduxStore();
store.runSaga(rootSaga);

function App() {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Router />
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
