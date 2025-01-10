export type Profile = {
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

export type ProfilePutParams = {
  userId: string;
};

export type ProfilePutBody = Omit<Profile, "userId">;

export type ProfileGetParams = Pick<Profile, "userId">;
