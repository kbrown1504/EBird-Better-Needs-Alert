import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  sightings: any[] = []

  days = 1;
  region = "Nebraska"
  onlyRare = false
  onlyReviewed = false

  constructor(private dataService: DataService) { }

  ionViewDidEnter() {
    // this.dataService.getAllObservations(41.25, -95.99).subscribe((res) => {
    //   console.log(res)
    //   this.sightings = res
    // })
  }

  rareChange() {
    if (!this.onlyRare) {
      this.onlyReviewed = false
    }
  }

  async search() {
    if (this.onlyRare) {
      var obs = this.dataService.getRareObservations(41.25, -95.99, this.days).subscribe((res) => {
        this.sightings = res
        obs.unsubscribe()
      })
    } else {
      this.sightings = await this.dataService.getAllObservations(41.25, -95.99, this.days)
      console.log(this.sightings)
    }
  }

}
