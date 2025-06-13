import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../task.repository';

export class UpdateTaskDTO {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
