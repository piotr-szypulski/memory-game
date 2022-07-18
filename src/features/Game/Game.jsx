import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Board from '@features/Board';
import GameOverModal from '@features/GameOverModal';
import Spinner from '@components/Spinner';
import Modal from '@components/Modal';
import { gameStart, GAME_STATE } from './Game.duck';
import { fetchBoard } from '../Board/Board.duck';

export default function Game() {
  const { gameState } = useSelector((state) => state.game);
  const dispatch = useDispatch();

  const handleStartGameClick = useCallback(() => {
    dispatch(gameStart());
  }, [dispatch]);

  const handleRetryClick = useCallback(() => {
    dispatch(fetchBoard());
  }, [dispatch]);

  return (
    <>
      {gameState === GAME_STATE.LOADING && (
        <Spinner />
      )}

      {gameState === GAME_STATE.ERROR && (
        <Modal clickCallback={handleRetryClick}>
          OOPS, CONNECTION ISSUE, CLICK ANYWHERE TO TRY AGAIN!
        </Modal>
      )}

      {gameState === GAME_STATE.IDLE && (
        <Modal clickCallback={handleStartGameClick}>
          CLICK ANYWHERE TO BEGIN!
        </Modal>
      )}

      {gameState === GAME_STATE.GAMEOVER && (
        <GameOverModal clickCallback={handleRetryClick} />
      )}

      <Board />
    </>
  );
}
