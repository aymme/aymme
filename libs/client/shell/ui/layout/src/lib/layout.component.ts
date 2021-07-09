import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ay-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {



  ngOnInit(): void {
    console.log('layout')
  }

}
