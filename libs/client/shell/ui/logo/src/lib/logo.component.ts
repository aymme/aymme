import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ay-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {

  ngOnInit() {
    console.log('this')
  }
}
