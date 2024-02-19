import { Component, Input, OnInit } from '@angular/core';
import { Libro } from './domain/Libro';
import { DatiService } from './service/dati.service';
import { JsonService } from './service/json.service';
import { Observable } from 'rxjs';
import { TipoJson } from './domain/TipoJson';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Libri';

  idJson : number = 1



  //elencoLibri : Libro[] = []

  visualizzaFormElenco : boolean = true

  visualizzaFormModifica : boolean = false

  visualizzaFormAggiunta : boolean = false

  visualizzaLibroCercato : boolean = false

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

  ngOnInit() {
    this.formModifica = new FormGroup({
      id : new FormControl('', [Validators.required, Validators.min(1)]),
      titolo : new FormControl('', [Validators.required]),
      autore : new FormControl('', [Validators.required]),
      prezzoCopertina : new FormControl('', [Validators.required, Validators.min(0)])
    })

    this.formAggiunta = new FormGroup({
      titolo : new FormControl('', [Validators.required]),
      autore : new FormControl('', [Validators.required]),
      prezzoCopertina : new FormControl('', [Validators.required, Validators.min(0)])
    })

    this.formRicerca = new FormGroup({
      id : new FormControl('', [Validators.required, Validators.min(1)]) 
    })
  }

  id : number
  titolo : string
  autore : string
  prezzoCopertina : number

  formModifica : FormGroup
  formAggiunta : FormGroup
  formRicerca : FormGroup

  

  getJsonById() {
    this.jsonService.getJsonById(this.formRicerca.get('id').value).subscribe(
      data => {
        console.log(data)
      }
    )
  }

  delJsonById() {
    this.jsonService.deleteJsonById(this.formRicerca.get('id').value).subscribe(
      data => {
        alert("Libro con ID " + this.formRicerca.get('id').value + " rimosso")
      }
    )
  }
    
  updateJsonById() {
    if (this.formRicerca.get('id').value != null) {
      this.cambiaVisualizzazioneFormModifica()
    this.jsonService.getJsonById(this.formRicerca.get('id').value).subscribe(
      data => {
        this.formModifica.get('id').setValue(data.id)
        this.formModifica.get('titolo').setValue(data.titolo)
        this.formModifica.get('autore').setValue(data.autore)
        this.formModifica.get('prezzoCopertina').setValue(data.prezzoCopertina)
      }
    )
    } else {
      alert("Campo ID non valido, inserire un valore per eseguire la modifica")
    }
    
  }

  confermaModifiche() {
    this.cambiaVisualizzazioneFormModifica()
    this.libro = {
      id : this.formModifica.get('id').value,
      titolo : this.formModifica.get('titolo').value,
      autore : this.formModifica.get('autore').value,
      prezzoCopertina : this.formModifica.get('prezzoCopertina').value
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
      id : 0,
      titolo : this.formAggiunta.get('titolo').value,
      autore : this.formAggiunta.get('autore').value,
      prezzoCopertina : this.formAggiunta.get('prezzoCopertina').value
    }
    delete this.libro.id
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

  cambiaVisualizzazioneCerca() {
    this.visualizzaLibroCercato = !this.visualizzaLibroCercato
  }

  inserisciLibro(libro : Libro) {
    //this.elencoLibri.push(libro)
    this.datiService.addLibro(libro)
    this.cambiaVisualizzazione()
    console.log(libro)
  }
}
