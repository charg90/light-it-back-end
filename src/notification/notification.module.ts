import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { MailModule } from '../mail/mail.module'; // suponiendo que lo tenés
import { EmailStategy } from './stategies/email.stategy';
import { SmsStrategy } from './stategies/sms.strategy';
import { NOTIFICATION_STRATEGIES } from './stategies/notification-strategy.interface';

@Module({
  imports: [MailModule],
  controllers: [NotificationController],
  providers: [
    NotificationService,
    EmailStategy,
    SmsStrategy,
    {
      provide: NOTIFICATION_STRATEGIES,
      useFactory: (email: EmailStategy, sms: SmsStrategy) => [email, sms],
      inject: [EmailStategy, SmsStrategy],
    },
  ],
  exports: [NotificationService],
})
export class NotificationModule {}
