import { Injectable } from '@nestjs/common';

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
}
