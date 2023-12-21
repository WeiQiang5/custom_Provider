import { Injectable } from '@nestjs/common';
import { CreatePipelearnDto } from './dto/create-pipelearn.dto';
import { UpdatePipelearnDto } from './dto/update-pipelearn.dto';

@Injectable()
export class PipelearnService {
  create(createPipelearnDto: CreatePipelearnDto) {
    return 'This action adds a new pipelearn';
  }

  findAll() {
    return `This action returns all pipelearn`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pipelearn`;
  }

  update(id: number, updatePipelearnDto: UpdatePipelearnDto) {
    return `This action updates a #${id} pipelearn`;
  }

  remove(id: number) {
    return `This action removes a #${id} pipelearn`;
  }
}
