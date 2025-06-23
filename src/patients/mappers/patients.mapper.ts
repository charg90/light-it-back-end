import { Patient as PersistancePatient, Prisma } from 'generated/prisma';
import { JsonPatient, Patient } from '../domain/patient.domain';

export class PatientsMapper {
  static toDomain(raw: PersistancePatient): Patient {
    return Patient.create(
      {
        fullName: raw.full_name,
        email: raw.email,
        phoneNumber: raw.phone_number,
        documentUrl: raw.document_url,
        deletedAt: raw.deleted_at ? new Date(raw.deleted_at) : null,
      },
      raw.id,
    );
  }

  static toPersistence(patient: Patient): Prisma.PatientUncheckedCreateInput {
    return {
      id: patient.id,
      full_name: patient.fullName,
      email: patient.email,
      phone_number: patient.phoneNumber,
      document_url: patient.documentUrl,
    };
  }

  static toJSON(patient: Patient): JsonPatient {
    return {
      id: patient.id,
      fullName: patient.fullName,
      email: patient.email,
      phoneNumber: patient.phoneNumber,
      documentUrl: patient.documentUrl,
      deletedAt: patient.deletedAt,
    };
  }
}
