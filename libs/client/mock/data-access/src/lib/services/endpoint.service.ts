import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EndpointEntity } from '@aymme/client/mock/data-access';

@Injectable({
  providedIn: 'root',
})
export class EndpointService {
  constructor(private http: HttpClient) {}

  getEndpointDetails(id: string, projectId: string): Observable<EndpointEntity> {
    return this.http.get<EndpointEntity>(`/api/projects/${projectId}/endpoints/${id}`);
  }
}
