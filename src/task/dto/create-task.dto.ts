import { IsString } from 'class-validator';

export class CreateTaskDTO {
  @IsString()
  title: string;
}
