import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoJson } from '../domain/TipoJson';

@Injectable({
  providedIn: 'root'
})
export class JsonService {
  url : string = "http://jsonplaceholder.typicode.com/todos/"

  constructor(public httpClient : HttpClient) { }

  getJson() : Observable<TipoJson[]> {
    return this.httpClient.get<TipoJson[]>(this.url)
  }

  getJsonById(id:number):Observable<TipoJson> {
    return this.httpClient.get<TipoJson>(this.url+id);
  }

  deleteJsonById(id:number) {
    return this.httpClient.delete<TipoJson>(this.url+id);
  }

  postJson(json : TipoJson) : Observable<TipoJson> {
    return this.httpClient.post<TipoJson>(this.url, json)
  }
}
