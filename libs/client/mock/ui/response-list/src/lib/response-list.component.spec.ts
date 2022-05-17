import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseListComponent } from './response-list.component';
import { EndpointFacade } from '@aymme/client/mock/data-access';
import { OverlayPanelModule } from '@aymme/client/shell/ui/overlay-panel';

describe('ResponseListComponent', () => {
  let component: ResponseListComponent;
  let fixture: ComponentFixture<ResponseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResponseListComponent],
      imports: [OverlayPanelModule],
      providers: [
        {
          provide: EndpointFacade,
          useValue: {
            addNewResponse: jest.fn(),
            removeResponse: jest.fn(),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
