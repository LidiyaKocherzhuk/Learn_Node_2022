import { EEmailActions } from "../enums";

export const allTemplates: {
  [key: string]: { subject: string; templateName: string };
} = {
  [EEmailActions.WELCOME]: {
    subject: "Welcome",
    templateName: "register",
  },
  [EEmailActions.FORGOT_PASSWORD]: {
    subject:
      "We control your password, just follow all steps and everything will be good",
    templateName: "forgot-password",
  },
  [EEmailActions.ACTIVATE]: {
    subject: "Activate your account",
    templateName: "activate",
  },
};
