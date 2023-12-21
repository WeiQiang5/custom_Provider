import { Test, TestingModule } from '@nestjs/testing';
import { PipelearnService } from './pipelearn.service';

describe('PipelearnService', () => {
  let service: PipelearnService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PipelearnService],
    }).compile();

    service = module.get<PipelearnService>(PipelearnService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
