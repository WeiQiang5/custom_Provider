import { PartialType } from '@nestjs/mapped-types';
import { CreatePipelearnDto } from './create-pipelearn.dto';

export class UpdatePipelearnDto extends PartialType(CreatePipelearnDto) {}
