import { Message } from './types';
import { RootState } from 'stores/types';
import { useSelector } from 'react-redux';

const getAllMessages = (state: RootState): Message[] => (
  state.messages.allIds.map((id: string) => state.messages.byId[id])
);

export const useAllMessages = (): Message[] => useSelector(getAllMessages);
