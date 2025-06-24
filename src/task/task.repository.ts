import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { FilterTaskDTO } from './dto/filter-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';

@Injectable()
export class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create({ title }: CreateTaskDTO) {
    return await this.prisma.task.create({ data: { title } });
  }

  async findAll({ status }: FilterTaskDTO) {
    if (status) {
      return this.prisma.task.findMany({ where: { status } });
    }

    return this.prisma.task.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.task.findUnique({ where: { id } });
  }

  async update(id: string, data: UpdateTaskDTO) {
    return await this.prisma.task.update({ data, where: { id } });
  }

  async delete(id: string) {
    return await this.prisma.task.delete({ where: { id } });
  }
}
