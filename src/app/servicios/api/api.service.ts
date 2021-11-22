import { Injectable } from '@angular/core';
import { ResponseI } from '../../modelos/response.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListaLibrosI } from '../../modelos/listalibros.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string = "https://api.itbook.store/1.0/";


  constructor( private http: HttpClient) { }

  getLibros(page: number, texto: string): Observable<ListaLibrosI>{
    let direccion = this.url + "search/" + texto + "/?page=" + page;
    return this.http.get<ListaLibrosI>(direccion);
  }

}
