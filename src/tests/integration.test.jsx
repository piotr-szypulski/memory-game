import React from 'react';
import { renderWithProvider } from '@tests/helpers';
import {
  fireEvent, getByText, screen, waitFor,
} from '@testing-library/react';
import pokemonApiMock from '@services/pokemon.api.mock';
import config from '@config';
import Game from '@features/Game';
import { ThemeProvider } from 'styled-components';
import theme from '../theme';

describe.only('INTEGRATION - GAME FLOW', () => {
  beforeAll(() => {
    pokemonApiMock.listen();
  });

  afterEach(() => pokemonApiMock.resetHandlers());

  afterAll(() => pokemonApiMock.close());

  test('gameplay', async () => {
    renderWithProvider(
      <ThemeProvider theme={theme}>
        <Game />
      </ThemeProvider>,
    );
    await waitFor(() => expect(screen.getAllByRole('button')).toHaveLength(config.numberOfPairs * 2));
    await waitFor(() => expect(screen.getByText('CLICK ANYWHERE TO BEGIN!')).toBeInTheDocument());

    fireEvent(
      getByText(document, 'CLICK ANYWHERE TO BEGIN!'),
      new MouseEvent('click'),
    );

    expect(screen.queryByText('CLICK ANYWHERE TO BEGIN!')).not.toBeNull();

    /**
     * REST OF THE FLOW ...
     */
  });
});
