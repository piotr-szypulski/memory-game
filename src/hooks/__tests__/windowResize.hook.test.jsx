import { act, renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';
import { triggerResize } from '@tests/helpers';
import useWindowResize from '../windowResize.hook';

describe('useWindowResize', () => {
  const { result, rerender } = renderHook(() => useWindowResize({ debounce: 0 }));

  test('should set correct initial values', () => {
    expect(typeof result.current).toBe('object');
    expect(result.current).toHaveProperty('height', undefined);
    expect(result.current).toHaveProperty('width', undefined);
  });

  test('should update screen size when resize event is triggered', async () => {
    act(() => {
      triggerResize({ height: 1600, width: 900 });
    });

    rerender();
    /**
     * waitFor because of debounce
     */
    await waitFor(() => {
      expect(result.current).toHaveProperty('height', 1600);
      expect(result.current).toHaveProperty('width', 900);
    });

    act(() => {
      triggerResize({ height: 900, width: 1600 });
    });

    rerender();
    /**
     * waitFor because of debounce
     */
    await waitFor(() => {
      expect(result.current).toHaveProperty('height', 900);
      expect(result.current).toHaveProperty('width', 1600);
    });
  });
});
