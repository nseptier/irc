import { User } from 'stores/users/types';

export type Message = {
  author: User,
  body: string,
  createdAt: string,
  event: string,
  id: string,
  system: boolean,
};

export type Messages = {
  [id: string]: Message,
};
