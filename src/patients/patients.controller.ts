import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  HttpStatus,
} from '@nestjs/common';
import { Express } from 'express';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { PatientException } from './exceptions/patient.exception';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('documentFile', { storage: multer.memoryStorage() }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createPatientDto: CreatePatientDto,
  ) {
    if (!file) {
      throw new PatientException(
        'Document file is required',
        HttpStatus.BAD_REQUEST,
      );
    }
    const base64 = file.buffer.toString('base64');
    const documentBase64 = `data:${file.mimetype};base64,${base64}`;

    return await this.patientsService.create(createPatientDto, documentBase64);
  }

  @Get()
  async findAll() {
    const patients = await this.patientsService.findAll();

    return patients;
  }
}
