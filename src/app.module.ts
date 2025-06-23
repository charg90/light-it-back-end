import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientsModule } from './patients/patients.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [PatientsModule, DbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
