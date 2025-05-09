// src/app/services/animation.service.ts

import { Injectable } from '@angular/core';
import { AnimationBuilder, AnimationFactory, style, animate } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  constructor(private animationBuilder: AnimationBuilder) {}

  // Create reusable animation factories
  createFadeInAnimation(duration: string = '500ms', delay: string = '0ms'): AnimationFactory {
    return this.animationBuilder.build([
      style({ opacity: 0 }),
      animate(`${duration} ${delay} ease-out`, style({ opacity: 1 }))
    ]);
  }

  createSlideUpAnimation(duration: string = '500ms', delay: string = '0ms', distance: string = '20px'): AnimationFactory {
    return this.animationBuilder.build([
      style({ opacity: 0, transform: `translateY(${distance})` }),
      animate(
        `${duration} ${delay} cubic-bezier(0.33, 1, 0.68, 1)`, 
        style({ opacity: 1, transform: 'translateY(0)' })
      )
    ]);
  }

  createSlideInRightAnimation(duration: string = '500ms', delay: string = '0ms', distance: string = '50px'): AnimationFactory {
    return this.animationBuilder.build([
      style({ opacity: 0, transform: `translateX(${distance})` }),
      animate(
        `${duration} ${delay} cubic-bezier(0.33, 1, 0.68, 1)`, 
        style({ opacity: 1, transform: 'translateX(0)' })
      )
    ]);
  }

  // Method to create staggered animations for lists
  createStaggerAnimation(items: HTMLElement[], staggerTime: number = 100): void {
    items.forEach((item, index) => {
      const delay = index * staggerTime;
      
      // Initial styles
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
      
      // Animation
      setTimeout(() => {
        item.style.transition = 'opacity 500ms ease-out, transform 500ms cubic-bezier(0.33, 1, 0.68, 1)';
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }, delay);
    });
  }

  // Apply scroll-based animations
  setupScrollAnimations(): void {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          const animationType = element.dataset['animationType'] || 'fade-in';
          
          element.classList.add('animated', animationType);
          observer.unobserve(element);
        }
      });
    }, observerOptions);

    // Observe all elements with data-animate attribute
    document.querySelectorAll('[data-animate]').forEach(element => {
      observer.observe(element);
    });
  }
}