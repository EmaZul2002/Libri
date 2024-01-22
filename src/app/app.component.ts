import { Component } from '@angular/core';
import { Libro } from './domain/Libro';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Libri';

  elencoLibri : Libro[] = []

  visualizzaFormElenco : boolean = true

  cambiaVisualizzazione() {
    this.visualizzaFormElenco = !this.visualizzaFormElenco
  }

  inserisciLibro(libro : Libro) {
    this.elencoLibri.push(libro)
    this.cambiaVisualizzazione()
    console.log(libro)
  }
}
