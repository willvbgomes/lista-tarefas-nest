import { Body, Controller, Get, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDTO } from './dto/create-task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly task: TaskService) {}

  @Post()
  createTask(@Body() taskData: CreateTaskDTO) {
    return this.task.create(taskData);
  }

  @Get()
  getTasks() {
    return this.task.findAll();
  }
}
