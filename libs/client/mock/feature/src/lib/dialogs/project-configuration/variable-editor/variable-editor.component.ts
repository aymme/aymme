import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'ay-variable-editor',
  templateUrl: 'variable-editor.html',
  styleUrls: ['variable-editor.scss']
})
export class VariableEditorComponent {

  formGroup = this.formBuilder.group(
    {variables: this.formBuilder.array([])}
  );

  @Input()
  set variables(v: string) {
    const object = JSON.parse(v);
    this.formArray.clear();
    Object.keys(object).map(key => ({key: key, value: object[key]})).forEach(item => this.addNewItemToFormArray(item));
  }

  constructor(private formBuilder: FormBuilder) {}

  get value(): string {
    const object: any = {};
    for (const item of this.formArray.value) {
      const {key, value} = item;
      if (key && value) {
        object[key] = value;
      }
    }
    return JSON.stringify(object);
  }

  getSubFormGroupAtIndex(index: number): FormGroup {
    return this.formArray.controls[index] as FormGroup;
  }

  get formArray(): FormArray {
    return this.formGroup.get('variables') as FormArray;
  }

  addNewItemToFormArray(item?: {key: string; value: string}) {
    this.formArray.push(this.formBuilder.group(item || {key: '', value: ''}));
  }

  removeAtIndex(index: number) {
    this.formArray.removeAt(index);
  }

}
