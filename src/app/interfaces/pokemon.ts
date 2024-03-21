import { PokemonAbility } from "./pokemon-ability";

export interface Pokemon {
    name: string;
    url: string;
}

export interface PokemonData {
    count: number;
    next: string;
    previous?: string;
    results: Pokemon[];
}

export interface PokemonResultObject {
    name: string;
    imageUrl?: string,
    abilities: any,
    description: string,
    specie?: PokemonAbility
}