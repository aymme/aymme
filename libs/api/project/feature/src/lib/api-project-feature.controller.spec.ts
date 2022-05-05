import { Test } from '@nestjs/testing';
import { ApiProjectFeatureController } from './api-project-feature.controller';
import { ProjectService } from '@aymme/api/project/data-access';
import { Project, ProjectConfiguration } from '@prisma/client';
import { BadRequestException } from '@nestjs/common';

const EXAMPLE_PROJECT_ID = '8a9bedb8-f8f7-4410-ad2d-55a1c14c59dc';
const EXAMPLE_PROJECT_NEW_NAME = 'Aymme Dev';
const EXAMPLE_PROJECT_NEW_CONFIGURATION: Partial<ProjectConfiguration> = { ignoreParams: 'authToken' };

const EXAMPLE_PROJECT: Project & { configuration: ProjectConfiguration } = {
  id: EXAMPLE_PROJECT_ID,
  name: 'Aymme',
  slug: 'aymme',
  configuration: {
    id: 'e993289e-57c0-44ef-8fa7-8f21e24563c1',
    ignoreParams: 'refreshToken',
    projectId: EXAMPLE_PROJECT_ID,
  },
};

const EXAMPLE_PROJECTS: Project[] = [EXAMPLE_PROJECT];

const projectServiceGetAllProjectsMock = jest.fn(() => EXAMPLE_PROJECTS);
const projectServiceGetProjectMock = jest.fn(() => EXAMPLE_PROJECT);
const projectServiceCreateProjectMock = jest.fn(() => ({ ...EXAMPLE_PROJECT, name: EXAMPLE_PROJECT_NEW_NAME }));
const projectServiceUpdateProjectMock = jest.fn(() => ({ ...EXAMPLE_PROJECT, name: EXAMPLE_PROJECT_NEW_NAME }));
const projectServiceUpdateProjectConfigurationMock = jest.fn(() => ({
  ...EXAMPLE_PROJECT,
  configuration: { ...EXAMPLE_PROJECT.configuration, ...EXAMPLE_PROJECT_NEW_CONFIGURATION },
}));
const projectServiceDeleteProjectMock = jest.fn();
const projectServiceExportProjectMock = jest.fn(() => EXAMPLE_PROJECT);
const projectServiceImportProjectMock = jest.fn();

describe('ApiProjectFeatureController', () => {
  let controller: ApiProjectFeatureController;
  let service: ProjectService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [ApiProjectFeatureController],
      providers: [
        {
          provide: ProjectService,
          useClass: jest.fn(() => ({
            getAll: projectServiceGetAllProjectsMock,
            getById: projectServiceGetProjectMock,
            create: projectServiceCreateProjectMock,
            update: projectServiceUpdateProjectMock,
            updateConfiguration: projectServiceUpdateProjectConfigurationMock,
            delete: projectServiceDeleteProjectMock,
            exportProject: projectServiceExportProjectMock,
            importProject: projectServiceImportProjectMock,
          })),
        },
      ],
    }).compile();

    controller = module.get(ApiProjectFeatureController);
    service = module.get(ProjectService);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });

  describe('getAll()', () => {
    it('should return a list of projects', async () => {
      const data = await controller.getAll();

      expect(data.length).toBeGreaterThan(0);
      expect(data[0].name).toEqual(EXAMPLE_PROJECT.name);
    });
  });

  describe('getById()', () => {
    it('should return a project', async () => {
      const data = await controller.getById(EXAMPLE_PROJECT_ID);

      expect(data.id).toEqual(EXAMPLE_PROJECT_ID);
      expect(data).toEqual(EXAMPLE_PROJECT);
      expect(projectServiceGetProjectMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('create()', () => {
    it('should create a new project', async () => {
      const data = await controller.create({ name: EXAMPLE_PROJECT_NEW_NAME });

      expect(data.name).toEqual(EXAMPLE_PROJECT_NEW_NAME);
      expect(projectServiceCreateProjectMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('update()', () => {
    it('should update an existing project', async () => {
      const data = await controller.update(EXAMPLE_PROJECT_ID, { name: EXAMPLE_PROJECT_NEW_NAME });

      expect(data.name).toEqual(EXAMPLE_PROJECT_NEW_NAME);
      expect(projectServiceUpdateProjectMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateConfiguration()', () => {
    it('should update the configuration of existing project', async () => {
      const data = await controller.updateConfiguration(EXAMPLE_PROJECT_ID, { ...EXAMPLE_PROJECT_NEW_CONFIGURATION });

      expect(data.configuration.ignoreParams).toEqual(EXAMPLE_PROJECT_NEW_CONFIGURATION.ignoreParams);
      expect(projectServiceUpdateProjectConfigurationMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('delete()', () => {
    it('should delete a project', async () => {
      await controller.delete(EXAMPLE_PROJECT_ID);

      expect(projectServiceDeleteProjectMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('exportProject()', () => {
    it('should return a project', async () => {
      const data = await controller.getExport(EXAMPLE_PROJECT_ID);

      expect(data.id).toEqual(EXAMPLE_PROJECT_ID);
      expect(projectServiceExportProjectMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('importProject()', () => {
    it('should import a project from a file', async () => {
      const file: Express.Multer.File = {
        destination: '',
        encoding: '',
        fieldname: '',
        filename: '',
        size: 200,
        stream: undefined,
        originalname: 'mock',
        mimetype: 'application/json',
        path: 'mock',
        buffer: Buffer.from('{}'),
      };
      await controller.importProject(EXAMPLE_PROJECT_ID, file);

      expect(projectServiceImportProjectMock).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if the correct file is not specified', async () => {
      const file: Express.Multer.File = {
        destination: '',
        encoding: '',
        fieldname: '',
        filename: '',
        size: 200,
        stream: undefined,
        originalname: 'mock',
        mimetype: 'text/html',
        path: 'mock',
        buffer: Buffer.from('{}'),
      };

      expect.assertions(1);

      try {
        await controller.importProject(EXAMPLE_PROJECT_ID, file);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
      }
    });
  });
});
