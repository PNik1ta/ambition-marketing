import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IMassage } from 'src/app/core/models/IMassage';
import { MassageService } from 'src/app/core/services/massage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-massages-page',
  templateUrl: './massages-page.component.html',
  styleUrls: ['./massages-page.component.scss']
})
export class MassagesPageComponent implements OnInit {

  massages$: Observable<IMassage[]>;
  apiUrl: string;

  constructor(
    private massageService: MassageService,
    private router: Router
  ) {
    this.massages$ = new Observable<IMassage[]>();
    this.apiUrl = environment.apiUrl;
  }

  ngOnInit(): void {
    this.getMassages();
  }

  getMassages(): void {
    this.massages$ = this.massageService.findAll();
  }

  showMore(massage: IMassage) {
    this.router.navigate(['/Massages/' + massage._id]);
  }
}
