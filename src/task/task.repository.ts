import { Injectable } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { FilterTaskDTO } from './dto/filter-task.dto';

export enum TaskStatus {
  pending = 'Pendente',
  completed = 'Concluída',
}

export type Task = {
  id: string;
  title: string;
  status: TaskStatus;
};

@Injectable()
export class TaskRepository {
  private tasks: Task[] = [];

  create({ title }: CreateTaskDTO) {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      status: TaskStatus.pending,
    };

    this.tasks.push(newTask);
    return newTask;
  }

  findAll({ status }: FilterTaskDTO) {
    if (status) {
      return this.tasks.filter((task) => task.status === status);
    }

    return this.tasks;
  }
}
