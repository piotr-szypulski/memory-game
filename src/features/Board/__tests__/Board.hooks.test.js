import { act, renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';
import { triggerResize } from '@tests/helpers';
import { useGridAspectRatio } from '../Board.hooks';

describe('useGridAspectRatio', () => {
  const { result, rerender } = renderHook(() => useGridAspectRatio({
    numberOfCards: 24,
    debounce: 0,
  }));

  test('should set initial rows and columns number', () => {
    expect(typeof result.current).toBe('object');
    expect(result.current).toHaveProperty('columns', 1);
    expect(result.current).toHaveProperty('rows', 24);
  });

  test('should update columns and rows when screen size changes', async () => {
    act(() => {
      triggerResize({ height: 1600, width: 900 });
    });

    rerender();
    /**
     * waitFor because of debounce
     */
    await waitFor(() => {
      expect(result.current).toHaveProperty('columns', 8);
      expect(result.current).toHaveProperty('rows', 3);
    });

    act(() => {
      triggerResize({ height: 900, width: 1600 });
    });

    rerender();
    /**
     * waitFor because of debounce
     */
    await waitFor(() => {
      expect(result.current).toHaveProperty('columns', 3);
      expect(result.current).toHaveProperty('rows', 8);
    });
  });
});
