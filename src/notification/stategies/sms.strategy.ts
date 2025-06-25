import { Injectable, Logger } from '@nestjs/common';
import { NotificationStrategy } from './notification-strategy.interface';

@Injectable()
export class SmsStrategy implements NotificationStrategy {
  readonly type = 'sms';
  private readonly logger = new Logger(SmsStrategy.name);

  send(to: string, message: string): Promise<void> {
    this.logger.warn(`SMS notification sent to ${to}: ${message}`);
    //TODO: Implente SMS
    return Promise.resolve();
  }
}
