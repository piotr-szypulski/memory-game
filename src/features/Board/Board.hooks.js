import useWindowSize from '@hooks/windowResize.hook';
import { calculateColumns } from './Board.utilities';

/**
 * Calculates card rows to columns ratio for the given screen size, so that the cards are as closer
 * to square shape as possible (picks card apsect ratio closest to 1)
 *
 * @param {*} numberOfCards - total number of cards
 * @returns - Object containing optimal column and row numbers for the board
 */
export function useGridAspectRatio({ numberOfCards, debounce }) {
  const { height, width } = useWindowSize({ debounce });

  const windowAspectRatio = width / height;

  const columns = calculateColumns({
    numberOfCards,
    windowAspectRatio,
  });

  return {
    columns,
    rows: numberOfCards / columns,
  };
}

export default useGridAspectRatio;
