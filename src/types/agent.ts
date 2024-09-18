export type Agent = {
  name: string;
  surname: string;
  email: string;
  phone: string;
  avatar: null | string;
};

export type FinalAgent = {
  name: string;
  surname: string;
  email: string;
  phone: string;
  avatar: File;
};
