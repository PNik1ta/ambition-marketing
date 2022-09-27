import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-masseuse-detail-page',
  templateUrl: './masseuse-detail-page.component.html',
  styleUrls: ['./masseuse-detail-page.component.scss']
})
export class MasseuseDetailPageComponent implements OnInit {

  isOpened: boolean;

  constructor() {
    this.isOpened = false;
  }

  ngOnInit(): void {
  }

  openComments(): void {
    this.isOpened = !this.isOpened;
  }

}
