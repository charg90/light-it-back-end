import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import {
  CreatePatientDto,
  CreatePatientResponseDto,
} from './dto/create-patient.dto';

import { PatientRepository } from './repositories/patient.repository';
import { Patient } from './domain/patient.domain';
import { PatientException } from './exceptions/patient.exception';
import { GetAllPatientsDto } from './dto/get-all-patients.dto';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class PatientsService {
  constructor(
    private readonly patientRepository: PatientRepository,
    private readonly mailService: MailService,
  ) {}
  private readonly logger = new Logger(PatientsService.name);

  async create(createPatientDto: CreatePatientDto, documentBase64: string) {
    const patientExists = await this.patientRepository.findByEmail(
      createPatientDto.email,
    );
    if (patientExists) {
      this.logger.error(
        `Patient with email ${createPatientDto.email} already exists.`,
      );
      throw new PatientException(
        `Patient with email ${createPatientDto.email} already exists.`,
        HttpStatus.CONFLICT,
      );
    }

    const patient = Patient.create({
      ...createPatientDto,
      documentUrl: documentBase64,
    });
    try {
      await this.patientRepository.create(patient);
    } catch (error) {
      this.logger.error('Error creating patient', error);
      throw new PatientException(
        'Error creating patient',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    this.mailService
      .sendWelcomeEmail(patient.email, patient.fullName)
      .catch((err) => this.logger.error('Error sending welcome email', err));

    return new CreatePatientResponseDto(patient);
  }

  findByEmail(email: string) {
    return this.patientRepository.findByEmail(email);
  }

  async findAll() {
    const getAllPatients = await this.patientRepository.findAll();
    return new GetAllPatientsDto(getAllPatients);
  }
}
