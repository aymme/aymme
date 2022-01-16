import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EndpointEntity } from '@aymme/client/mock/model';

@Injectable({
  providedIn: 'root',
})
export class EndpointService {
  constructor(private http: HttpClient) {}

  getEndpointDetails(id: string, projectId: string): Observable<EndpointEntity> {
    return this.http.get<EndpointEntity>(`/api/projects/${projectId}/endpoints/${id}`);
  }

  updateEndpoint(id: string, projectId: string, data: Partial<EndpointEntity>) {
    return this.http.put<EndpointEntity>(`/api/projects/${projectId}/endpoints/${id}`, data);
  }
}
