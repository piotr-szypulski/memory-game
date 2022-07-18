import { configureStore } from '@reduxjs/toolkit';
import boardSlice, { cardFlipObserver } from '@features/Board/Board.duck';
import gameSlice, { gameStateObserver } from '@features/Game/Game.duck';

const reducer = {
  board: boardSlice.reducer,
  game: gameSlice.reducer,
};

const middleware = (getDefaultMiddleware) => getDefaultMiddleware()
  .prepend(
    cardFlipObserver.middleware,
    gameStateObserver.middleware,
  );

export const setupStore = (preloadedState) => configureStore({
  initialState: {},
  reducer,
  middleware,
  preloadedState,
});

export default setupStore();
