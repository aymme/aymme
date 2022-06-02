import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsComponent } from './projects.component';
import { ProjectsFacade } from '@aymme/client/projects/data-access';
import { RouterTestingModule } from '@angular/router/testing';
import { LoaderModule } from '@aymme/client/shell/ui/loader';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectsComponent],
      imports: [RouterTestingModule, LoaderModule],
      providers: [
        {
          provide: ProjectsFacade,
          useValue: {
            init: jest.fn(),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
