/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from '../task.repository';

export class FilterTaskDTO {
  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
