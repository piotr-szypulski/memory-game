function fisherYatesShuffle({ array }) {
  for (let i = array.length - 1; i > 1; i -= 1) {
    const randomNumber = Math.floor(Math.random() * i);
    const randomValue = array[i];
    array[i] = array[randomNumber];
    array[randomNumber] = randomValue;
  }

  return array;
}

export function randomNumbersFromRange({ range, numberOfPicks }) {
  const array = Array.from(Array(range).keys());
  const shuffledArray = fisherYatesShuffle({ array });

  return shuffledArray.slice(0, numberOfPicks);
}

export function* generateRandomNumberFromRange({ range }) {
  const array = Array.from(Array(range).keys());
  const shuffledArray = fisherYatesShuffle({ array });

  while (array.length > 0) {
    yield shuffledArray.pop();
  }
}
