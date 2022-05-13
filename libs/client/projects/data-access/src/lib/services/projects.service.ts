import { map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG, AppConfig } from '@aymme/client/shared/app-config';

import { ProjectsEntity } from '../store/projects/projects.models';
import { Observable } from 'rxjs';
import { FileSaverService } from 'ngx-filesaver';
import { IProjectConfiguration } from '@aymme/shared/model';

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
    return this.http.get<ProjectsEntity[]>(`${this.apiURL}`).pipe(
      map((response) => {
        return response;
      })
    );
  }

  updateProjectConfiguration(projectId: string, configuration: IProjectConfiguration): Observable<IProjectConfiguration> {
    return this.http.put<IProjectConfiguration>(`${this.apiURL}/${projectId}/configuration`, configuration );
  }

  getProjectById(projectId: string) {
    return this.http.get<ProjectsEntity>(`${this.apiURL}/${projectId}`);
  }

  createNewProject(name: string): Observable<ProjectsEntity> {
    return this.http.post<ProjectsEntity>(`${this.apiURL}`, {
      name,
    });
  }

  deleteProject(id: string) {
    return this.http.delete(`${this.apiURL}/${id}`);
  }

  exportProject(projectId: string): Observable<ProjectsEntity> {
    return this.http.get<ProjectsEntity>(`${this.apiURL}/${projectId}/export`);
  }

  importProject(projectId: string, file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.apiURL}/${projectId}/import`, formData, {});
  }

  saveToFile(data: ProjectsEntity, fileName: string) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    this.fileSaver.save(blob, fileName);
  }
}
