import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonData } from '../../interfaces/pokemon';
import { EMPTY, Observable, catchError } from 'rxjs';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [AsyncPipe, PokemonCardComponent],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss'
})
export class PokemonListComponent implements OnInit {
  public pokemonResponse$!: Observable<PokemonData>;
  public showMessageError!: string;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonResponse$ = this.pokemonService.getPokemons().pipe(
      catchError((error: string) => {
        this.showMessageError = error;
        return EMPTY;
      })
    );
  }

}
