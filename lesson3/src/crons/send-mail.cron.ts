import { CronJob } from "cron";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { EEmailActions } from "../enums";
import { User } from "../models";
import { emailService } from "../services";

dayjs.extend(utc);

const mailSender = async (): Promise<void> => {
  const users = await User.find();

  users.map(async (user) => {
    await emailService.sendMail(user.email, EEmailActions.WELCOME);
  });
};

export const sendEmails = new CronJob("0 9 1 * *", mailSender);
