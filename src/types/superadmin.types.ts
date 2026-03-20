export type College = {
  _id: string;
  name: string;
  code: string;
};

export type Admin = {
  _id: string;
  name: string;
  email: string;
  collegeId?: {
    _id: string;
    name: string;
  };
};