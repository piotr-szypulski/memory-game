import styled from 'styled-components';

export const Scores = styled.div`
  counter-reset: score-counter;
`;

export const Score = styled.div`
  ::before {
    counter-increment: score-counter;
    content: counter(score-counter) '. ';
  }
`;
