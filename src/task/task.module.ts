import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskRepository } from './task.repository';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [TaskController],
  imports: [DatabaseModule],
  providers: [TaskService, TaskRepository],
})
export class TaskModule {}
