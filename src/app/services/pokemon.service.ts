import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { PokemonData } from '../interfaces/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  limitPage: number = 16;
  offsetPage: number = 0;
  constructor(private http: HttpClient) { }

  getPokemons(): Observable<PokemonData> {
    return this.http.get<PokemonData>(`${environment.baseUrl}pokemon?limit=${this.limitPage}&offset=${this.offsetPage}`);
  }

  getPaginationNext(next: number) {
    this.offsetPage = this.offsetPage + next;
    return this.http.get<PokemonData>(`${environment.baseUrl}pokemon?limit=${this.limitPage}&offset=${this.offsetPage}`);
  }

  getPaginationPrevious(previous: number) {
    this.offsetPage = this.offsetPage - previous;
    return this.http.get<PokemonData>(`${environment.baseUrl}pokemon?limit=${this.limitPage}&offset=${this.offsetPage}`);
  }
}
