import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ResponseEntity } from '@aymme/client/mock/model';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { availableStatusCodes } from './available-status-codes';
import { OverlayOption } from '@aymme/client/shell/ui/overlay-panel';
import { BehaviorSubject } from 'rxjs';

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
      this.responses = data.map((response) => ({
        id: response.id,
        statusCode: response.statusCode.toString(),
      }));

      // const activeStatusCodeIndex = this.responses.findIndex(
      //   (response: any) => response.statusCode == this.activeStatusCode
      // );

      this.showMockFor(0);
    }
  }

  @Output() viewResponseBody = new EventEmitter<number>();

  responses: any = [];
  activeItem: any;
  selectedStatusCode!: number;
  availableStatuses = availableStatusCodes;
  showOverlayPanel = false;

  addNewResponse(): void {
    this.responseArrayForm?.push(
      new FormGroup({
        statusCode: new FormControl(this.selectedStatusCode),
        body: new FormControl('{ "are-you-mocking-me": "yes" }'),
      })
    );

    this.responses = [
      ...this.responses,
      { statusCode: this.selectedStatusCode, body: '{ "are-you-mocking-me": "yes" }' },
    ];
  }

  showMockFor(index: number): void {
    this.activeItem = this.responses[index];
    this.viewResponseBody.emit(index);
  }

  showOverlayPanelClick(): void {
    this.showOverlayPanel = true;
  }

  hideOverlayPanel() {
    console.log('hi?');
    this.showOverlayPanel = false;
  }

  onSelectedStatusCode(item: OverlayOption): void {
    if (this.getResponseByStatusCode(item.value)) return;

    // TODO: update "Active Status" list with newly added status code.

    this.selectedStatusCode = item.value;
    this.addNewResponse();
    this.showOverlayPanel = false;
    this.showMockFor(this.responses.length - 1);
  }

  private getResponseByStatusCode(statusCode: number): any {
    return this.responses.find((response: any) => response.statusCode == statusCode);
  }
}
