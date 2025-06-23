import { Entity } from 'src/db/domain/entity';

interface IPatientsProps {
  fullName: string;
  email: string;
  phoneNumber: string;
  documentUrl: string;
  deletedAt?: Date | null;
}

export class Patient extends Entity<IPatientsProps> {
  private constructor(props: IPatientsProps, id?: string) {
    super(props, id);
  }
  get fullName(): string {
    return this.props.fullName;
  }
  set fullName(value: string) {
    this.props.fullName = value;
  }
  get email(): string {
    return this.props.email;
  }
  set email(value: string) {
    this.props.email = value;
  }
  get phoneNumber(): string {
    return this.props.phoneNumber;
  }
  set phoneNumber(value: string) {
    this.props.phoneNumber = value;
  }
  get documentUrl(): string {
    return this.props.documentUrl;
  }
  set documentUrl(value: string) {
    this.props.documentUrl = value;
  }
  get deletedAt(): Date | null | undefined {
    return this.props.deletedAt;
  }
  set deletedAt(value: Date | null | undefined) {
    this.props.deletedAt = value;
  }
  static create(props: IPatientsProps, id?: string): Patient {
    return new Patient(props, id);
  }
}
export interface JsonPatient extends IPatientsProps {
  id: string;
}
