import { Component, Inject, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectsFacade } from '@aymme/client/projects/data-access';
import { delay, map, Subscription } from 'rxjs';

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

  variables: string;

  subscriptions = new Subscription();

  constructor(
    public dialogRef: MatDialogRef<ProjectConfigurationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProjectConfiguration,
    private projectsFacade: ProjectsFacade,
  ) {
    this.subscriptions.add(
      this.selectedProjectConfiguration$.subscribe(configuration => this.variables = configuration?.variables),
    )
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  saveProjectConfiguration() {
    this.projectsFacade.updateProjectConfiguration({ variables: this.variables }, () =>
      this.dialogRef.close()
    );
  }

  addQueryParam() {
    const param: FormArray = this.projectConfiguration.get('queryParam') as FormArray;

    this.projectsFacade.addIgnoreParamToConfiguration(param.value);

    this.projectConfiguration.reset();
  }

  removeQueryParam(queryParam: string) {
    this.projectsFacade.removeIgnoreParamFromConfiguration(queryParam);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
