export type Agent = {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  agentImage: null | string;
};

export type FinalAgent = {
  name: String;
  lastName: string;
  email: string;
  phone: number;
  agentImage: File;
};
