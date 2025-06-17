import { Test } from '@nestjs/testing';
import { TaskService } from '../../src/task/task.service';
import { TaskRepository, TaskStatus } from '../../src/task/task.repository';

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
    findAll: jest.fn().mockReturnValue(tasksMock),
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
});
