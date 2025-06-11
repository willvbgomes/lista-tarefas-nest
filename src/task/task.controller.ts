import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { FilterTaskDTO } from './dto/filter-task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly task: TaskService) {}

  @Post()
  createTask(@Body() taskData: CreateTaskDTO) {
    return this.task.create(taskData);
  }

  @Get()
  getTasks(@Query() filter: FilterTaskDTO) {
    return this.task.findAll(filter);
  }
}
