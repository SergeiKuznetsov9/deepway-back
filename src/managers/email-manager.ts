import {
  EmailSendInfoOutputDTO,
  EmailSendInputDTO,
} from "../types/dtos/email-dto";
import { EmailService } from "../services/email-service";
import { RequestWithBody } from "../types/primary-types";

export class EmailManager {
  private service;

  constructor(service: EmailService) {
    this.service = service;
  }

  async handleSendEmail(
    req: RequestWithBody<EmailSendInputDTO>
  ): Promise<EmailSendInfoOutputDTO> {
    const sendResult = await this.service.sendEmail(req.body);

    return {
      messageId: sendResult.messageId,
      response: sendResult.response,
    };
  }
}
