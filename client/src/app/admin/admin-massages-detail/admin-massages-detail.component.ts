import { switchMap } from 'rxjs';
import { MassageService } from './../../core/services/massage.service';
import { IMassage } from './../../core/models/IMassage';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-admin-massages-detail',
  templateUrl: './admin-massages-detail.component.html',
  styleUrls: ['./admin-massages-detail.component.scss']
})
export class AdminMassagesDetailComponent implements OnInit {
  massage$!: Observable<IMassage>;

  constructor(
    private massageService: MassageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.massage$ = this.route.params
      .pipe(switchMap((params: Params) => {
        return this.massageService.findById(params['id']);
      }));
  }

}
