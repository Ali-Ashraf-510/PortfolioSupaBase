// text-animation.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextAnimationDirective } from './text-animation.directive'; // Adjust the path

@NgModule({
  declarations: [TextAnimationDirective],
  imports: [CommonModule],
  exports: [TextAnimationDirective] // Export it if you want to use it in other modules
})
export class TextAnimationModule {}
