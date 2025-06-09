import { generate } from 'otp-generator';

export const otpGenerate = () => {
  return generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
};
