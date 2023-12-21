import { Module } from '@nestjs/common';
import { PipelearnService } from './pipelearn.service';
import { PipelearnController } from './pipelearn.controller';

@Module({
  controllers: [PipelearnController],
  providers: [PipelearnService],
})
export class PipelearnModule {}
