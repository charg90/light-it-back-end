import { Patient } from '../domain/patient.domain';

export abstract class PatientRepository {
  abstract create(patient: Patient): Promise<Patient>;
  abstract findByEmail(email: string): Promise<Patient | null>;
  abstract findAll(): Promise<Patient[]>;
}
