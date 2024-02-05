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

  id : number
  titolo : string
  autore : string
  prezzoCopertina : number

  getJsonById() {
    this.jsonService.getJsonById(this.id).subscribe(
      data => {
        console.log(data)
      }
    )
  }

  delJsonById() {
    this.jsonService.deleteJsonById(this.id).subscribe(
      data => {
        console.log(data)
      }
    )
  }
    
  updateJsonById() {
    this.jsonService.getJsonById(this.id).subscribe(
      data => {
        this.id = data.id
        this.titolo=data.titolo
        this.autore=data.autore
        this.prezzoCopertina=data.prezzoCopertina
      }
    )
  }

  createJson() {
    let libro : TipoJson
    

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
