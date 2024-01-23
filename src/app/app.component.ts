import { Component, Input } from '@angular/core';
import { Libro } from './domain/Libro';
import { DatiService } from './service/dati.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Libri';

  //elencoLibri : Libro[] = []

  visualizzaFormElenco : boolean = true

  //datiService : DatiService = new DatiService()

  constructor(public datiService : DatiService) {
    //this.elencoLibri = this.datiservice.getLibri()
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
