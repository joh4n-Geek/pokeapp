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
  previousText: string = '<< Prev';
  nextText: string = 'Next >>';
  nextPage: number = 0;
  previousPage: number = 0;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonResponse$ = this.pokemonService.getPokemons().pipe(
      catchError((error: string) => {
        this.showMessageError = error;
        return EMPTY;
      })
    );
  }

  paginationNext() {
    this.nextPage = 16;
    this.pokemonResponse$ = this.pokemonService.getPaginationNext(this.nextPage).pipe(
      catchError((error: string) => {
        this.showMessageError = error;
        return EMPTY;
      })
    );
  }

  paginationPrevious() {
    this.previousPage = 16;
    // this.isDisabled = false;
    this.pokemonResponse$ = this.pokemonService.getPaginationPrevious(this.previousPage).pipe(
      catchError((error: string) => {
        this.showMessageError = error;
        return EMPTY;
      })
    );
  }

}
