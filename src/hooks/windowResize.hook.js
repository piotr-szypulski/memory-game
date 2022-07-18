import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

const DEBOUNCE_TIME = 200;

export default function useWindowSize({ debounce } = { debounce: DEBOUNCE_TIME }) {
  const [windowSize, setWindowSize] = useState({
    height: undefined,
    width: undefined,
  });

  const handleWindowResize = useDebouncedCallback(
    () => setWindowSize({
      height: window.innerHeight,
      width: window.innerWidth,
    }),
    debounce,
  );

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    handleWindowResize();

    return () => window.removeEventListener('resize', handleWindowResize);
  }, [handleWindowResize]);

  return windowSize;
}
