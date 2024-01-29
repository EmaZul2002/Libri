import { Component, Input } from '@angular/core';
import { Libro } from './domain/Libro';
import { DatiService } from './service/dati.service';
import { JsonService } from './service/json.service';
import { Observable } from 'rxjs';
import { TipoJson } from './domain/TipoJson';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Libri';

  idJson : number = 1



  //elencoLibri : Libro[] = []

  visualizzaFormElenco : boolean = true

  //datiService : DatiService = new DatiService()

  json$ : Observable<TipoJson[]>;

  //injection
  constructor(
    public datiService : DatiService,
    public jsonService : JsonService) {
      this.json$ = this.jsonService.getJson()
    //this.elencoLibri = this.datiservice.getLibri()
  }

  getJsonById() {
    this.jsonService.getJsonById(this.idJson).subscribe(
      data => {
        console.log(data)
      }
    )
  }

  delJsonById() {
    this.jsonService.deleteJsonById(this.idJson).subscribe(
      data => {
        console.log(data)
      }
    )
  }



  cambiaVisualizzazione() {
    this.visualizzaFormElenco = !this.visualizzaFormElenco
  }

  inserisciLibro(libro : Libro) {
    //this.elencoLibri.push(libro)
    this.datiService.addLibro(libro)
    this.cambiaVisualizzazione()
    console.log(libro)
  }
}
