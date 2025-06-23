import { IsEmail, IsString } from 'class-validator';
export class CreatePatientDto {
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  documentUrl: string;
}
