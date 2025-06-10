import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailService: MailerService) {}

  async sendOtp(email: string, otp: string) {
    await this.mailService.sendMail({
      to: email,
      subject: 'Tasdiqlash kodi',
      text: otp,
    });
  }

  // async sendOrder(data: object) {
  //   await this.mailService.sendMail({
  //     to: data.email,
  //     subject: `You have successfully ordered ${data}`,
  //   });
  // }
}
