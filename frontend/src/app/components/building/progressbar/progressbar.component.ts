import {Component, Input, OnInit} from '@angular/core';
import {NgbProgressbarConfig} from '@ng-bootstrap/ng-bootstrap';
import {interval} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.scss'],
  providers: [NgbProgressbarConfig],
})
export class ProgressbarComponent implements OnInit {
  @Input() currentValue!: number;
  @Input() maxValue!: number;
  curSec: number = 0;

  constructor(config: NgbProgressbarConfig, private router: Router) {
    config.max = 100;
    config.striped = true;
    config.animated = true;
    config.type = 'success';
    config.height = '30px';
    config.showValue = true;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.startTimer(this.maxValue);
    }, 20)
  }

  startTimer(seconds: number) {
    const time = seconds;
    const timer$ = interval(1000);

    const sub = timer$.subscribe((sec) => {
      sec += seconds - this.currentValue;
      console.log(sec)
      console.log(seconds)

      this.maxValue = 100 - sec * 100 / seconds;
      this.curSec = sec;

      if (this.curSec === seconds) {
        sub.unsubscribe();
        this.router.navigateByUrl('/404', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/buildings']);
        });
      }
    });
  }

}
