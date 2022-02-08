import { Subscription } from 'rxjs';

import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Error } from '@Models/error.model';
import { ErrorFacade } from '@Store/error/error.facade';
import { ErrorsState } from '@Store/error/errors-state';

@Component({
  selector: 'ay-error-toast',
  templateUrl: './error-toast.component.html',
  styleUrls: ['./error-toast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorToastComponent implements OnInit, OnDestroy {
  private errorSubscription: Subscription | null = null;

  public constructor(
    private readonly errorFacade: ErrorFacade,
  ) {
  }

  public ngOnInit(): void {
    this.errorSubscription = this.errorFacade.errors$.subscribe((errors: ErrorsState): void => {
      errors.forEach((error: Error): void => {
        console.log('//TODO: log this?')
      });
    });
  }

  public ngOnDestroy(): void {
    this.errorSubscription?.unsubscribe();
  }
}
