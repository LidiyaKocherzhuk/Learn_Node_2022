import { ESmsActions } from "../enums";

export const smsConstant: { [key: string]: string } = {
  [ESmsActions.WELCOME]: "Great to see you in our app!",

  [ESmsActions.FORGOT_PASSWORD]:
    "We control your password, just follow all steps and everything will be good",
};
