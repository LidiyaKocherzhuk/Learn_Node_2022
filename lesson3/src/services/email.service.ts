import * as path from "node:path";

import EmailTemplates from "email-templates";
import nodemailer, { Transporter } from "nodemailer";

import { configs } from "../config";
import { allTemplates } from "../constants";
import { EEmailActions } from "../enums";

class EmailService {
  private transporter: Transporter;
  private templateParser: EmailTemplates;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: configs.NO_REPLY_EMAIL,
        pass: configs.NO_REPLY_PASSWORD,
      },
    });

    this.templateParser = new EmailTemplates({
      views: {
        root: path.join(process.cwd(), "lesson3", "src", "statics"),
        options: {
          extension: "hbs",
        },
      },
      juice: true,
      juiceResources: {
        webResources: {
          rebaseRelativeTo: path.join(
            process.cwd(),
            "lesson3",
            "src",
            "statics",
            "style.css"
          ),
        },
      },
    });
  }

  public async sendMail(
    email: string,
    emailAction: EEmailActions,
    locals: Record<string, string> = {}
  ) {
    console.log(path.join(process.cwd()));
    const templateInfo = allTemplates[emailAction];

    const html = await this.templateParser.render(
      templateInfo.templateName,
      locals
    );

    return this.transporter.sendMail({
      from: "No",
      to: email,
      subject: templateInfo.subject,
      html,
    });
  }
}

export const emailService = new EmailService();
