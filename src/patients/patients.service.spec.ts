import { Test, TestingModule } from '@nestjs/testing';
import { PatientsService } from './patients.service';
import { PatientRepository } from './repositories/patient.repository';
import { MailService } from 'src/mail/mail.service';
import { CreatePatientDto } from './dto/create-patient.dto';

const mockPatientRepository = {
  findByEmail: jest.fn(),
  create: jest.fn(),
  findAll: jest.fn(),
};

const mockMailService = {
  sendWelcomeEmail: jest.fn().mockResolvedValue(undefined),
};

describe('PatientsService', () => {
  let service: PatientsService;
  let patientRepository: typeof mockPatientRepository;
  let mailService: typeof mockMailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PatientsService,
        { provide: PatientRepository, useValue: mockPatientRepository },
        { provide: MailService, useValue: mockMailService },
      ],
    }).compile();

    service = module.get<PatientsService>(PatientsService);
    patientRepository = module.get(PatientRepository);
    mailService = module.get(MailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a patient', async () => {
    const createPatientDto: CreatePatientDto = {
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      phoneNumber: '1234567890',
    };
    const documentBase64 = 'base64string';

    patientRepository.findByEmail.mockResolvedValue(null);
    patientRepository.create.mockResolvedValue({
      fullName: createPatientDto.fullName,
      email: createPatientDto.email,
      phoneNumber: createPatientDto.phoneNumber,
      documentUrl: documentBase64,
    });

    await service.create(createPatientDto, documentBase64);

    expect(patientRepository.findByEmail).toHaveBeenCalledWith(
      createPatientDto.email,
    );
    expect(patientRepository.create).toHaveBeenCalled();
    expect(mailService.sendWelcomeEmail).toHaveBeenCalledWith(
      createPatientDto.email,
      createPatientDto.fullName,
    );
  });

  it('should throw an error if patient already exists', async () => {
    const createPatientDto: CreatePatientDto = {
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      phoneNumber: '1234567890',
    };
    const documentBase64 = 'base64string';

    patientRepository.findByEmail.mockResolvedValue({
      fullName: createPatientDto.fullName,
      email: createPatientDto.email,
      phoneNumber: createPatientDto.phoneNumber,
    });

    await expect(
      service.create(createPatientDto, documentBase64),
    ).rejects.toThrow(
      'Patient with email john.doe@example.com already exists.',
    );

    expect(patientRepository.findByEmail).toHaveBeenCalledWith(
      createPatientDto.email,
    );
  });

  it('should find a patient by email', async () => {
    const email = 'john.doe@example.com';
    const patient = {
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      phoneNumber: '1234567890',
    };

    patientRepository.findByEmail.mockResolvedValue(patient);

    const result = await service.findByEmail(email);

    expect(patientRepository.findByEmail).toHaveBeenCalledWith(email);
    expect(result).toBe(patient);
  });

  it('should find all patients', async () => {
    const patients = [
      {
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        phoneNumber: '1234567890',
      },
    ];

    patientRepository.findAll.mockResolvedValue(patients);

    const result = await service.findAll();

    expect(patientRepository.findAll).toHaveBeenCalled();
    expect(result.patients).toHaveLength(1);
  });
});
