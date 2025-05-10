import { Component, OnInit, HostListener, Renderer2, ElementRef, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule,CommonModule], // Required for routerLink, routerLinkActive, and routerLinkActiveOptions
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isMenuOpen = false;
  scrollProgress = 0;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    this.checkScrollPosition();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.checkScrollPosition();
    this.updateScrollProgress();
  }

  private checkScrollPosition(): void {
    const navbar = this.el.nativeElement.querySelector('.navbar');
    if (navbar) {
      this.renderer.setProperty(navbar, 'className', window.scrollY > 50 ? 'navbar scrolled' : 'navbar');
    }
  }

  private updateScrollProgress(): void {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (windowHeight > 0) {
      this.scrollProgress = (window.scrollY / windowHeight) * 100;
      const progressBar = this.el.nativeElement.querySelector('.scroll-progress');
      if (progressBar) {
        this.renderer.setStyle(progressBar, 'width', `${this.scrollProgress}%`);
      }
    }
  }

  closeMenu(): void {
    if (this.isMenuOpen) {
      this.isMenuOpen = false;
    }
  }
}