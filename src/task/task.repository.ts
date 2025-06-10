import { Injectable } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';

enum TaskStatus {
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

  findAll() {
    return this.tasks;
  }
}
