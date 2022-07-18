import { formatDuration, intervalToDuration } from 'date-fns';
import * as duration from 'duration-fns';
import config from '@config';

const STORAGE_KEY = 'games';

export const getHighestScores = () => JSON.parse(localStorage.getItem(STORAGE_KEY))
  /**
   * Deserialize duration string from storage
   */
  .map((game) => ({
    ...game,
    gameDurationObject: duration.parse(game.duration),
  }))
  /**
   * Convert game durations to seconds and sort descending
   */
  .sort((gameA, gameB) => {
    const secondsA = duration.toSeconds(gameA.gameDurationObject);
    const secondsB = duration.toSeconds(gameB.gameDurationObject);
    return secondsA > secondsB;
  })
  /**
   * Convert sorted durations to human readable format
   */
  .map((game) => ({
    cardFlips: game.cardFlips,
    gameDuration: formatDuration(game.gameDurationObject),
  }))
  .slice(0, config.numberOfHighestScores);

export const getCompletionTimeString = ({ startTime, completionTime }) => formatDuration(
  intervalToDuration({
    start: new Date(startTime),
    end: new Date(completionTime),
  }),
).toUpperCase();
