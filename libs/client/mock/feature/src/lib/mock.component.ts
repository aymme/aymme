import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { CollectionsEntity, CollectionsFacade } from '@aymme/client/collection/data-access';
import { ProjectsEntity, ProjectsFacade } from '@aymme/client/projects/data-access';
import { EndpointFacade } from '@aymme/client/mock/data-access';
import { EndpointEntity, ResponseEntity } from '@aymme/client/mock/model';

@Component({
  selector: 'ay-mock',
  templateUrl: './mock.component.html',
  styleUrls: ['./mock.component.scss'],
  providers: [],
})
export class MockComponent {
  projectId: string = this.route.snapshot.parent?.parent?.params.projectId;
  form: FormGroup = this.fb.group({
    configuration: this.fb.group({
      delay: null,
      emptyArray: null,
      activeStatusCode: null,
      headers: this.fb.array([]),
    }),

    responses: this.fb.array([]),
  });

  loaded$: Observable<boolean> = this.collectionsFacade.loaded$;
  collections$: Observable<CollectionsEntity[]> = this.collectionsFacade.allCollections$;
  selectedProject$: Observable<ProjectsEntity | undefined> = this.projectsFacade.selectedProject$;
  availableStatusCodes$: Observable<ResponseEntity[] | undefined> = this.endpointFacade.availableStatusCodes$.pipe();
  activeStatusCode$: Observable<ResponseEntity | undefined> = this.endpointFacade.activeStatusCode$;
  endpoint$: Observable<EndpointEntity | undefined> = this.endpointFacade.endpoint$.pipe(
    tap((endpoint) => this._initializeForm(endpoint))
  );

  selectedResponseBody: string | undefined;
  selectedResponseId: string | number | undefined;

  constructor(
    private route: ActivatedRoute,
    private collectionsFacade: CollectionsFacade,
    private projectsFacade: ProjectsFacade,
    private endpointFacade: EndpointFacade,
    private fb: FormBuilder
  ) {
    this.collectionsFacade.init(this.projectId);
  }

  updateEndpoint() {
    this.endpointFacade.updateEndpoint({
      ...this.configurationForm.value,
      delay: Number(this.configurationForm.value['delay']),
      responses: [...this.responseArrayForm.value],
    });
  }

  onEndpointSelect(id: string) {
    this.endpointFacade.loadEndpoint(id);
  }

  onViewResponseBody(index: number) {
    this.selectedResponseId = index;
    this.selectedResponseBody = this.responseArrayForm.at(index).get('body')?.value;
  }

  onUpdateResponse(content: string) {
    this.responseArrayForm.at(Number(this.selectedResponseId)).patchValue({
      body: content,
    });
  }

  get configurationForm(): FormGroup {
    return this.form.get('configuration') as FormGroup;
  }

  get responseArrayForm(): FormArray {
    return this.form.get('responses') as FormArray;
  }

  private _initializeForm(endpoint: EndpointEntity | undefined) {
    if (endpoint) {
      this.configurationForm.patchValue({
        delay: endpoint?.delay,
        emptyArray: endpoint?.emptyArray,
        activeStatusCode: endpoint?.activeStatusCode,
      });

      (this.configurationForm.get('headers') as FormArray).clear();

      endpoint?.headers?.forEach((header) =>
        (this.configurationForm.get('headers') as FormArray).push(
          this.fb.group({
            name: [header.name, [Validators.required]],
            value: [header.value, [Validators.required]],
          })
        )
      );

      this.responseArrayForm.clear();

      endpoint?.responses?.forEach((response) => {
        this.responseArrayForm.push(
          this.fb.group({
            id: response.id,
            statusCode: response.statusCode,
            body: response.body,
          })
        );
      });
    }
  }
}
