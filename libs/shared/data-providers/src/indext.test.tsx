import { renderHook } from '@testing-library/react-hooks';
import { Providers, useAuthContext } from './index';

const wrapper = Providers;

describe('Data providers', () => {
  describe('AuthProvider', () => {
    it('should login correctly', async () => {
      const { result, waitFor } = renderHook(() => useAuthContext(), {
        wrapper,
      });
      await waitFor(() => {
        console.log(result.current.loginMutation);
      });
    });
  });
});
