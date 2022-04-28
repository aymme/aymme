import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EndpointEntity, NewResponseDto, ResponseEntity, UpdateEndpointDto } from '@aymme/client/mock/model';
import { APP_CONFIG, AppConfig } from '@aymme/client/shared/app-config';

@Injectable({
  providedIn: 'root',
})
export class EndpointService {
  private apiFeatureKey = '/projects';
  private apiURL = this.appConfig.baseURL + this.apiFeatureKey;

  constructor(@Inject(APP_CONFIG) private appConfig: AppConfig, private http: HttpClient) {}

  getEndpointDetails(id: string, projectId: string): Observable<EndpointEntity> {
    return this.http.get<EndpointEntity>(`${this.apiURL}/${projectId}/endpoints/${id}`);
  }

  updateEndpoint(id: string, projectId: string, data: UpdateEndpointDto) {
    return this.http.put<EndpointEntity>(`${this.apiURL}/${projectId}/endpoints/${id}`, data);
  }

  removeEndpoint(id: string, projectId: string) {
    return this.http.delete<EndpointEntity>(`${this.apiURL}/${projectId}/endpoints/${id}`);
  }

  addNewResponse(id: string, projectId: string, data: NewResponseDto) {
    return this.http.post<ResponseEntity>(`${this.appConfig.baseURL}/endpoints/${id}/responses`, data);
  }
}
