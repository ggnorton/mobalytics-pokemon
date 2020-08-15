import {actionGenerator} from "../helpers";
import {PokemonListResult} from "../types";

const ACTION_NAME_FETCH_LIST = 'FETCH_LIST'
const ACTION_NAME_SET_LIST = 'SET_LIST'
const ACTION_NAME_FETCH_LIST_ERROR = 'FETCH_LIST_ERROR'

const actionFetchPokemonList = () => actionGenerator(ACTION_NAME_FETCH_LIST)
const actionSetPokemonsList = (params: PokemonListResult) => actionGenerator(ACTION_NAME_SET_LIST, params)
const actionFetchPokemonsListError = (params: any) => actionGenerator(ACTION_NAME_FETCH_LIST_ERROR, params)

export {
  ACTION_NAME_FETCH_LIST,
  ACTION_NAME_SET_LIST,
  ACTION_NAME_FETCH_LIST_ERROR,
  actionFetchPokemonList,
  actionSetPokemonsList,
  actionFetchPokemonsListError,
}