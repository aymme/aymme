import { Component, Inject } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectsEntity, ProjectsFacade } from '@aymme/client/projects/data-access';
import { delay, map } from 'rxjs';

interface ProjectConfiguration {
  projectId: string;
}

@Component({
  selector: 'ay-project-configuration',
  templateUrl: 'project-configuration-dialog.html',
})
export class ProjectConfigurationDialogComponent {
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

  projectConfiguration = new FormGroup({
    queryParam: new FormControl(),
  });

  constructor(
    public dialogRef: MatDialogRef<ProjectConfigurationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProjectConfiguration,
    private projectsFacade: ProjectsFacade
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  saveProjectConfiguration() {
    this.projectsFacade.updateProjectConfiguration();
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
