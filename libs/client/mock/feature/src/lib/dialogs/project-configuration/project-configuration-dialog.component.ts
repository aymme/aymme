import { Component, Inject, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectsFacade } from '@aymme/client/projects/data-access';
import { delay, map } from 'rxjs';
import { VariableEditorComponent } from './variable-editor/variable-editor.component';
import { Actions } from '@ngrx/effects';

interface ProjectConfiguration {
  projectId: string;
}

@Component({
  selector: 'ay-project-configuration',
  templateUrl: 'project-configuration-dialog.html',
  styleUrls: ['./project-configuration-dialog.scss'],
})
export class ProjectConfigurationDialogComponent {
  selectedProjectConfiguration$ = this.projectsFacade.selectedProjectConfiguration$;
  selectedProject$ = this.projectsFacade.selectedProject$;
  project$ = this.projectsFacade.selectedProject$.pipe(
    map((project) => {
      return {
        ...project,
        configuration: {
          ...project?.configuration,
          ignoreParams: project?.configuration?.ignoreParams?.split(','),
        },
      };
    })
  );
  loaded$ = this.projectsFacade.loaded$.pipe(delay(500));

  currentTab: 'variables-tab' | 'ignore-query-params-tab' = 'variables-tab';

  projectConfiguration = new FormGroup({
    queryParam: new FormControl(),
  });

  @ViewChild(VariableEditorComponent) variableEditorComponent: VariableEditorComponent;

  constructor(
    public dialogRef: MatDialogRef<ProjectConfigurationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProjectConfiguration,
    private projectsFacade: ProjectsFacade,
    private actions$: Actions,
  ) {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  saveProjectConfiguration() {
    this.projectsFacade.updateProjectConfiguration({variables: this.variableEditorComponent.value}, () => this.dialogRef.close());
  }

  addQueryParam() {
    const param: FormArray = this.projectConfiguration.get('queryParam') as FormArray;

    this.projectsFacade.addIgnoreParamToConfiguration(param.value);

    this.projectConfiguration.reset();
  }

  removeQueryParam(queryParam: string) {
    this.projectsFacade.removeIgnoreParamFromConfiguration(queryParam);
  }
}
