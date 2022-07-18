import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import config from '@config';
import { fetchBoard, flipCard } from './Board.duck';
import { useGridAspectRatio } from './Board.hooks';

import * as ui from './Board.ui';

export default function Board() {
  const dispatch = useDispatch();
  const { cardBackImage, cards, paused } = useSelector((state) => state.board);

  const { columns, rows } = useGridAspectRatio({ numberOfCards: config.numberOfPairs * 2 });

  useEffect(() => {
    dispatch(fetchBoard());
  }, [dispatch]);

  const handleCardClick = ({ flipped, index }) => () => {
    if (!flipped && !paused) {
      dispatch(flipCard({ index }));
    }
  };

  /* eslint-disable react/no-array-index-key */ // Array won't be modified so index as key is safe
  return (
    <ui.Board paused={paused}>
      {cards.length !== 0 && cards.map(({ flipped, imageUrl }, index) => (
        <ui.CardContainer
          columns={columns}
          flipped={flipped}
          key={`${imageUrl}${index}`}
          onClick={handleCardClick({ flipped, index })}
          role="button"
          rows={rows}
        >
          <ui.CardFace imageUrl={imageUrl} />
          <ui.CardBack imageUrl={cardBackImage} />
        </ui.CardContainer>
      ))}
    </ui.Board>
  );
}
