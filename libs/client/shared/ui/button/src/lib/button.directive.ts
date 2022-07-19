import { Directive, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';

export type ButtonColor = 'primary' | 'secondary';

export const ButtonColorValues: { [Key in ButtonColor as string]: string } = {
  primary:
    'py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800',
  secondary:
    'py-[.688rem] px-4 inline-flex justify-center items-center gap-2 rounded-md border-2 border-gray-200 font-semibold text-blue-500 hover:text-white hover:bg-blue-500 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:border-gray-700 dark:hover:border-blue-500',
};

@Directive({
  selector: 'button[ayButton], input[ayButton]',
})
export class ButtonDirective implements OnInit, OnChanges {
  @Input() color: ButtonColor | string = 'primary';

  constructor(private readonly renderer: Renderer2, private readonly hostElement: ElementRef) {}

  ngOnInit(): void {
    this.renderer.setAttribute(this.hostElement.nativeElement, 'class', ButtonColorValues[this.color]);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['color']) {
      if (changes['color'].currentValue) {
        this.renderer.setAttribute(
          this.hostElement.nativeElement,
          'class',
          ButtonColorValues[changes['color'].currentValue]
        );
      }
    }
  }
}
