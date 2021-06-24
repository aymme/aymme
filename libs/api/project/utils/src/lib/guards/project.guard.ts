import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { ProjectService } from '@aymme/api/project/data-access';

@Injectable()
export class ProjectGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const projectId = request['headers']['aymme-project-id'];

    if (!projectId) {
      throw new BadRequestException(
        'The request is missing the project ID in the header'
      );
    }

    const project = await this.projectService.getById(projectId);
    request.project = project;

    return !!project;
  }

  constructor(private projectService: ProjectService) {}
}
