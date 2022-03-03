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

  updateCollections(data: any) {
    // TODO: make this project ID dynamic
    return this.http.put<CollectionsEntity>(
      `/api${this.apiFeatureKey}/fd0dffa5-dc40-4459-a3ff-d77d02e32b82/collections`,
      data
    );
  }

  createNewCollection(name: any) {
    return this.http.post<CollectionsEntity>(
      `/api${this.apiFeatureKey}/634b7a71-dd60-42a0-9aa4-b91957e159d7/collections`,
      {
        name,
      }
    );
  }

  deleteCollection(collection: CollectionsEntity) {
    return this.http.delete<CollectionsEntity>(
      `/api${this.apiFeatureKey}/634b7a71-dd60-42a0-9aa4-b91957e159d7/collections/${collection.id}`
    );
  }
}
