import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Router} from "@angular/router";

import axios from "axios";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-kingdom-modify',
  templateUrl: './kingdom-modify.component.html',
  styleUrls: ['./kingdom-modify.component.scss']
})
export class KingdomModifyComponent implements OnInit {

  id?: number;
  kingdom?: any;
  error?: string;

  specialChars = /[\s]/;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    axios.get(environment.apiURL + 'kingdoms/' + this.id)
    .then(
      response => {
        this.kingdom = response.data;
        console.log(this.kingdom);
      }
    )
    .catch(
      response => {
        this.router.navigate(['/kingdoms/']);
      }
    );
  }

  renameKingdom(id: number, newname: string) {
    this.error = "";
    if (newname.length < 3 || this.specialChars.test(newname)) {
      this.error = "Has to be longer than 3 characters without white spaces!";
    } else {
      axios.put(environment.apiURL + 'kingdoms/' + id, {kingdomName: newname})
      .then(
        res => {
          this.router.navigate(['/kingdoms/' + id]);
        }
      )
      .catch(
        error => {
          error = error.data.error;
        }
      );
    }
  }

}
