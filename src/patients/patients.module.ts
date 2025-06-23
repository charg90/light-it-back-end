import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { PatientRepository } from './repositories/patient.repository';
import { PrismaPatientsRepository } from './repositories/prisma/prisma-repository';
import { DbModule } from 'src/db/db.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [DbModule, MailModule],
  controllers: [PatientsController],
  providers: [
    PatientsService,
    {
      provide: PatientRepository,
      useClass: PrismaPatientsRepository,
    },
  ],
})
export class PatientsModule {}
