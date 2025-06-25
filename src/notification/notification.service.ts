// notification.service.ts
import { Inject, Injectable } from '@nestjs/common';
import {
  NOTIFICATION_STRATEGIES,
  NotificationStrategy,
} from './stategies/notification-strategy.interface';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationService {
  private strategyMap: Map<string, NotificationStrategy> = new Map();

  constructor(
    @Inject(NOTIFICATION_STRATEGIES)
    strategies: NotificationStrategy[],
  ) {
    for (const strategy of strategies) {
      this.strategyMap.set(strategy.type, strategy);
    }
  }

  async createNotification(
    createNotification: CreateNotificationDto,
  ): Promise<void> {
    const strategy = this.strategyMap.get(createNotification.type);

    if (!strategy) {
      throw new Error(
        `Notification type "${createNotification.type}" not supported`,
      );
    }

    return strategy.send(
      createNotification.to,
      createNotification.subject,
      createNotification.message,
    );
  }
}
