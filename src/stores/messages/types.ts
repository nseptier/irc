import { User } from 'stores/users/types';

export type Message = {
  author: User,
  body: string,
  createdAt: string,
  id: string,
};

export type Messages = {
  [id: string]: Message,
};
