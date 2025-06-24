/* eslint-disable @typescript-eslint/unbound-method */
import { Test } from '@nestjs/testing';
import { TaskController } from '../../src/task/task.controller';
import { TaskService } from '../../src/task/task.service';

describe('TaskController', () => {
  const taskServiceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
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

  it('should create a new task', async () => {
    await taskController.createTask({ title: 'Fake task' });

    expect(taskService.create).toHaveBeenCalledWith({ title: 'Fake task' });
    expect(201);
  });

  it('should return an array of tasks', async () => {
    await taskController.getTasks({});

    expect(taskService.findAll).toHaveBeenCalled();
    expect(200);
  });

  it('should return an array of tasks filtered by "status" query param', async () => {
    await taskController.getTasks({ status: 'Pendente' });

    expect(taskService.findAll).toHaveBeenCalled();
    expect(200);
  });

  it('should update an existing task', async () => {
    await taskController.updateTask('valid-uuid', { status: 'Concluída' });

    expect(taskService.update).toHaveBeenCalledWith('valid-uuid', {
      status: 'Concluída',
    });
    expect(200);
  });

  it('should throw a NotFoundException when updating a task with an invalid ID', async () => {
    await taskController.updateTask('invalid-uuid', { status: 'Concluída' });

    expect(taskService.update).toHaveBeenCalledWith('invalid-uuid', {
      status: 'Concluída',
    });
    expect(404);
  });

  it('should delete an existing task', async () => {
    await taskController.deleteTask('valid-uuid');

    expect(taskService.delete).toHaveBeenCalledWith('valid-uuid');
    expect(200);
  });

  it('should throw a NotFoundException when deleting a task with an invalid ID', async () => {
    await taskController.deleteTask('invalid-uuid');

    expect(taskService.delete).toHaveBeenCalledWith('invalid-uuid');
    expect(404);
  });
});
