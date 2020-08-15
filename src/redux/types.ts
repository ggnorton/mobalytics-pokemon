import {Action} from "redux";

export interface ReduxAction extends Action {
  payload: object;
}

export interface PokemonListResult {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonCategoryItem[];
}

export interface PokemonCategoryItem {
  name: string;
  url: string;
}

export interface PokemonProfileItem {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: SpriteList;
  stats: StatsListItem[];
  types: TypesListItem[]
}

interface SpriteList {
  front_default: string;
}

interface StatsListItem {
  effort: number;
  base_stat: number;
  stat: PokemonCategoryItem;
}

interface TypesListItem {
  slot: number
  type: PokemonCategoryItem
}