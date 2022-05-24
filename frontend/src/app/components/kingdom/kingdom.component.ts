import {Component, OnDestroy, OnInit} from '@angular/core';
import {KingdomService} from "../../services/kingdom.service";
import {ToastrService} from "ngx-toastr";
import { KingdomDataService } from 'src/app/services/kingdom-data.service';
import {Observable, BehaviorSubject, Subject, takeUntil, map} from "rxjs";


@Component({
  selector: 'app-kingdom',
  templateUrl: './kingdom.component.html',
  styleUrls: ['./kingdom.component.scss']
})
export class KingdomComponent implements OnInit, OnDestroy {
  loading: boolean = true;
  error: any;

  currentKingdom$: Observable<any>;
  kingdomsBS = new BehaviorSubject<any[]>([]);
  destroy$: Subject<any> = new Subject();

  constructor(private kingdomService: KingdomService, private toastr: ToastrService, private kingdomDataService: KingdomDataService) {
    this.currentKingdom$ = this.kingdomsBS.pipe(map((kingdoms) => kingdoms.find(kingdom => kingdom.isActive)))
  }

  ngOnInit(): void {
  this.kingdomDataService.data$.subscribe(res => console.log(res));
      this.kingdomService.getKingdoms()
      .then(res => {
        this.mapKingdoms(res.data)
        this.loading = !this.loading;
      })
      .catch(err => {
        this.error = err.response.data;
        this.loading = false;
      })
  }

  mapKingdoms(kingdoms: any[]) {
    this.kingdomDataService.data$.pipe(takeUntil(this.destroy$)).subscribe(kingdomId => {
      const mappedKingdoms = kingdoms.map((kingdom) => ({...kingdom,
        isActive: (kingdomId === kingdom.id) || false,
      }))
      this.kingdomsBS.next(mappedKingdoms)
    });
  }

  updateActiveKingdom(id: number) {
    this.kingdomsBS.next(
      this.kingdomsBS.getValue().map(kingdom => ({...kingdom, isActive: kingdom.id === id}))
    )
  }

  ngOnDestroy() {
    this.destroy$.complete();
  }
}
