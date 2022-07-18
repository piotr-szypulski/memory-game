import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import store from '@store/Store';
import Game from '@features/Game';

import theme from './theme';

import { CssReset, GlobalStyle } from './index.ui';

function App() {
  return (
    <Provider store={store}>
      <CssReset />
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Game />
      </ThemeProvider>
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
