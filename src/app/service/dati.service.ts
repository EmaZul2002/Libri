import { Injectable } from "@angular/core";
import { Libro } from "../domain/Libro";

@Injectable({
    providedIn : "root"
})

export class DatiService {
    elencoLibri : Libro[] = []

    
    getLibri() : Libro[] {
        return this.elencoLibri
    }

    addLibro(libro : Libro) {
        this.elencoLibri.push(libro)
    }
}