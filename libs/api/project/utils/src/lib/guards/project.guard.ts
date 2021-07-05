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
    const slug = request['headers']['aymme-project-id'];

    if (!slug) {
      throw new BadRequestException(
        'The request is missing the project ID in the header'
      );
    }

    const project = await this.projectService.getBySlug(slug);
    request.project = project;

    return !!project;
  }

  constructor(private projectService: ProjectService) {}
}
