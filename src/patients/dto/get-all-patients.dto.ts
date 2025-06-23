import { JsonPatient, Patient } from '../domain/patient.domain';
import { PatientsMapper } from '../mappers/patients.mapper';

export class GetAllPatientsDto {
  readonly patients: JsonPatient[];
  constructor(patients: Patient[]) {
    this.patients = patients.map((patient) => PatientsMapper.toJSON(patient));
  }
}
