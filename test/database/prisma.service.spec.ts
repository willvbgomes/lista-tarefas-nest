/* eslint-disable @typescript-eslint/unbound-method */
import { PrismaService } from '../../src/database/prisma.service';

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(() => {
    service = new PrismaService();

    service.$connect = jest.fn();
    service.$disconnect = jest.fn();
  });

  it('should connect on module init', async () => {
    await service.onModuleInit();

    expect(service.$connect).toHaveBeenCalled();
  });

  it('should disconnect on module destroy', async () => {
    await service.onModuleDestroy();

    expect(service.$disconnect).toHaveBeenCalled();
  });
});
