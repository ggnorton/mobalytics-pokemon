import {
  ACTION_NAME_FETCH_PROFILE,
  ACTION_NAME_SET_PROFILE,
  ACTION_NAME_FETCH_PROFILE_ERROR,
} from './actions'
import {PokemonProfileItem, ReduxAction} from "../types";

export interface PokemonProfileReducer {
  pokemonProfile?: PokemonProfileItem;
  pokemonsProfileLoading: boolean;
  pokemonsProfileError: string | null;
}

const initialState: PokemonProfileReducer = {
  pokemonProfile: undefined,
  pokemonsProfileLoading: false,
  pokemonsProfileError: null,
}

export function pokemonProfileReducer(state = initialState, action: ReduxAction) {
  switch (action.type) {
    case ACTION_NAME_FETCH_PROFILE:
      return {
        ...state,
        pokemonsProfileLoading: true,
        pokemonsProfileError: null,
      }
    case ACTION_NAME_SET_PROFILE:
      return {
        ...state,
        pokemonsProfileLoading: false,
        pokemonProfile: action.payload,
      }
    case ACTION_NAME_FETCH_PROFILE_ERROR:
      return {
        ...state,
        pokemonsProfileLoading: false,
        pokemonsProfileError: action.payload,
      }
    default:
      return state
  }
}