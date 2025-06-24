import { TaskStatus } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';

export class FilterTaskDTO {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
