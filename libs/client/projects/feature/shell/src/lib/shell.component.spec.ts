import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectsFacade } from '@aymme/client/projects/data-access';
import { RouterTestingModule } from '@angular/router/testing';
import { ShellComponent } from './shell.component';

describe('ShellComponentComponent', () => {
  let component: ShellComponent;
  let fixture: ComponentFixture<ShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ShellComponent],
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
    fixture = TestBed.createComponent(ShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
