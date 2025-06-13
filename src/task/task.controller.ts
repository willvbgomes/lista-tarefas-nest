import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { FilterTaskDTO } from './dto/filter-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';

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

  @Patch(':id')
  updateTask(@Param('id') id: string, @Body() taskData: UpdateTaskDTO) {
    return this.task.update(id, taskData);
  }
}
