import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}
  @Post('test')
  test() {
    return { message: 'Notification test works!' };
  }
  @Get('ping')
  ping() {
    return { ok: true };
  }
  @Post()
  async createNotification(@Body() createNotificaiton: CreateNotificationDto) {
    if (createNotificaiton.type === 'email' && !createNotificaiton.subject) {
      throw new BadRequestException(
        'Missing required subject field for email notifications',
      );
    }
    //Validate if its a valid email address
    if (
      createNotificaiton.type === 'email' &&
      (!createNotificaiton.to ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(createNotificaiton.to))
    ) {
      throw new BadRequestException(
        'Field "to" must be a valid email address for email notifications',
      );
    }

    return await this.notificationService.createNotification(
      createNotificaiton,
    );
  }
}
