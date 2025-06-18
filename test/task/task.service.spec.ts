import { Test } from '@nestjs/testing';
import { TaskService } from '../../src/task/task.service';
import { TaskRepository, TaskStatus } from '../../src/task/task.repository';
import { UpdateTaskDTO } from '../../src/task/dto/update-task.dto';
import { NotFoundException } from '@nestjs/common';

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
    update: jest.fn((dto: UpdateTaskDTO) => ({ ...taskMock, ...dto })),
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

  it('should create a new task', () => {
    const result = taskService.create({ title: 'Fake task' });

    expect(result).toHaveProperty('id');
    expect(201);
  });

  it('should return an array of tasks', () => {
    const result = taskService.findAll({});

    expect(result).toBeInstanceOf(Array);
    expect(200);
  });

  it('should return an array of tasks filtered by "status" query param', () => {
    const result = taskService.findAll({ status: TaskStatus.pending });

    expect(result).toBeInstanceOf(Array);
    expect(200);
  });

  it('should update an existing task', () => {
    const result = taskService.update('valid-uuid', {
      status: TaskStatus.completed,
    });

    expect(result.status).toBe('Concluída');
    expect(200);
  });

  it('should throw a NotFoundException when updating a task with an invalid ID', () => {
    expect(() =>
      taskService.update('invalid-uuid', {
        status: TaskStatus.completed,
      }),
    ).toThrow(
      new NotFoundException({
        message: 'Task not found',
        error: 'Not Found',
        statusCode: 404,
      }),
    );
    expect(404);
  });

  it('should delete an existing task', () => {
    const result = taskService.delete('valid-uuid');

    expect(result).toBe(undefined);
    expect(200);
  });

  it('should throw a NotFoundException when deleting a task with an invalid ID', () => {
    expect(() => taskService.delete('invalid-uuid')).toThrow(
      new NotFoundException({
        message: 'Task not found',
        error: 'Not Found',
        statusCode: 404,
      }),
    );
    expect(404);
  });
});
