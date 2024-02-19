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

  visualizzaFormModifica : boolean = false

  visualizzaFormAggiunta : boolean = false

  //datiService : DatiService = new DatiService()

  json$ : Observable<TipoJson[]>;

  libro : TipoJson


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
        alert("Libro con ID")
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
    this.cambiaVisualizzazioneFormModifica()
    this.jsonService.getJsonById(this.id).subscribe(
      data => {
        this.id = data.id
        this.titolo=data.titolo
        this.autore=data.autore
        this.prezzoCopertina=data.prezzoCopertina
      }
    )
  }

  confermaModifiche() {
    this.cambiaVisualizzazioneFormModifica()
    this.libro = {
      id : this.id,
      titolo : this.titolo,
      autore : this.autore,
      prezzoCopertina : this.prezzoCopertina
    }
    this.jsonService.postJson(this.libro).subscribe(
      data => {
        alert("Libro modificato")
        this.titolo = ""
        this.autore = ""
        this.prezzoCopertina = 0
      }
    )
  }

  confermaInserimento() {
    this.cambiaVisualizzazioneFormAggiunta()
    this.libro = {
      id : this.id,
      titolo : this.titolo,
      autore : this.autore,
      prezzoCopertina : this.prezzoCopertina
    }
    this.jsonService.postJson(this.libro).subscribe(
      data => {
        alert("Libro inserito")
      }
    )
  }

  cambiaVisualizzazione() {
    this.visualizzaFormElenco = !this.visualizzaFormElenco
  }

  cambiaVisualizzazioneFormModifica() {
    this.visualizzaFormModifica = !this.visualizzaFormModifica
  }

  cambiaVisualizzazioneFormAggiunta() {
    this.visualizzaFormAggiunta = !this.visualizzaFormAggiunta
  }

  inserisciLibro(libro : Libro) {
    //this.elencoLibri.push(libro)
    this.datiService.addLibro(libro)
    this.cambiaVisualizzazione()
    console.log(libro)
  }
}
