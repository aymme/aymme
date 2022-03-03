import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CollectionsEntity } from '../store';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  private apiFeatureKey = '/projects';

  constructor(private http: HttpClient) {}

  getAll(projectId: string): Observable<CollectionsEntity[]> {
    return this.http.get<CollectionsEntity[]>(`/api/${this.apiFeatureKey}/${projectId}/collections`);
  }

  updateCollections(projectId: string, data: any) {
    return this.http.put<CollectionsEntity>(`/api${this.apiFeatureKey}/${projectId}/collections`, data);
  }

  createNewCollection(projectId: string, name: string) {
    return this.http.post<CollectionsEntity>(`/api${this.apiFeatureKey}/${projectId}/collections`, {
      name,
    });
  }

  deleteCollection(collection: CollectionsEntity) {
    return this.http.delete<CollectionsEntity>(
      `/api${this.apiFeatureKey}/${collection.projectId}/collections/${collection.id}`
    );
  }
}
