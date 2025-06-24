import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { CreateTaskDTO } from './dto/create-task.dto';
import { FilterTaskDTO } from './dto/filter-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly repository: TaskRepository) {}

  async findTask(id: string) {
    const task = await this.repository.findOne(id);

    if (!task) {
      throw new NotFoundException({
        message: 'Task not found',
        error: 'Not Found',
        statusCode: 404,
      });
    }

    return task;
  }

  async create(data: CreateTaskDTO) {
    return await this.repository.create(data);
  }

  async findAll(filter: FilterTaskDTO) {
    return await this.repository.findAll(filter);
  }

  async update(id: string, data: UpdateTaskDTO) {
    const { id: taskId } = await this.findTask(id);

    return await this.repository.update(taskId, data);
  }

  async delete(id: string) {
    const { id: taskId } = await this.findTask(id);

    return await this.repository.delete(taskId);
  }
}
