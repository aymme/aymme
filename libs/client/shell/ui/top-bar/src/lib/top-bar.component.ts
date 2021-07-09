import { Component, OnInit } from '@angular/core';

import {MenuItem} from 'primeng/api';

@Component({
  selector: 'ay-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  items!: MenuItem[];

  ngOnInit() {
    this.items = [
      {
        label: 'Projects',
        icon: 'pi pi-fw pi-book',
      }
    ];
  }
}
