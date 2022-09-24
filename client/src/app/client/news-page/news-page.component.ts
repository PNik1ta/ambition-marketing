import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss']
})
export class NewsPageComponent implements OnInit {

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
