import React from 'react';

const STEP = 1;

export default function List() {
  const [count, setCount] = React.useState(0);

  const decreaseCount = () => {
    setCount((prevCount) => prevCount - STEP);
  };

  const increaseCount = () => {
    setCount((prevCount) => prevCount + STEP);
  };

  return (
    <>
      <div>My React App</div>
      <div>{count}</div>
      <button onClick={decreaseCount} type="button">Decrease</button>
      <button onClick={increaseCount} type="button">Increase</button>
    </>
  );
}
