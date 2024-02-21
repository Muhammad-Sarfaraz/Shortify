import { PartialType } from '@nestjs/swagger';
import { CreateURLDto } from './index';

export class UpdateUrlDto extends PartialType(CreateURLDto) {}
