import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Modal from '@components/Modal';
import { getCompletionTimeString, getHighestScores } from './GameOverModal.utilities';
import * as ui from './GameOverModal.ui';

export default function GameOverModal({ clickCallback }) {
  const { completionTime, startTime } = useSelector((state) => state.game);
  const cardFlips = useSelector((state) => state.board.cardFlips);

  const completionTimeString = useMemo(() => getCompletionTimeString({
    startTime,
    completionTime,
  }), [startTime, completionTime]);

  return (
    <Modal clickCallback={clickCallback}>
      {`CONGRATULATIONS! IT TOOK YOU ${completionTimeString} AND ${cardFlips} CARD FLIPS TO FINISH!`}
      <ui.Scores>
        LEADERBOARD
        {getHighestScores().map((score, index) => (

          /* eslint-disable react/no-array-index-key */ // Safe on static list
          <ui.Score key={index}>{`${score.gameDuration} with ${score.cardFlips} flips`}</ui.Score>
        ))}
      </ui.Scores>
      CLICK ANYWHERE TO TRY AGAIN!
    </Modal>
  );
}

GameOverModal.propTypes = {
  clickCallback: PropTypes.func.isRequired,
};
