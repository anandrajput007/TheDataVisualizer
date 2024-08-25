import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  public chartData: any[] = [];

  constructor(private renderer: Renderer2, private router: Router) {}

  onFileUploaded(data: any[]): void {
    this.chartData = data; // Update chart data
  }

  openModal() {
    const modal = this.renderer.selectRootElement('#loginModal', true);
    this.renderer.setStyle(modal, 'display', 'block');
    this.renderer.addClass(modal, 'show');
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
  }

  closeModal() {
    const modal = this.renderer.selectRootElement('#loginModal', true);
    this.renderer.setStyle(modal, 'display', 'none');
    this.renderer.removeClass(modal, 'show');
    this.renderer.removeStyle(document.body, 'overflow');
  }

  navigateToDashboard() {
    this.closeModal();
    this.router.navigate(['/dashboard']);
  }
}
