import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NgxEditorModel } from 'ngx-monaco-editor';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'ay-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorComponent {
  @Input() set content(data: string) {
    console.log({ data });
    this.code = data;
  }
  @Input() debounce = 500;
  @Output() contentChange = new EventEmitter<string>();

  editorOptions = { theme: 'vs', language: 'json', minimap: { enabled: false }, automaticLayout: true };
  code = '{ "message": "Please update mocks data" }';

  editor: any | undefined;
  dataModel: NgxEditorModel = {
    value: JSON.stringify('{ "message": "Please update mocks data" }', null, '\t'),
    language: 'json',
  };

  content$: Subject<string> = new Subject<string>();

  constructor() {
    this.content$.pipe(debounceTime(this.debounce)).subscribe((content) => this.contentChange.emit(content));
  }

  onEditorInit(editor: any) {
    this.editor = editor;
    editor.trigger('format', 'editor.action.formatDocument');

    // if (!this.dataModel) {
    try {
      this.dataModel = {
        value: JSON.stringify('{ "message": "Please update mocks data" }', null, 2),
        language: 'json',
      };
      // this.cd.detectChanges();
    } catch (e) {
      console.log({ e });
    }
    // }
  }

  format() {
    this.editor.trigger('format', 'editor.action.formatDocument');
  }

  save() {
    console.log(this.code);
    console.log(JSON.parse(this.code));
    console.log(JSON.stringify(this.code, null, 2));
  }

  onChange() {
    console.log(this.code);
    this.content$.next(this.code);
  }
}
