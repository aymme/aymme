import { Component } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { EndpointFacade } from '@aymme/client/mock/data-access';
import { EndpointEntity, ResponseEntity } from '@aymme/client/mock/model';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'aymme-endpoint-details',
  templateUrl: './endpoint-details.component.html',
  styles: [],
})
export class EndpointDetailsComponent {
  form: UntypedFormGroup = this.fb.group({
    configuration: this.fb.group({
      delay: null,
      emptyArray: null,
      activeStatusCode: null,
      headers: this.fb.array([]),
      forward: null,
    }),

    responses: this.fb.array([]),
  });

  selectedResponseBody: string | undefined;
  selectedResponseId: string | number | undefined;

  endpointLoaded$: Observable<boolean | null> = this.endpointFacade.loaded$;
  availableStatusCodes$: Observable<ResponseEntity[] | undefined> = this.endpointFacade.availableStatusCodes$;
  activeStatusCode$: Observable<ResponseEntity | undefined> = this.endpointFacade.activeStatusCode$;
  endpoint$: Observable<EndpointEntity | undefined> = this.endpointFacade.endpoint$.pipe(
    tap((endpoint) => this._initializeForm(endpoint))
  );

  constructor(private endpointFacade: EndpointFacade, private fb: UntypedFormBuilder) {}

  updateEndpoint() {
    this.endpointFacade.updateEndpoint({
      ...this.configurationForm.value,
      delay: Number(this.configurationForm.value['delay']),
      responses: [...this.responseArrayForm.value],
    });
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

  isBoolean(val: any): boolean {
    return typeof val === 'boolean';
  }

  get configurationForm(): UntypedFormGroup {
    return this.form.get('configuration') as UntypedFormGroup;
  }

  get responseArrayForm(): UntypedFormArray {
    return this.form.get('responses') as UntypedFormArray;
  }

  private _initializeForm(endpoint: EndpointEntity | undefined) {
    if (endpoint) {
      this.configurationForm.patchValue({
        delay: endpoint?.delay,
        emptyArray: endpoint?.emptyArray,
        forward: endpoint?.forward,
        activeStatusCode: endpoint?.activeStatusCode,
      });

      (this.configurationForm.get('headers') as UntypedFormArray).clear();

      endpoint?.headers?.forEach((header) =>
        (this.configurationForm.get('headers') as UntypedFormArray).push(
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
