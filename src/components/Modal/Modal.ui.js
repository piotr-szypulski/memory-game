import styled from 'styled-components';

export const ModalOverlay = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.modalOverlay};
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: ${({ theme }) => theme.layers.modal};
`;

export const Modal = styled.div`
  background-image: ${({ theme }) => theme.cardBackground};
  border-radius: ${({ theme }) => theme.cardBorderRadius};
  box-shadow: ${({ theme }) => theme.cardShadow};
  color: ${({ theme }) => theme.defaultFontColor};
  display: flex;
  flex-direction: column;
  font-size: ${({ theme }) => theme.modalFontSize};
  gap: 12px;
  padding: 50px;
`;
