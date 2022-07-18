import {
  createListenerMiddleware, createSlice, isAnyOf, isFulfilled, isPending, isRejected,
} from '@reduxjs/toolkit';
import { compareCards, fetchBoard } from '@features/Board/Board.duck';
import { updateLocalStorage } from './Game.utilities';

const NAME = 'game';

export const GAME_STATE = {
  ERROR: 'ERROR',
  GAMEOVER: 'GAMEOVER',
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  STARTED: 'STARTED',
};

/**
 * INITIAL STATE
 */
const initialState = {
  completionTime: null,
  failedRequests: [],
  gameState: GAME_STATE.LOADING,
  pendingRequests: [],
  startTime: null,
};

/**
 * REDUCERS - Game State Management
 */
const reducers = {
  /**
   * Stop timer, update game state and store score in local storage
   *
   * @param {*} state
   * @param {number} action.payload.cardFlips - number of total card flips
   */
  gameOver(state, action) {
    const completionTime = new Date().toJSON();

    state.completionTime = completionTime;
    state.gameState = GAME_STATE.GAMEOVER;

    updateLocalStorage({
      completionTime,
      cardFlips: action.payload.cardFlips,
      startTime: state.startTime,
    });
  },

  /**
   * Start timer and update game state
   *
   * @param {*} state
   */
  gameStart(state) {
    state.startTime = new Date().toJSON();
    state.gameState = GAME_STATE.STARTED;
  },

  /**
   * Triggered whenever middleware catches any async action. Updates game state whenever new request
   * is made, one of the requests fails, or all requests are resolved.
   *
   * @param {*} state
   * @param {*} action.payload.requestAction - request action passed from middleware
   */
  updateGameState(state, action) {
    /**
     * If new request is pending, show loader
     */
    if (isPending(action.payload.requestAction)) {
      state.pendingRequests.push(action.payload.requestAction.meta.requestId);
      state.gameState = GAME_STATE.LOADING;
    }

    /**
     * If a request is fulfilled or rejected, remove it from pending requests list, if it was last
     * pending request update game state.
     */
    if (isFulfilled(action.payload.requestAction) || isRejected(action.payload.requestAction)) {
      const remainingPendingRequests = state.pendingRequests
        .filter((requestId) => requestId !== action.payload.requestAction.meta.requestId);

      if (remainingPendingRequests.length === 0) {
        state.gameState = GAME_STATE.IDLE;
      }

      state.pendingRequests = remainingPendingRequests;
    }

    /**
     * If a request gets rejected add it to failed requests list and update game state
     */
    if (isRejected(action.payload.requestAction)) {
      state.failedRequests.push(action.payload.requestAction.meta.requestId);
      state.gameState = GAME_STATE.ERROR;
    }
  },
};

const gameSlice = createSlice({ name: NAME, initialState, reducers });
export const { gameOver, gameStart, updateGameState } = gameSlice.actions;
export default gameSlice;

/**
 * MIDDLEWARE
 */
export const gameStateObserver = createListenerMiddleware();

/**
 * Observes all requests
 */
gameStateObserver
  .startListening({
    effect: (action, listenerApi) => {
      if (isPending(action) || isFulfilled(action) || isRejected(action)) {
        listenerApi.dispatch(updateGameState({ requestAction: action }));
      }
    },
    matcher: isAnyOf(fetchBoard), // ToDo: Not working
  });

/**
 * Observes if the game is completed
 */
gameStateObserver
  .startListening({
    actionCreator: compareCards,
    effect: (action, listenerApi) => {
      const { cardFlips, cards } = listenerApi.getState().board;

      if (cards.every((card) => card.solved)) {
        listenerApi.dispatch(gameOver({ cardFlips }));
      }
    },
  });
