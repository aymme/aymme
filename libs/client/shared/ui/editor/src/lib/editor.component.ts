import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { NgxEditorModel } from 'ngx-monaco-editor';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'ay-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class EditorComponent {
  @Input() set content(data: string) {
    this.code = data;
  }
  @Input() debounce = 500;
  @Output() contentChange = new EventEmitter<string>();

  editorOptions = { theme: 'vs-dark', language: 'json', minimap: { enabled: false }, automaticLayout: true };
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

    this.editor.onDidBlurEditorWidget(() => {
      this.format();
    });

    this.editor.onDidPaste(() => {
      this.format();
    });
  }

  format() {
    this.editor.trigger('format', 'editor.action.formatDocument');
  }

  onChange() {
    this.content$.next(this.code);
  }
}
