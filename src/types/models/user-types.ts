export type Role = "USER" | "MANAGER" | "ADMIN";
export type Features = Record<string, boolean>;

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
