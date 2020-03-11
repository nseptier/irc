export type User = {
  id: number,
  name: string,
};

export type Users = {
  [id: string]: User,
};
