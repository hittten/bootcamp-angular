import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {
  @Input('appTooltip') message: string;
  private tooltipElement;

  constructor(private el: ElementRef<HTMLElement>) {
  }

  @HostListener('mouseenter') onMouseEnter() {
    // create
    this.tooltipElement = document.createElement('div');
    this.tooltipElement.textContent = this.message;

    // style
    this.tooltipElement.style.position = 'absolute';
    this.tooltipElement.style.background = 'black';
    this.tooltipElement.style.color = 'white';
    this.tooltipElement.style.opacity = '0.7';
    this.tooltipElement.style.padding = '5px 10px';
    this.tooltipElement.style.borderRadius = '2px';

    // positioning
    document.body.appendChild(this.tooltipElement);
    const elementRect = this.el.nativeElement.getBoundingClientRect();
    const tooltipRect = this.tooltipElement.getBoundingClientRect();
    this.tooltipElement.style.top = (elementRect.top - elementRect.height + window.scrollY - 10).toString() + 'px';
    this.tooltipElement.style.left = (elementRect.left + (elementRect.width - tooltipRect.width) / 2).toString() + 'px';
  }

  @HostListener('mouseleave') onMouseLeave() {
    document.body.removeChild(this.tooltipElement);
  }
}
