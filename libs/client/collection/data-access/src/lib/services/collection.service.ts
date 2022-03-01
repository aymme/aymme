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
    return this.http.put<CollectionsEntity>(
      `/api${this.apiFeatureKey}/fd0dffa5-dc40-4459-a3ff-d77d02e32b82/collections`,
      data
    );
  }
}
