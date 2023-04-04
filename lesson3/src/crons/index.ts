import { removeOldPasswords } from "./remove-old-password.cron";
import { removeOldTokens } from "./remove-old-token.cron";
import { sendEmails } from "./send-mail.cron";

export const cronRunner = () => {
  removeOldTokens.start();
  removeOldPasswords.start();
  sendEmails.start();
};
