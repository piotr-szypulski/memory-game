import React from 'react';
import PropTypes from 'prop-types';

const STEP = 1;

function Button({ handleClick, label }) {
  return (
    <button
      className="bg-green-700 hover:bg-green-600 text-white p-2 rounded m-2"
      onClick={handleClick}
      type="button"
    >
      {label}
    </button>
  );
}

export default function List() {
  const [count, setCount] = React.useState(0);

  const decreaseCount = () => {
    setCount((prevCount) => prevCount - STEP);
  };

  const increaseCount = () => {
    setCount((prevCount) => prevCount + STEP);
  };

  return (
    <div className="text-gray-600 flex flex-col items-center">
      <div className="text-3xl font-bold">My React App</div>
      <div className="text-4xl m-2">{count}</div>
      <div>
        <Button handleClick={decreaseCount} label="Decrease" />
        <Button handleClick={increaseCount} label="Increase" />
      </div>
    </div>
  );
}

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};
