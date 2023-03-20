import { Twilio } from "twilio";

import { configs } from "../config";
import { smsTemplates } from "../constants";
import { ESmsActions } from "../enums";

class SmsService {
  private client: Twilio;

  constructor() {
    this.client = new Twilio(
      configs.TWILIO_ACCOUNT_SID,
      configs.TWILIO_AUTH_TOKEN
    );
  }

  public async sendSms(phone: string, action: ESmsActions) {
    const message = smsTemplates[action];
    await this.client.messages.create({
      body: message,
      to: phone,
      from: "+15178365193",
    });
  }
}

export const smsService = new SmsService();
