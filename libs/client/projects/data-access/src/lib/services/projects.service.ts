import { map } from 'rxjs/operators';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG, AppConfig } from '@aymme/client/shared/app-config';

import { ProjectsEntity } from '../store/projects/projects.models';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private apiFeatureKey = '/projects';
  private apiURL = this.appConfig.baseURL + this.apiFeatureKey;

  constructor(@Inject(APP_CONFIG) private appConfig: AppConfig, private http: HttpClient) {}

  getProjects() {
    return this.http.get<ProjectsEntity[]>(`${this.apiURL}`)
      .pipe(
        map((response) => {
          return response
        })
      );
  }
}
