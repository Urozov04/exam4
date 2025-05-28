import { hash, compare } from 'bcrypt';

export const encrypt = async (data: string) => {
  return hash(data, 7);
};

export const decrypt = async (data: string, hashedPass: string) => {
  return compare(data, hashedPass);
};
