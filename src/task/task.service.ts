import { Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { CreateTaskDTO } from './dto/create-task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly repository: TaskRepository) {}

  create(data: CreateTaskDTO) {
    return this.repository.create(data);
  }

  findAll() {
    return this.repository.findAll();
  }
}
