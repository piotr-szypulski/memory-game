import React from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { render } from '@testing-library/react';
import { setupStore } from '@store/Store';

export function triggerResize({ height, width }) {
  window.innerHeight = height;
  window.innerWidth = width;

  window.dispatchEvent(new Event('resize'));
}

export function renderWithProvider(
  view,
  { preloadedState = {}, store = setupStore(preloadedState), ...renderOptions } = {},
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>{children}</Provider>
    );
  }

  Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return { store, ...render(view, { wrapper: Wrapper, ...renderOptions }) };
}
