import { Component, ElementRef, HostListener, Input, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';

const TOGGLE_CLASS = 'show-tooltip';

@Component({
  selector: 'ay-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TooltipComponent implements OnInit {
  @Input() showIcon = false;
  @Input() title = '';
  @Input() content = '';

  tooltipEl: HTMLElement;
  tooltipWrapperEl: HTMLElement;

  @HostListener('mouseover') onMouseEnter() {
    this.showTooltip();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.hideTooltip();
  }

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.tooltipEl = this.el.nativeElement.querySelector('.tooltip');
    this.tooltipWrapperEl = this.el.nativeElement.querySelector('.tooltip-wrapper');
  }

  showTooltip() {
    const wrapperBounds = this.tooltipWrapperEl.getBoundingClientRect();
    const tooltipBounds = this.tooltipEl.getBoundingClientRect();

    const top = this.tooltipWrapperEl.offsetTop - wrapperBounds.height - 3;
    const left = wrapperBounds.left + wrapperBounds.width / 2 - tooltipBounds.width / 2;

    this.updateElementStyles(top, left);

    this.addHoverClass();
  }

  updateElementStyles(top: number, left: number): void {
    this.renderer.setStyle(this.tooltipEl, 'top', `${top}px`);
    this.renderer.setStyle(this.tooltipEl, 'left', `${left}px`);
  }

  addHoverClass(): void {
    this.renderer.addClass(this.tooltipEl, TOGGLE_CLASS);
  }

  hideTooltip() {
    this.renderer.removeClass(this.tooltipEl, TOGGLE_CLASS);
  }
}
