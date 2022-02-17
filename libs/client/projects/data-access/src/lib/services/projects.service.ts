import { map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG, AppConfig } from '@aymme/client/shared/app-config';

import { ProjectsEntity } from '../store/projects/projects.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private apiFeatureKey = '/projects';
  private apiURL = this.appConfig.baseURL + this.apiFeatureKey;

  constructor(@Inject(APP_CONFIG) private appConfig: AppConfig, private http: HttpClient) {}

  getProjects() {
    return this.http.get<ProjectsEntity[]>(`/api${this.apiFeatureKey}`).pipe(
      map((response) => {
        return response;
      })
    );
  }

  getProjectById(projectId: string) {
    return this.http.get<ProjectsEntity>(`${this.apiURL}/${projectId}`);
  }

  createNewProject(name: string): Observable<ProjectsEntity> {
    return this.http.post<ProjectsEntity>(`/api${this.apiFeatureKey}`, {
      name,
    });
  }

  deleteProject(id: string) {
    return this.http.delete(`/api/${this.apiFeatureKey}/${id}`);
  }
}
