export type Role = "USER" | "MANAGER" | "ADMIN";
export type Features = Record<string, boolean>;
// TODO Выпилить когда будет реализован функционал по авторизации
export type User = {
  username: string;
  roles: Role[];
  avatar: string;
  features: Features;
};

export type UserCredentials = {
  username: string;
  password: string;
};
