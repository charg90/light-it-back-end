import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { JsonPatient, Patient } from '../domain/patient.domain';
import { PatientsMapper } from '../mappers/patients.mapper';
export class CreatePatientDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;
}

export class CreatePatientResponseDto {
  readonly patient: JsonPatient;
  constructor(patient: Patient) {
    this.patient = PatientsMapper.toJSON(patient);
  }
}
