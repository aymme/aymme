import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CollectionsEntity } from '../store';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  constructor(private http: HttpClient) {}

  getAll(projectId: string): Observable<CollectionsEntity[]> {
    return this.http.get<CollectionsEntity[]>(
      `/api/projects/${projectId}/collections`
    );
  }
}
