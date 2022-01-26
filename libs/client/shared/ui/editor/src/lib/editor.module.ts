import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor';
import { EditorComponent } from './editor.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';

export function onMonacoLoad() {
  console.log((window as any).monaco);
  // (window as any).monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
  //   validate: true,
  // });
}

const monacoConfig: NgxMonacoEditorConfig = {
  onMonacoLoad,
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MonacoEditorModule.forRoot(monacoConfig),
    ButtonModule,
    RippleModule,
    TooltipModule,
  ],
  declarations: [EditorComponent],
  exports: [EditorComponent],
})
export class EditorModule {}
