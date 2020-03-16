import { RootState } from 'stores/types';
import { shallowEqual, useSelector } from 'react-redux';
import { useMemo } from 'react';

export function useCurrentUser() {
  const state = useSelector((state: RootState) => state.users, shallowEqual);

  return useMemo(() => state.current, [state]);
}
