import { Test, TestingModule } from '@nestjs/testing';
import { ProjectService } from './project.service';
import { PrismaService } from '@aymme/api/database/data-access';
import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';

describe('ProjectService', () => {
  let service: ProjectService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, ProjectService],
    }).compile();

    service = module.get<ProjectService>(ProjectService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(async () => {
    await prismaService.$disconnect();
  });

  describe('getAll()', () => {
    it('should get all projects and the corresponding configuration', async () => {
      const result = { id: '1234', name: 'Aymme', slug: 'aymme', configurationId: '1223' };
      jest.spyOn(prismaService.project, 'findMany').mockResolvedValue([result]);

      const data = await service.getAll();
      expect(data.length).toBeGreaterThan(0);
      expect(data[0].name).toEqual(result.name);
    });

    it('should return an empty array if there are no projects found', async () => {
      jest.spyOn(prismaService.project, 'findMany').mockResolvedValue([]);

      const data = await service.getAll();
      expect(data.length).toEqual(0);
    });
  });

  describe('getById()', () => {
    it('should return a project by ID', async () => {
      jest
        .spyOn(prismaService.project, 'findUnique')
        .mockResolvedValue({ id: '123', name: 'Aymme', slug: 'aymme', configurationId: '324' });

      const data = await service.getById('123');

      expect(data.id).toEqual('123');
      expect(data.slug).toEqual('aymme');
    });

    it('should throw a NotFoundException if there are no records with the provided ID', async () => {
      jest.spyOn(prismaService.project, 'findUnique').mockResolvedValue(null);
      expect.assertions(1);

      try {
        await service.getById('123');
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('getBySlug()', () => {
    it('should return a project by Slug', async () => {
      jest
        .spyOn(prismaService.project, 'findUnique')
        .mockResolvedValue({ id: '123', name: 'Aymme', slug: 'aymme', configurationId: '324' });

      const data = await service.getBySlug('aymme');

      expect(data.id).toEqual('123');
      expect(data.slug).toEqual('aymme');
    });

    it('should throw a NotFoundException if there are no records with the provided Slug', async () => {
      jest.spyOn(prismaService.project, 'findUnique').mockResolvedValue(null);
      expect.assertions(1);

      try {
        await service.getBySlug('aymme');
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create()', () => {
    it('should create a project and return the entity', async () => {
      const result = { id: '123', name: 'Aymme', slug: 'aymme', configurationId: '324' };
      const name = 'Aymme';
      jest.spyOn(prismaService.project, 'findFirst').mockResolvedValue(null);
      jest.spyOn(prismaService.project, 'create').mockResolvedValue(result);

      const project = await service.create({ name });
      expect(project.name).toEqual(name);
      expect(project.slug).toEqual(result.slug);
    });

    it('should throw a ConflictException if the record already exists', async () => {
      const result = { id: '123', name: 'Aymme', slug: 'aymme', configurationId: '324' };
      const name = 'Aymme';
      jest.spyOn(prismaService.project, 'findFirst').mockResolvedValue(result);
      jest.spyOn(prismaService.project, 'create').mockResolvedValue(null);

      expect.assertions(1);

      try {
        await service.create({ name });
      } catch (e) {
        expect(e).toBeInstanceOf(ConflictException);
      }
    });

    it('should throw an error if create fails', async () => {
      const name = 'Aymme';
      jest.spyOn(prismaService.project, 'findFirst').mockResolvedValue(null);
      jest.spyOn(prismaService.project, 'create').mockRejectedValue('');

      expect.assertions(1);

      try {
        await service.create({ name });
      } catch (e) {
        expect(e).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });

  describe('update()', () => {
    it('should update a Project', async () => {
      const result = {
        id: '123',
        name: 'Aymme',
        slug: 'aymme',
        configurationId: '324',
        configuration: { ignoreParams: '', id: '334' },
      };
      jest.spyOn(service, 'getById').mockResolvedValue(result);
      jest.spyOn(prismaService.project, 'update').mockResolvedValue({ ...result, name: 'New Name', slug: 'new-name' });

      const project = await service.update('123', { name: 'New Name' });

      expect(project.name).toEqual('New Name');
      expect(project.slug).toEqual('new-name');
    });
  });
});
