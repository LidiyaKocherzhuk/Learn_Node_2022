export const regexConstant: { [key: string]: RegExp } = {
  EMAIL: /^(\w+\.)*\w+@\w+\.[a-z]{2,6}$/,
  PASSWORD: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/,
};
