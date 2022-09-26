import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news-detail-page',
  templateUrl: './news-detail-page.component.html',
  styleUrls: ['./news-detail-page.component.scss']
})
export class NewsDetailPageComponent implements OnInit {

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
