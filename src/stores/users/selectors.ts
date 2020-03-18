import { RootState } from 'stores/types';
import { User } from './types';
import { useSelector } from 'react-redux';

const getCurrentUser = (state: RootState): User | null => state.users.current;

export const useCurrentUser = (): User | null => useSelector(getCurrentUser);
