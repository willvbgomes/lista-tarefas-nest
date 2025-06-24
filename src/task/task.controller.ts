import {
  Body,
  Controller,
  Delete,
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
  async createTask(@Body() taskData: CreateTaskDTO) {
    return await this.task.create(taskData);
  }

  @Get()
  async getTasks(@Query() filter: FilterTaskDTO) {
    return await this.task.findAll(filter);
  }

  @Patch(':id')
  async updateTask(@Param('id') id: string, @Body() taskData: UpdateTaskDTO) {
    return await this.task.update(id, taskData);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    return await this.task.delete(id);
  }
}
