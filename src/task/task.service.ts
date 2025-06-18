import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { CreateTaskDTO } from './dto/create-task.dto';
import { FilterTaskDTO } from './dto/filter-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly repository: TaskRepository) {}

  findTask(id: string) {
    const task = this.repository.findOne(id);

    if (!task) {
      throw new NotFoundException({
        message: 'Task not found',
        error: 'Not Found',
        statusCode: 404,
      });
    }

    return task;
  }

  create(data: CreateTaskDTO) {
    return this.repository.create(data);
  }

  findAll(filter: FilterTaskDTO) {
    return this.repository.findAll(filter);
  }

  update(id: string, data: UpdateTaskDTO) {
    const task = this.findTask(id);
    const updatedTask = { ...task, ...data };

    return this.repository.update(updatedTask);
  }

  delete(id: string) {
    const task = this.findTask(id);

    return this.repository.delete(task);
  }
}
