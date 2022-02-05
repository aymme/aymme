import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
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

    this.responses.push({
      icon: 'pi pi-plus',
      title: 'Create a new response',
      command: (event) => {
        this.onCreate(event);
      },
    });
  }
  @Input() activeStatusCode: ResponseEntity | null | undefined;
  @Input() responseArrayForm: FormArray | undefined;

  @Output() viewResponseBody = new EventEmitter<number>();

  responses: MenuItem[] = [];

  availableStatuses = availableStatusCodes;

  activeItem: MenuItem | undefined;
  selectedStatusCode!: number;

  @ViewChild(OverlayPanel, { static: false }) op!: OverlayPanel;

  onCreate(event: any) {
    this.op.toggle(event.originalEvent);
  }

  addNewResponse() {
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

  showMockFor(index: number) {
    this.viewResponseBody.emit(index);
  }
}
