export type EmailSendInputDTO = {
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
};

export type EmailSendInfoOutputDTO = {
  messageId: string;
  response: string;
};
