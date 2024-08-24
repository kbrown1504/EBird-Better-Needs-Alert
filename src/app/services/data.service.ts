import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Retrieves all observations near a specific lat/long
   * @param lat 
   * @param lng 
   */
  async getAllObservations(lat: number, lng: number, days: number): Promise<any[]> {
    var toReturn: any[] = []
    return this.httpClient.get(
      "https://api.ebird.org/v2/data/obs/geo/recent?lat="
      + lat
      + "&lng="
      + lng
      + "&back="
      + days
      + "&sort=species"
      + "&key=" + environment.ebirdKey
    ).forEach((birds: any) => {
      console.log(birds)
      for (let bird of birds) {
        var obs = this.getAllForSpecies(bird.speciesCode, lat, lng, days).subscribe((res) => {
          for (let r of res) {
            toReturn.push(r)
          }
          obs.unsubscribe()
        })
      }
    }).then(() => {
      console.log(toReturn)
      return toReturn
    })
  }

  getRareObservations(lat: number, lng: number, days: number): Observable<any> {
    return this.httpClient.get(
      "https://api.ebird.org/v2/data/obs/geo/recent/notable?lat="
      + lat
      + "&lng="
      + lng
      + "&back="
      + days
      + "&sort=species"
      + "&key=" + environment.ebirdKey
    )
  }

  getAllForSpecies(speciesCode: string, lat: number, lng: number, days: number): Observable<any> {
    return this.httpClient.get(
      "https://api.ebird.org/v2/data/obs/geo/recent/"
      + speciesCode
      + "?lat="
      + lat
      + "&lng="
      + lng
      + "&back="
      + days
      + "&key="
      + environment.ebirdKey
    )
  }

}
