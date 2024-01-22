import { Component, Input } from '@angular/core';
import { Libro } from '../domain/Libro';

@Component({
  selector: 'app-elenco',
  templateUrl: './elenco.component.html',
  styleUrl: './elenco.component.css'
})
export class ElencoComponent {
  @Input() elencoLibri : Libro[] = []
}
