// src/app/directives/text-animation.directive.ts

import { Directive, ElementRef, Input, AfterViewInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTextAnimation]'
})
export class TextAnimationDirective implements AfterViewInit {
  @Input() animationType = 'typewriter'; // Default animation type
  @Input() animationDelay = 0; // Delay in milliseconds
  @Input() animationDuration = 1000; // Duration in milliseconds

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    setTimeout(() => {
      switch (this.animationType) {
        case 'typewriter':
          this.applyTypewriterEffect();
          break;
        case 'fade-in':
          this.applyFadeInEffect();
          break;
        case 'slide-up':
          this.applySlideUpEffect();
          break;
        case 'reveal':
          this.applyRevealEffect();
          break;
        default:
          this.applyTypewriterEffect();
      }
    }, this.animationDelay);
  }

  private applyTypewriterEffect() {
    const element = this.el.nativeElement;
    const text = element.innerText;
    const duration = this.animationDuration;
    
    // Clear the original text
    element.innerText = '';
    
    // Add necessary styles for typewriter effect
    this.renderer.setStyle(element, 'display', 'inline-block');
    this.renderer.setStyle(element, 'white-space', 'nowrap');
    this.renderer.setStyle(element, 'overflow', 'hidden');
    this.renderer.setStyle(element, 'border-right', '3px solid rgba(52, 152, 219, 0.75)');
    this.renderer.setStyle(element, 'width', '0');
    this.renderer.setStyle(element, 'animation', `typewriter ${duration/1000}s steps(${text.length}, end) forwards, blink 0.75s step-end infinite`);
    
    // Create a text node and append
    const textNode = document.createTextNode(text);
    element.appendChild(textNode);
  }

  private applyFadeInEffect() {
    const element = this.el.nativeElement;
    const duration = this.animationDuration;
    
    this.renderer.setStyle(element, 'opacity', '0');
    this.renderer.setStyle(element, 'animation', `fadeIn ${duration/1000}s ease-out forwards`);
  }

  private applySlideUpEffect() {
    const element = this.el.nativeElement;
    const duration = this.animationDuration;
    
    this.renderer.setStyle(element, 'opacity', '0');
    this.renderer.setStyle(element, 'transform', 'translateY(20px)');
    this.renderer.setStyle(element, 'animation', `slideUp ${duration/1000}s cubic-bezier(0.33, 1, 0.68, 1) forwards`);
  }

  private applyRevealEffect() {
    const element = this.el.nativeElement;
    const duration = this.animationDuration;
    const text = element.innerText;
    
    // Store text as data attribute
    element.setAttribute('data-text', text);
    
    // Create wrapper for the reveal effect
    this.renderer.setStyle(element, 'position', 'relative');
    this.renderer.setStyle(element, 'overflow', 'hidden');
    
    // Create overlay element
    const overlay = this.renderer.createElement('span');
    this.renderer.setStyle(overlay, 'position', 'absolute');
    this.renderer.setStyle(overlay, 'top', '0');
    this.renderer.setStyle(overlay, 'right', '0');
    this.renderer.setStyle(overlay, 'width', '100%');
    this.renderer.setStyle(overlay, 'height', '100%');
    this.renderer.setStyle(overlay, 'background-color', '#3498db');
    this.renderer.setStyle(overlay, 'transform-origin', 'right');
    this.renderer.setStyle(overlay, 'animation', `revealText ${duration/1000}s cubic-bezier(0.77, 0, 0.18, 1) forwards`);
    
    // Append overlay to the element
    this.renderer.appendChild(element, overlay);
  }
}