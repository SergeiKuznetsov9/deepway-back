export type ProfileGetOutputDTO = {
  _id: string;
  first: string;
  lastname: string;
  age: number;
  currency: string;
  country: string;
  city: string;
  username: string;
  avatar: string;
  userId: string;
};

export type ProfilePutInputDTO = {
  userId: string;
};

export type ProfilePutBodyInputDTO = {
  first: string;
  lastname: string;
  age: number;
  currency: string;
  country: string;
  city: string;
  username: string;
  avatar: string;
  userId: string;
};

export type ProfileGetInputDTO = {
  userId: string;
};
