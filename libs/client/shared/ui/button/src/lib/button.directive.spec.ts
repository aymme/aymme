import { Component, ElementRef, NO_ERRORS_SCHEMA, Renderer2 } from '@angular/core';
import { ButtonColor, ButtonColorValues, ButtonDirective } from './button.directive';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('ButtonDirective', () => {
  let elementRef: ElementRef;
  let renderer: Renderer2;
  let directive: ButtonDirective;

  beforeEach(() => {
    // elementRef = new ElementRef<any>({});
    // renderer = createSpyObject(Renderer2);
    // // renderer = jest.spyOn(Renderer2, 'setAttribute');
    //
    // directive = new ButtonDirective(renderer, elementRef);
  });

  describe('Inside Test component', () => {
    @Component({
      template: `<button ayButton [color]="color">Click here</button>`,
    })
    class TestHostComponent {
      color: ButtonColor | string = 'primary';
    }

    let component: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [],
        declarations: [TestHostComponent, ButtonDirective],
        providers: [],
        schemas: [NO_ERRORS_SCHEMA],
      });

      fixture = TestBed.createComponent(TestHostComponent);
      component = fixture.componentInstance;

      fixture.detectChanges();
    }));

    const util = {
      getButton: () => fixture.debugElement.query(By.css('button[ayButton]')),
    };

    it('should create the component', async () => {
      expect(component).toBeTruthy();
      expect(util.getButton()).toBeTruthy();
    });

    it('should have the primary color classes', async () => {
      const existingClasses = util.getButton().attributes['class'];

      expect(existingClasses).toEqual(ButtonColorValues['primary']);
    });

    it('should have the secondary color classes', async () => {
      component.color = 'secondary';
      fixture.detectChanges();
      expect(util.getButton().attributes['class']).toEqual(ButtonColorValues['secondary']);
    });
  });
});
