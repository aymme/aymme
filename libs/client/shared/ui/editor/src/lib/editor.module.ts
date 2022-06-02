import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor';
import { EditorComponent } from './editor.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

export function onMonacoLoad() {
  // (window as any).monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
  //   validate: true,
  // });
}

const monacoConfig: NgxMonacoEditorConfig = {
  onMonacoLoad,
};

@NgModule({
  imports: [CommonModule, FormsModule, MonacoEditorModule.forRoot(monacoConfig), FontAwesomeModule],
  declarations: [EditorComponent],
  exports: [EditorComponent],
})
export class EditorModule {}
