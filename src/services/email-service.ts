import nodemailer from "nodemailer";

import { EmailSendInputDTO } from "../types/dtos/email-dto";
import { SendEmailError } from "../errors/mail-error";

const pass = process.env.EMAIL_SENDER_PASSWORD;

export class EmailService {
  async sendEmail({ from, to, subject, text, html }: EmailSendInputDTO) {
    const transporter = nodemailer.createTransport({
      host: "smtp.mail.ru",
      port: 587,
      secure: false,
      requireTLS: true,
      tls: {
        rejectUnauthorized: false,
      },
      auth: {
        user: from,
        pass,
      },
    });

    const mailOptions = {
      from,
      to,
      subject,
      text,
      html,
      replyTo: from,
      headers: {
        "Return-Path": from,
      },
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      await transporter.sendMail({
        ...mailOptions,
        to: from,
        subject: `Sent copy: ${mailOptions.subject} for ${mailOptions.to}`,
      });

      return info;
    } catch (error) {
      console.log("Error occured during sending email", error);
      throw new SendEmailError();
    }
  }
}
