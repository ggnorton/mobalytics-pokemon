import {actionGenerator} from "../helpers";
import {PokemonProfileItem, ReduxAction} from "../types";

const ACTION_NAME_FETCH_PROFILE = 'FETCH_PROFILE'
const ACTION_NAME_SET_PROFILE = 'SET_PROFILE'
const ACTION_NAME_FETCH_PROFILE_ERROR = 'FETCH_PROFILE_ERROR'

interface fetchProfilePayload {
  id: number | string;
}

export interface fetchProfileAction extends ReduxAction {
  payload: fetchProfilePayload
}

const actionFetchPokemonProfile = (params: fetchProfilePayload) => actionGenerator(ACTION_NAME_FETCH_PROFILE, params)
const actionSetPokemonsProfile = (params: PokemonProfileItem) => actionGenerator(ACTION_NAME_SET_PROFILE, params)
const actionFetchPokemonsProfileError = (params: any) => actionGenerator(ACTION_NAME_FETCH_PROFILE_ERROR, params)

export {
  ACTION_NAME_FETCH_PROFILE,
  ACTION_NAME_SET_PROFILE,
  ACTION_NAME_FETCH_PROFILE_ERROR,
  actionFetchPokemonProfile,
  actionSetPokemonsProfile,
  actionFetchPokemonsProfileError,
}