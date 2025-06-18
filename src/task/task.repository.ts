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

  findOne(id: string) {
    return this.tasks.find((task) => task.id === id);
  }

  update(updatedTask: Task) {
    this.tasks = this.tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task,
    );

    return updatedTask;
  }

  delete(deletedTask: Task) {
    this.tasks = this.tasks.filter((task) => task.id !== deletedTask.id);
  }
}
