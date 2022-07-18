import React, { memo } from 'react';
import PropTypes from 'prop-types';

import * as ui from './Modal.ui';

function Modal({ children, clickCallback }) {
  return (
    <ui.ModalOverlay onClick={clickCallback}>
      <ui.Modal>
        {children}
      </ui.Modal>
    </ui.ModalOverlay>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  clickCallback: PropTypes.func.isRequired,
};

export default memo(Modal);
