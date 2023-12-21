import { Test, TestingModule } from '@nestjs/testing';
import { PipelearnController } from './pipelearn.controller';
import { PipelearnService } from './pipelearn.service';

describe('PipelearnController', () => {
  let controller: PipelearnController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PipelearnController],
      providers: [PipelearnService],
    }).compile();

    controller = module.get<PipelearnController>(PipelearnController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
