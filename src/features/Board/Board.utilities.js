import { generateRandomNumberFromRange } from '@utilities/random';
import config from '@config';

/**
 * Creates card objects with provided images, duplicates each card and shuffles them.
 *
 * @param {*} imageUrls - image urls
 * @returns - Array of card objects
 */
export function generateBoard({ imageUrls }) {
  const range = config.numberOfPairs * 2;
  const numberPicker = generateRandomNumberFromRange({ range });

  return imageUrls.reduce((result, imageUrl) => {
    result[numberPicker.next().value] = {
      imageUrl,
      flipped: false,
      solved: false,
    };

    result[numberPicker.next().value] = {
      imageUrl,
      flipped: false,
      solved: false,
    };

    return result;
  }, []);
}

export function calculateColumns({ numberOfCards, windowAspectRatio }) {
  if (windowAspectRatio < 1) {
    for (let i = 1; i <= numberOfCards; i += 1) {
      if (numberOfCards % i === 0 && numberOfCards / i / i <= windowAspectRatio) {
        return i;
      }
    }
  }

  for (let i = numberOfCards; i >= 1; i -= 1) {
    if (numberOfCards % i === 0 && numberOfCards / i / i >= windowAspectRatio) {
      return i;
    }
  }

  return 1;
}
