import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { PokemonData } from '../interfaces/pokemon';
import { PokemonDetail } from '../interfaces/pokemon-detail';
import { PokemonAbility } from '../interfaces/pokemon-ability';
import { PokemonType } from '../interfaces/pokemon-type';

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

  getPokemonDetail(name: string): Observable<PokemonDetail> {
    return this.http.get<PokemonDetail>(`${environment.baseUrl}pokemon/${name}`);
  }

  getAbilities(url: string): Observable<PokemonAbility> {
    return this.http.get<PokemonAbility>(`${url}`);
  }

  getPokemonsByType(type: string): Observable<PokemonType>{
    return this.http.get<PokemonType>(`${environment.baseUrl}type/${type}`);
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
