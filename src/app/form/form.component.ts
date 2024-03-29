import { Component, EventEmitter, Output } from '@angular/core';
import { Libro } from '../domain/Libro';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  @Output() submitEvent = new EventEmitter<Libro>()

  titolo : string = ""
  tipo : string = ""

  submit() {
    let libro : Libro = {titolo : this.titolo, tipo : this.tipo}
    if (this.titolo != "" && this.tipo != "") {
      this.submitEvent.emit(libro)
    } else {
      let err = "Riempire i campi prima di cliccare 'Inserisci'"
      alert(err)
    }
    
  }
  
}
