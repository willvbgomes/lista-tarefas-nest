import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { TaskService } from '../../src/task/task.service';
import { TaskRepository } from '../../src/task/task.repository';
import { UpdateTaskDTO } from '../../src/task/dto/update-task.dto';

describe('TaskService', () => {
  const taskMock = {
    id: 'random-uuid-1',
    title: 'Fake task 1',
    status: 'Pendente',
  };
  const tasksMock = [
    taskMock,
    {
      id: 'random-uuid-2',
      title: 'Fake task 2',
      status: 'Pendente',
    },
    {
      id: 'random-uuid-3',
      title: 'Fake task 3',
      status: 'Pendente',
    },
  ];
  const repositoryMock = {
    create: jest.fn().mockReturnValue(taskMock),
    findOne: jest.fn((id) => (id === 'valid-uuid' ? taskMock : undefined)),
    findAll: jest.fn().mockReturnValue(tasksMock),
    update: jest.fn((_id: string, dto: UpdateTaskDTO) => ({
      ...taskMock,
      ...dto,
    })),
    delete: jest.fn(),
  };

  let taskService: TaskService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: TaskRepository,
          useValue: repositoryMock,
        },
      ],
    }).compile();

    taskService = moduleRef.get(TaskService);
  });

  it('should create a new task', async () => {
    const result = await taskService.create({ title: 'Fake task' });

    expect(result).toHaveProperty('id');
    expect(201);
  });

  it('should return an array of tasks', async () => {
    const result = await taskService.findAll({});

    expect(result).toBeInstanceOf(Array);
    expect(200);
  });

  it('should return an array of tasks filtered by "status" query param', async () => {
    const result = await taskService.findAll({ status: 'Pendente' });

    expect(result).toBeInstanceOf(Array);
    expect(200);
  });

  it('should update an existing task', async () => {
    const result = await taskService.update('valid-uuid', {
      status: 'Concluída',
    });

    expect(result.status).toBe('Concluída');
    expect(200);
  });

  it('should throw a NotFoundException when updating a task with an invalid ID', async () => {
    await expect(
      async () =>
        await taskService.update('invalid-uuid', {
          status: 'Concluída',
        }),
    ).rejects.toThrow(
      new NotFoundException({
        message: 'Task not found',
        error: 'Not Found',
        statusCode: 404,
      }),
    );
    expect(404);
  });

  it('should delete an existing task', async () => {
    const result = await taskService.delete('valid-uuid');

    expect(result).toBe(undefined);
    expect(200);
  });

  it('should throw a NotFoundException when deleting a task with an invalid ID', async () => {
    await expect(() => taskService.delete('invalid-uuid')).rejects.toThrow(
      new NotFoundException({
        message: 'Task not found',
        error: 'Not Found',
        statusCode: 404,
      }),
    );
    expect(404);
  });
});
