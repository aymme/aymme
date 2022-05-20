import { ClickawayDirective } from './clickaway.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, ElementRef } from '@angular/core';
import { By } from '@angular/platform-browser';

class MockElementRef extends ElementRef {}

@Component({
  template: `<div ayClickAway></div>`,
})
class TestClickAwayComponent {}

describe('ClickawayDirective', () => {
  let component: TestClickAwayComponent;
  let fixture: ComponentFixture<TestClickAwayComponent>;
  let inputEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClickawayDirective, TestClickAwayComponent],
      providers: [
        {
          provide: ElementRef,
          useClass: MockElementRef,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestClickAwayComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('div'));
  });

  it('should create an instance', () => {
    // const directive = new ClickawayDirective();
    expect(component).toBeTruthy();
  });
});
