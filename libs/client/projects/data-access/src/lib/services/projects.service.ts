import { map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG, AppConfig } from '@aymme/client/shared/app-config';

import { ProjectsEntity } from '../store/projects/projects.models';
import { Observable } from 'rxjs';
import { FileSaverService } from 'ngx-filesaver';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private apiFeatureKey = '/projects';
  private apiURL = this.appConfig.baseURL + this.apiFeatureKey;

  constructor(
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    private http: HttpClient,
    private fileSaver: FileSaverService
  ) {}

  getProjects() {
    return this.http.get<ProjectsEntity[]>(`/api${this.apiFeatureKey}`).pipe(
      map((response) => {
        return response;
      })
    );
  }

  updateProject(project: ProjectsEntity): Observable<ProjectsEntity> {
    const { configuration } = project;

    return this.http.put<ProjectsEntity>(`${this.apiURL}/${project.id}/configuration`, {
      ignoreParams: configuration.ignoreParams,
    });
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

  exportProject(projectId: string): Observable<ProjectsEntity> {
    return this.http.get<ProjectsEntity>(`/api/${this.apiFeatureKey}/${projectId}/export`);
  }

  importProject(projectId: string, file: File) {
    const formData: FormData = new FormData();
    formData.append('files[]', file, file.name);

    return this.http.post(`${this.apiFeatureKey}/${projectId}/import/`, formData, {});
  }

  saveToFile(data: ProjectsEntity, fileName: string) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    this.fileSaver.save(blob, fileName);
  }
}
