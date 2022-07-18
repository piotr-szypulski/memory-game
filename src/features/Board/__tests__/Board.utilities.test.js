import { calculateColumns, generateBoard } from '../Board.utilities';

const mockData = [
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png',
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png',
];

jest.mock('@config', () => ({
  numberOfPairs: 3,
}));

describe('generateBoard', () => {
  const cards = generateBoard({ imageUrls: mockData });

  test('cards number is doubled', () => {
    expect(cards).toHaveLength(mockData.length * 2);
  });

  test('half of the cards are duplicates', () => {
    expect(new Set(cards.map((card) => card.imageUrl)).size).toBe(mockData.length);
  });

  test('each card object has properties set correctly', () => {
    cards.forEach((card) => expect(card).toEqual(expect.objectContaining({
      flipped: false,
      solved: false,
    })));
  });
});

describe('calculateColumns', () => {
  test('correct number of columns for regular screen', () => {
    const columns = calculateColumns({ numberOfCards: 24, windowAspectRatio: 16 / 9 });
    expect(columns).toBe(3);
  });

  test('correct number of columns for potrait mode', () => {
    const columns = calculateColumns({ numberOfCards: 24, windowAspectRatio: 9 / 16 });
    expect(columns).toBe(8);
  });

  test('correct number of columns for edge case horizontal', () => {
    const columns = calculateColumns({ numberOfCards: 24, windowAspectRatio: 24 / 1 });
    expect(columns).toBe(1);
  });

  test('correct number of columns for edge case vertical', () => {
    const columns = calculateColumns({ numberOfCards: 24, windowAspectRatio: 1 / 24 });
    expect(columns).toBe(24);
  });
});
