import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ay-endpoints',
  templateUrl: './endpoints.component.html',
  styleUrls: ['./endpoints.component.scss'],
})
export class EndpointsComponent {
  projectId = this.route.snapshot.paramMap.get('projectId') as string;

  constructor(private readonly route: ActivatedRoute) {}

  rename() {
    console.log('Rename');
  }

  delete() {
    console.log('Delete');
  }
}
