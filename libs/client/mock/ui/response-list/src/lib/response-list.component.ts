import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ResponseEntity } from '@aymme/client/mock/model';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { availableStatusCodes } from './available-status-codes';

@Component({
  selector: 'ay-response-list',
  templateUrl: './response-list.component.html',
  styleUrls: ['./response-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResponseListComponent {
  @Input() activeStatusCode: ResponseEntity | null | undefined;
  @Input() responseArrayForm: FormArray | undefined;

  @Input()
  set availableStatusCodes(data: ResponseEntity[] | null) {
    if (data) {
      this.responses = data.map((response, index) => ({
        id: response.id,
        label: response.statusCode.toString(),
        command: () => {
          this.showMockFor(index);
        },
      }));
      this.activeItem = this.responses[0];
      this.showMockFor(0);
    }
  }

  @Output() viewResponseBody = new EventEmitter<number>();

  responses: any = [];
  activeItem: any;
  selectedStatusCode!: number;
  availableStatuses = availableStatusCodes;

  addNewResponse(): void {
    this.responseArrayForm?.push(
      new FormGroup({
        statusCode: new FormControl(this.selectedStatusCode),
        body: new FormControl(''),
      })
    );

    const tempArr = [...this.responses];

    tempArr.splice(this.responses.length - 1, 0, {
      label: this.selectedStatusCode.toString(),
      command: () => {
        this.showMockFor(this.responseArrayForm?.value.length - 1);
      },
    });

    this.responses = [...tempArr];
  }

  showMockFor(index: number): void {
    this.activeItem = this.responses[index];
    this.viewResponseBody.emit(index);
  }
}
