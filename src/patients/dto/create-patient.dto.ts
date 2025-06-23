export class CreatePatientDto {
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  documentBase64: string; // contenido base64 del documento
}
