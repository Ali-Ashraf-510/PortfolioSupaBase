import { Component } from '@angular/core';
import { AboutComponent } from "../about/about.component";
import { ContactComponent } from "../contact/contact.component";
import { CommonModule } from '@angular/common';
import { TextAnimationDirective } from '../../directives/text-animation.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AboutComponent, ContactComponent, CommonModule, TextAnimationDirective],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'] // تعديل هنا (styleUrl -> styleUrls)
})
export class HomeComponent {}
