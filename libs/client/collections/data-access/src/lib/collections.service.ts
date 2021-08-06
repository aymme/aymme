import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CollectionsEntity } from '@aymme/client/collections/data-access';

@Injectable({
  providedIn: 'root',
})
export class CollectionsService {
  getAllCollections(projectId: string): Observable<CollectionsEntity[]> {
    return this.http.get<CollectionsEntity[]>(
      `/api/projects/${projectId}/collections`
    );
  }

  constructor(private http: HttpClient) {}
}
