import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientsModule } from './patients/patients.module';
import { DbModule } from './db/db.module';
import { MailModule } from './mail/mail.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [PatientsModule, DbModule, MailModule, NotificationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
