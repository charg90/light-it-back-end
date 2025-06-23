import { Injectable } from '@nestjs/common';
import { PatientRepository } from '../patient.repository';
import { DbService } from 'src/db/db.service';
import { Patient } from 'src/patients/domain/patient.domain';
import { PatientsMapper } from 'src/patients/mappers/patients.mapper';

@Injectable()
export class PrismaPatientsRepository implements PatientRepository {
  constructor(private readonly dbService: DbService) {}

  async create(patient: Patient): Promise<Patient> {
    const patientdata = PatientsMapper.toPersistence(patient);
    const createdPatient = await this.dbService.patient.create({
      data: patientdata,
    });
    return PatientsMapper.toDomain(createdPatient);
  }

  async findByEmail(email: string): Promise<Patient | null> {
    const patient = await this.dbService.patient.findUnique({
      where: { email },
    });
    return patient ? PatientsMapper.toDomain(patient) : null;
  }

  async findAll(): Promise<Patient[]> {
    const patients = await this.dbService.patient.findMany();

    return patients.map((patient) => PatientsMapper.toDomain(patient));
  }
}
