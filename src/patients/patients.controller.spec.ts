import { Test, TestingModule } from '@nestjs/testing';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { Readable } from 'stream';

const mockPatientsService = {
  create: jest.fn(),
  findAll: jest.fn(),
};

describe('PatientsController', () => {
  let controller: PatientsController;
  let service: typeof mockPatientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientsController],
      providers: [{ provide: PatientsService, useValue: mockPatientsService }],
    }).compile();

    controller = module.get<PatientsController>(PatientsController);
    service = module.get(PatientsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call PatientsService.create', async () => {
    const createPatientDto: CreatePatientDto = {
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      phoneNumber: '1234567890',
    };
    const mockFile: Express.Multer.File = {
      fieldname: 'document',
      originalname: 'document.pdf',
      encoding: '7bit',
      mimetype: 'application/pdf',
      buffer: Buffer.from('mock file content'),
      size: 1234,
      stream: new Readable(),
      destination: '',
      filename: '',
      path: '',
    };

    const base64 = mockFile.buffer.toString('base64');
    const documentBase64 = `data:${mockFile.mimetype};base64,${base64}`;

    service.create.mockResolvedValue('Patient created');

    const result = await controller.create(mockFile, createPatientDto);

    expect(service.create).toHaveBeenCalledWith(
      createPatientDto,
      documentBase64,
    );
    expect(result).toBe('Patient created');
  });

  it('should call PatientsService.findAll', async () => {
    service.findAll.mockResolvedValue('All patients');

    const result = await controller.findAll();

    expect(service.findAll).toHaveBeenCalled();
    expect(result).toBe('All patients');
  });
});
