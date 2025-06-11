import { Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { CreateTaskDTO } from './dto/create-task.dto';
import { FilterTaskDTO } from './dto/filter-task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly repository: TaskRepository) {}

  create(data: CreateTaskDTO) {
    return this.repository.create(data);
  }

  findAll(filter: FilterTaskDTO) {
    return this.repository.findAll(filter);
  }
}
