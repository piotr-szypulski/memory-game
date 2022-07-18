import {
  createAsyncThunk, createListenerMiddleware, createSlice, isAnyOf,
} from '@reduxjs/toolkit';
import * as pokemonApi from '@services/pokemon.api';
import config from '@config';
import { generateBoard } from './Board.utilities';

const NAME = 'board';

/**
 * INITIAL STATE
 */
export const initialState = {
  cardBackImage: null,
  cardFlips: 0,
  cards: [],
  paused: false,
};

// THUNKS

export const fetchBoard = createAsyncThunk(
  `${NAME}/fetchImages`,
  async () => {
    const board = await pokemonApi.fetchPokemon();
    return board;
  },
);

// REDUCERS

const reducers = {
  /**
   * Compare currently flipped cards. If the cards have the same image mark them as solved, if not
   * flip them face down again.
   *
   * @param {*} state
   * @param {*} action.payload.previousFlippedCardIndex - index of prviously flipped card
   * @param {*} action.payload.flippedCardIndex - index of card that triggered this action
   */
  compareCards(state, action) {
    const previousFlippedCard = state.cards[action.payload.previousFlippedCardIndex];
    const flippedCard = state.cards[action.payload.flippedCardIndex];

    /**
     * Image urls are unique, suitable for comparison
     */
    if (flippedCard.imageUrl === previousFlippedCard.imageUrl) {
      state.cards[action.payload.flippedCardIndex].solved = true;
      state.cards[action.payload.previousFlippedCardIndex].solved = true;
    } else {
      state.cards[action.payload.flippedCardIndex].flipped = false;
      state.cards[action.payload.previousFlippedCardIndex].flipped = false;
    }
  },

  /**
   * Flip the card and increase the number of flips.
   *
   * @param {*} state
   * @param {*} action.payload.index - index of the card that triggered the action
   */
  flipCard(state, action) {
    state.cards[action.payload.index].flipped = true;
    state.cardFlips += 1;
  },

  /**
   * Block user interaction during card animations
   * @param {*} state
   */
  freezeBoard(state) {
    state.paused = true;
  },

  /**
   * Allow user to continue flipping cards
   * @param {*} state
   */
  unfreezeBoard(state) {
    state.paused = false;
  },
};

const extraReducers = (builder) => {
  builder
    /**
     * Fetch images for the cards. Errors are handled by game observers.
     */
    .addCase(fetchBoard.fulfilled, (state, action) => {
      state.cardBackImage = action.payload.cardBackImageUrl;
      state.cards = generateBoard({ imageUrls: action.payload.cardFaceImageUrls });
      state.cardFlips = 0;
    });
};

const boardSlice = createSlice({
  name: NAME, initialState, reducers, extraReducers,
});
export const {
  compareCards, flipCard, freezeBoard, unfreezeBoard,
} = boardSlice.actions;
export default boardSlice;

// MIDDLEWARE

export const cardFlipObserver = createListenerMiddleware();

/**
 * Card flip observer listens for when the card is being flipped by the player and triggers
 * effect on predicate that it's the second card clicked. It will trigger delayed action to
 * compare the cards.
 */
cardFlipObserver
  .startListening({
    effect: async (action, listenerApi) => {
      const previousFlippedCardIndex = listenerApi.getOriginalState()
        .board.cards.map((card) => card.flipped && !card.solved).indexOf(true);

      listenerApi.dispatch(freezeBoard());

      await listenerApi.delay(config.durationOfTwoCardsFlipped);

      listenerApi.dispatch(compareCards({
        previousFlippedCardIndex,
        flippedCardIndex: action.payload.index,
      }));

      listenerApi.dispatch(unfreezeBoard());
    },
    predicate: (action, currentState, previousState) => {
      const playerFlippedCard = isAnyOf(flipCard)(action);
      const previousFlippedCard = previousState.board.cards
        .find((card) => card.flipped && !card.solved);

      return playerFlippedCard && previousFlippedCard;
    },
  });
