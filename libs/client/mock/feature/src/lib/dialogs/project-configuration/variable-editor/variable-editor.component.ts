import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ay-variable-editor',
  templateUrl: 'variable-editor.html',
  styleUrls: ['variable-editor.scss']
})
export class VariableEditorComponent implements OnInit {

  @Input()
  variables: string;

  editor: any;
  code: string;
  editorOptions = { theme: 'vs-dark', language: 'json', minimap: { enabled: false }, automaticLayout: true };

  ngOnInit() {
    this.code = this.variables;
  }

  get value() {
    return this.code;
  }

  format() {
    this.editor.trigger('format', 'editor.action.formatDocument');
  }

  onEditorInit(editor: any) {
    this.editor = editor;
    setTimeout(() => this.format(), 20);

    this.editor.onDidBlurEditorWidget(() => {
      this.format();
    });

    this.editor.onDidPaste(() => {
      this.format();
    });
  }

}
