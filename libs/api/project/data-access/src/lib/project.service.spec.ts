import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Project } from '@prisma/client';
import { PrismaService } from '@aymme/api/database/data-access';
import { ProjectService } from './project.service';

const EXAMPLE_PROJECT: Project = {
  id: '8a9bedb8-f8f7-4410-ad2d-55a1c14c59dc',
  name: 'Aymme',
  slug: 'aymme',
};

const EXAMPLE_PROJECTS: Project[] = [EXAMPLE_PROJECT];
const EXAMPLE_NEW_PROJECT_NAME = 'Instagram';
const EXAMPLE_NEW_PROJECT_SLUG = 'instagram';

const prismaProjectFindManyMock = jest.fn(() => {
  return EXAMPLE_PROJECTS;
});

const prismaProjectFindUniqueMock = jest.fn(() => {
  return EXAMPLE_PROJECT;
});

const prismaProjectFindFirstMock = jest.fn(() => null);

const prismaProjectCreateMock = jest.fn(() => EXAMPLE_PROJECT);
const prismaProjectUpdateMock = jest.fn(() => ({
  ...EXAMPLE_PROJECT,
  name: EXAMPLE_NEW_PROJECT_NAME,
  slug: EXAMPLE_NEW_PROJECT_SLUG,
}));

describe('ProjectService', () => {
  let service: ProjectService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    jest.clearAllMocks();
    prismaProjectFindUniqueMock.mockImplementation(() => EXAMPLE_PROJECT);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectService,
        {
          provide: PrismaService,
          useClass: jest.fn(() => ({
            project: {
              findMany: prismaProjectFindManyMock,
              findUnique: prismaProjectFindUniqueMock,
              findFirst: prismaProjectFindFirstMock,
              create: prismaProjectCreateMock,
              update: prismaProjectUpdateMock,
            },
          })),
        },
      ],
    }).compile();

    service = module.get<ProjectService>(ProjectService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll()', () => {
    it('should get all projects and the corresponding configuration', async () => {
      const data = await service.getAll();
      expect(data.length).toBeGreaterThan(0);
      expect(data[0].name).toEqual(EXAMPLE_PROJECTS[0].name);
      expect(prismaProjectFindManyMock).toHaveBeenCalledTimes(1);
    });

    it('should return an empty array if there are no projects found', async () => {
      jest.spyOn(prismaService.project, 'findMany').mockResolvedValue([]);

      const data = await service.getAll();
      expect(data.length).toEqual(0);
    });
  });

  describe('getById()', () => {
    it('should return a project by ID', async () => {
      const data = await service.getById(EXAMPLE_PROJECT.id);

      expect(data.id).toEqual(EXAMPLE_PROJECT.id);
      expect(data.slug).toEqual(EXAMPLE_PROJECT.slug);
      expect(prismaProjectFindUniqueMock).toHaveBeenCalledTimes(1);
    });

    it('should throw a NotFoundException if there are no records with the provided ID', async () => {
      prismaProjectFindUniqueMock.mockImplementation(() => null);
      expect.assertions(1);

      try {
        await service.getById(EXAMPLE_PROJECT.id);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('getBySlug()', () => {
    it('should return a project by slug', async () => {
      const data = await service.getBySlug(EXAMPLE_PROJECT.slug);

      expect(data.id).toEqual(EXAMPLE_PROJECT.id);
      expect(data.slug).toEqual(EXAMPLE_PROJECT.slug);
      expect(prismaProjectFindUniqueMock).toHaveBeenCalledTimes(1);
    });

    it('should throw a NotFoundException if there are no records with the provided Slug', async () => {
      prismaProjectFindUniqueMock.mockImplementation(() => null);
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
      const name = EXAMPLE_PROJECT.name;

      const project = await service.create({ name });

      expect(project.name).toEqual(name);
      expect(project.slug).toEqual(EXAMPLE_PROJECT.slug);
      expect(prismaProjectFindFirstMock).toHaveBeenCalledTimes(1);
      expect(prismaProjectCreateMock).toHaveBeenCalledTimes(1);
    });

    it('should throw a ConflictException if the record already exists', async () => {
      const name = EXAMPLE_PROJECT.name;
      prismaProjectFindFirstMock.mockImplementation(() => EXAMPLE_PROJECT);
      prismaProjectCreateMock.mockImplementation(() => null);

      expect.assertions(1);

      try {
        await service.create({ name });
      } catch (e) {
        expect(e).toBeInstanceOf(ConflictException);
      }
    });

    it('should throw an error if create fails', async () => {
      const name = EXAMPLE_PROJECT.name;
      prismaProjectFindFirstMock.mockImplementation(() => null);
      prismaProjectCreateMock.mockImplementation(() => {
        throw new InternalServerErrorException();
      });

      await expect(service.create({ name })).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('update()', () => {
    it('should update a Project', async () => {
      jest.spyOn(service, 'getById').mockResolvedValue({
        ...EXAMPLE_PROJECT,
        configuration: { id: '', ignoreParams: '', projectId: '' },
      });
      // jest.spyOn(prismaService.project, 'update').mockResolvedValue({ ...result, name: 'New Name', slug: 'new-name' });

      const project = await service.update(EXAMPLE_PROJECT.id, { name: EXAMPLE_NEW_PROJECT_NAME });

      expect(project.name).toEqual(EXAMPLE_NEW_PROJECT_NAME);
      expect(project.slug).toEqual(EXAMPLE_NEW_PROJECT_SLUG);
    });
  });
});
