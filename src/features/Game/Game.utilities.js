import { formatISODuration, intervalToDuration } from 'date-fns';

const STORAGE_KEY = 'games';

export const updateLocalStorage = ({ completionTime, cardFlips, startTime }) => {
  const serializedDuration = formatISODuration(intervalToDuration({
    start: new Date(startTime),
    end: new Date(completionTime),
  }));

  const previousGames = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  localStorage.setItem(STORAGE_KEY, JSON.stringify([
    ...previousGames,
    {
      cardFlips,
      duration: serializedDuration,
    },
  ]));
};

export default updateLocalStorage;
