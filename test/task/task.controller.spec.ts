/* eslint-disable @typescript-eslint/unbound-method */
import { Test } from '@nestjs/testing';
import { TaskController } from '../../src/task/task.controller';
import { TaskService } from '../../src/task/task.service';
import { TaskStatus } from '../../src/task/task.repository';

describe('TaskController', () => {
  const taskServiceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
  };

  let taskController: TaskController;
  let taskService: TaskService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        TaskController,
        {
          provide: TaskService,
          useValue: taskServiceMock,
        },
      ],
    }).compile();

    taskController = moduleRef.get(TaskController);
    taskService = moduleRef.get(TaskService);
  });

  it('should create a new task', () => {
    taskController.createTask({ title: 'Fake task' });

    expect(taskService.create).toHaveBeenCalledWith({ title: 'Fake task' });
    expect(201);
  });

  it('should return an array of tasks', () => {
    taskController.getTasks({});

    expect(taskService.findAll).toHaveBeenCalled();
    expect(200);
  });

  it('should return an array of tasks filtered by "status" query param', () => {
    taskController.getTasks({ status: TaskStatus.pending });

    expect(taskService.findAll).toHaveBeenCalled();
    expect(200);
  });

  it('should update an existing task', () => {
    taskController.updateTask('valid-uuid', { status: TaskStatus.completed });

    expect(taskService.update).toHaveBeenCalledWith('valid-uuid', {
      status: TaskStatus.completed,
    });
    expect(200);
  });

  it('should throw a NotFoundException when updating a task with an invalid ID', () => {
    taskController.updateTask('invalid-uuid', { status: TaskStatus.completed });

    expect(taskService.update).toHaveBeenCalledWith('invalid-uuid', {
      status: TaskStatus.completed,
    });
    expect(404);
  });
});
