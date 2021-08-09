import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EndpointsEntity } from './store/endpoints/endpoints.models';

@Injectable({
  providedIn: 'root',
})
export class EndpointsService {
  constructor(private http: HttpClient) {}

  getAllEndpoints(projectId: string): Observable<EndpointsEntity[]> {
    return this.http.get<EndpointsEntity[]>(
      `/api/projects/${projectId}/endpoints`
    );
  }

  getById(projectId: string, endpointId: string): Observable<EndpointsEntity> {
    return this.http.get<EndpointsEntity>(
      `/api/projects/${projectId}/endpoints/${endpointId}`
    );
  }
}
