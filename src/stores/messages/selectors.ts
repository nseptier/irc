import { RootState } from 'stores/types';
import { shallowEqual, useSelector } from 'react-redux';
import { useMemo } from 'react';

export function useAllMessages() {
  const state = useSelector(
    (state: RootState) => state.messages,
    shallowEqual,
  );

  return useMemo(
    () => state.allIds.map((id: string) => state.byId[id]),
    [state],
  );
}
