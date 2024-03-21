import { Component, Input } from '@angular/core';
import { Pokemon } from '../../interfaces/pokemon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss'
})
export class PokemonCardComponent {
  @Input() pokemonData!: Pokemon;

  constructor(private router: Router) {}

  onClickButton(name: string) {
    this.router.navigate(['/pokemonDetail', name]);
  }
}
