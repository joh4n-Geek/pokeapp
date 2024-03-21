import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable, catchError, map } from 'rxjs';
import { Pokemon, PokemonData } from '../../interfaces/pokemon';
import { PokemonType } from '../../interfaces/pokemon-type';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [AsyncPipe, PokemonCardComponent, SearchBarComponent],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss'
})
export class PokemonListComponent implements OnInit {
  searchText: string = '';
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
        alert(this.showMessageError);
        return EMPTY;
      })
    );
  }

  onChangeSearchInput(text: string) {
    let filterResponse: PokemonData = {
      count: 0,
      next: '',
      previous: '',
      results: []
    };
    this.searchText = text;
    this.pokemonService.getPokemonsByType(this.searchText).subscribe((response) => {
      const {pokemon} = response;
      console.log('Este es el pokemon', pokemon);
      // const pokemonObject = [pokemon.pokemon.name];
      // console.log('Este es el pokemon', pokemonObject);
      // filterResponse = { ...filterResponse, results: {name, url}};
    });
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
    this.pokemonResponse$ = this.pokemonService.getPaginationPrevious(this.previousPage).pipe(
      catchError((error: string) => {
        this.showMessageError = error;
        return EMPTY;
      })
    );
  }

}
