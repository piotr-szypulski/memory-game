import styled, { keyframes } from 'styled-components';

const spinnerSize = 64;

const ringRotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  left: calc(50% - ${spinnerSize / 2}px);
  position: fixed;
  top: calc(50% - ${spinnerSize / 2}px);
  z-index: ${({ theme }) => theme.layers.loader};

  div {
    animation: ${ringRotate} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border: ${spinnerSize / 8}px solid ${(props) => props.theme.spinnerColor};
    border-color: ${({ theme }) => theme.spinnerColor} transparent transparent transparent;
    border-radius: 50%;
    box-sizing: border-box;
    display: block;
    height: ${spinnerSize}px;
    position: absolute;
    width: ${spinnerSize}px;
  }

  div:nth-child(1) {
    animation-delay: -0.45s;
  }

  div:nth-child(2) {
    animation-delay: -0.3s;
  }

  div:nth-child(3) {
    animation-delay: -0.15s;
  }
`;

export default Spinner;
