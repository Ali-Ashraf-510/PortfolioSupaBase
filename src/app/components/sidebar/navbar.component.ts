// navbar.component.ts

import { Component, OnInit, HostListener, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isMenuOpen = false;
  scrollProgress = 0;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    // Initialize scroll position check on page load
    this.checkScrollPosition();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    
    const navbarMenu = this.el.nativeElement.querySelector('.navbar-menu');
    if (navbarMenu) {
      if (this.isMenuOpen) {
        this.renderer.addClass(navbarMenu, 'active');
      } else {
        this.renderer.removeClass(navbarMenu, 'active');
      }
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.checkScrollPosition();
    this.updateScrollProgress();
  }

  private checkScrollPosition(): void {
    const navbar = this.el.nativeElement.querySelector('.navbar');
    
    if (window.scrollY > 50) {
      this.renderer.addClass(navbar, 'scrolled');
    } else {
      this.renderer.removeClass(navbar, 'scrolled');
    }
  }

  private updateScrollProgress(): void {
    // Calculate scroll progress
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    this.scrollProgress = (window.scrollY / windowHeight) * 100;
    
    // Update progress bar width
    const progressBar = this.el.nativeElement.querySelector('.scroll-progress');
    if (progressBar) {
      this.renderer.setStyle(progressBar, 'width', `${this.scrollProgress}%`);
    }
  }

  // Close menu when clicking on a link (for mobile)
  closeMenu(): void {
    if (this.isMenuOpen) {
      this.toggleMenu();
    }
  }
}