import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { ActivatedRoute, Params } from '@angular/router';
import { PokemonResultObject } from '../../interfaces/pokemon';
import { PokemonAbility } from '../../interfaces/pokemon-ability';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.scss'
})
export class PokemonDetailComponent implements OnInit {
  currentRoute: Params = {};
  pokemonResultObject: PokemonResultObject = {
    name: '',
    imageUrl: '',
    abilities: '',
    description: '',
    specie: undefined
  };

  constructor(private pokemonService: PokemonService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.currentRoute = this.activatedRoute.snapshot.params;
    const {name} = this.currentRoute;
    this.pokemonService.getPokemonDetail(name).subscribe(response => {
      this.pokemonResultObject.name = response.name;
      this.pokemonResultObject.imageUrl = response.sprites.other?.['official-artwork'].front_default;
      this.pokemonResultObject.abilities = response.species;

      this.pokemonService.getAbilities(this.pokemonResultObject.abilities.url).subscribe((result: PokemonAbility) => {
        for(let i = 0; i < result.flavor_text_entries.length; i++) {
          const element = result.flavor_text_entries[i];
          if(element.language.name === 'en') {
            this.pokemonResultObject.description = element.flavor_text;
          }
        }

        for(let i = 0; i < result.genera.length; i++) {
          const item = result.genera[i];
          if(item.language.name === 'en') {
            this.pokemonResultObject.specie = item.genus;
          }
        }
      });
    });
  }

}
