import boardSlice, {
  compareCards, flipCard, freezeBoard, initialState, unfreezeBoard,
} from '@features/Board/Board.duck';

describe('boardSlice', () => {
  test('should return initial state', () => {
    expect(boardSlice.reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  test('should solve cards if the same', () => {
    const state = {
      cards: [
        {
          imageUrl: 'same',
          flipped: true,
          solved: false,
        },
        {
          imageUrl: 'same',
          flipped: true,
          solved: false,
        },
      ],
    };

    const expectedState = {
      cards: [
        {
          imageUrl: 'same',
          flipped: true,
          solved: true,
        },
        {
          imageUrl: 'same',
          flipped: true,
          solved: true,
        },
      ],
    };

    const comparison = compareCards({ previousFlippedCardIndex: 0, flippedCardIndex: 1 });
    expect(boardSlice.reducer(state, comparison)).toEqual(expectedState);
  });

  test('should unflip cards if different', () => {
    const state = {
      cards: [
        {
          imageUrl: 'one',
          flipped: true,
          solved: false,
        },
        {
          imageUrl: 'two',
          flipped: true,
          solved: false,
        },
      ],
    };

    const expectedState = {
      cards: [
        {
          imageUrl: 'one',
          flipped: false,
          solved: false,
        },
        {
          imageUrl: 'two',
          flipped: false,
          solved: false,
        },
      ],
    };

    const comparison = compareCards({ previousFlippedCardIndex: 0, flippedCardIndex: 1 });
    expect(boardSlice.reducer(state, comparison)).toEqual(expectedState);
  });

  test('should flip a card', () => {
    const state = {
      cardFlips: 0,
      cards: [
        {
          flipped: false,
        },
      ],
    };

    const expectedState = {
      cardFlips: 1,
      cards: [
        {
          flipped: true,
        },
      ],
    };

    expect(boardSlice.reducer(state, flipCard({ index: 0 }))).toEqual(expectedState);
  });

  test('should freeze board', () => {
    const state = {
      paused: false,
    };

    const expectedState = {
      paused: true,
    };

    expect(boardSlice.reducer(state, freezeBoard())).toEqual(expectedState);
  });

  test('should unfreeze board', () => {
    const state = {
      paused: true,
    };

    const expectedState = {
      paused: false,
    };

    expect(boardSlice.reducer(state, unfreezeBoard())).toEqual(expectedState);
  });
});
