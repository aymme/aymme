import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CollectionsEntity } from '../store';
import { APP_CONFIG, AppConfig } from '@aymme/client/shared/app-config';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  private apiFeatureKey = '/projects';
  private apiURL = this.appConfig.baseURL + this.apiFeatureKey;

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private appConfig: AppConfig) {}

  getAll(projectId: string): Observable<CollectionsEntity[]> {
    return this.http.get<CollectionsEntity[]>(`${this.apiURL}/${projectId}/collections`);
  }

  updateCollections(projectId: string, data: any) {
    return this.http.put<CollectionsEntity>(`${this.apiURL}/${projectId}/collections`, data);
  }

  createNewCollection(projectId: string, name: string) {
    return this.http.post<CollectionsEntity>(`${this.apiURL}/${projectId}/collections`, {
      name,
    });
  }

  deleteCollection(collection: CollectionsEntity) {
    return this.http.delete<CollectionsEntity>(`${this.apiURL}/${collection.projectId}/collections/${collection.id}`);
  }
}
