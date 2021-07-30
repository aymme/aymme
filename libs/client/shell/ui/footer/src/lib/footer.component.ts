import { Component } from '@angular/core';

@Component({
  selector: 'ay-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  fullYear: number = new Date().getFullYear();
}
