import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PokemonData } from '../interfaces/pokemon';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  getPokemons(): Observable<PokemonData> {
    return this.http.get<PokemonData>(`${environment.baseUrl}pokemon?limit=10&offset=0`);
  }
}
