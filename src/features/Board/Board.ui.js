import styled, { css } from 'styled-components';

export const CardContainer = styled.button`
  cursor: ${({ flipped }) => (flipped ? 'default' : 'pointer')};
  position: relative;
  transform-style: preserve-3d;
  transition: transform 1s;
  transform: rotateY(180deg);

  ${({ flipped }) => flipped && css`
    transform: rotateY(0deg);
  `}

  /**
  * Rows and columns calculations are needed to force flex-wrap to always display even grid,
  * this would be easier to achieve using css grid, but flexbox was a requirement for the task.
  */
  width: ${({ rows, theme }) => `calc(100% / ${rows} - ${theme.cardSpacing + ((2 * theme.cardSpacing) / rows)}px)`};
  height: ${({ columns, theme }) => `calc(100% / ${columns} - ${theme.cardSpacing}px)`};
`;

const Card = styled.div`
  backface-visibility: hidden;
  border: ${({ theme }) => theme.cardBorder};
  border-radius: ${({ theme }) => theme.cardBorderRadius};
  box-shadow: ${({ theme }) => theme.cardShadow};
  height: 100%;
  image-rendering: pixelated;
  position: absolute;
  width: 100%;
`;

export const CardFace = styled(Card)`
  background:
    ${({ imageUrl }) => `url(${imageUrl})`}
    center / contain
    no-repeat,
    ${({ theme }) => theme.cardBackground};
`;

export const CardBack = styled(Card)`
  background:
    ${({ theme }) => theme.cardBackground}
    center / contain;
  position: relative;
  transform: rotateY(180deg);

  /* Pokeball */
  ::before {
    background:
      ${({ imageUrl }) => `url(${imageUrl})`}
      center / 70%
      no-repeat;

    content: '';
    filter: hue-rotate(346deg);
    height: 100%;
    image-rendering: pixelated;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }
`;

export const Board = styled.div`
  background-color: ${({ theme }) => theme.boardBackground};
  cursor: ${({ paused }) => (paused ? 'wait' : null)};
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.cardSpacing}px;
  height: 100%;
  justify-content: center;
  padding: ${({ theme }) => theme.cardSpacing}px 0;
  perspective: 1000px;
  position: relative;
  width: 100%;

  div {
    cursor: ${({ paused }) => (paused ? 'wait' : null)};
  }
`;
