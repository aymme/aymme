import { ProjectGuard } from './project.guard';
import { ProjectService } from '@aymme/api/project/data-access';

describe('ProjectGuard', () => {
  it('should be defined', () => {
    const serviceStub = {};
    expect(new ProjectGuard(serviceStub as ProjectService)).toBeDefined();
  });
});
