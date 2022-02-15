import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[ayClickAway]',
})
export class ClickawayDirective {
  @Output() clickOutside = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) {
    console.log('test?');
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(target: any) {
    const clickedInside = this.elementRef.nativeElement.contains(target);

    console.log('clicked?/');

    if (!clickedInside) {
      this.clickOutside.emit();
    }
  }
}
