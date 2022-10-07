import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { IMassage } from 'src/app/core/models/IMassage';
import { MassageService } from 'src/app/core/services/massage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-massage-detail',
  templateUrl: './massage-detail.component.html',
  styleUrls: ['./massage-detail.component.scss']
})
export class MassageDetailComponent implements OnInit {

  massage$: Observable<IMassage>;
  apiUrl: string;

  constructor(
    private massageService: MassageService,
    private route: ActivatedRoute
  ) {
    this.massage$ = new Observable<IMassage>();
    this.apiUrl = environment.apiUrl;
  }

  ngOnInit(): void {
    this.massage$ = this.route.params
      .pipe(switchMap((params: Params) => {
        return this.massageService.findById(params['id'])
      }));
  }

}
