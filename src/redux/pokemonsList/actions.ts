import {actionGenerator} from "../helpers";
import {PokemonListResult, ReduxAction} from "../types";

const ACTION_NAME_FETCH_LIST = 'FETCH_LIST'
const ACTION_NAME_SET_LIST = 'SET_LIST'
const ACTION_NAME_FETCH_LIST_ERROR = 'FETCH_LIST_ERROR'
const ACTION_NAME_SET_LIST_REQUEST_RESULT = 'SET_LIST_REQUEST_RESULT'

interface fetchListPayload {
  url: string | null
}

export interface fetchPokemonsListAction extends ReduxAction {
  payload: fetchListPayload
}

const actionFetchPokemonList = (params?: fetchListPayload) => actionGenerator(ACTION_NAME_FETCH_LIST, params)
const actionSetPokemonsList = (params: PokemonListResult) => actionGenerator(ACTION_NAME_SET_LIST, params)
const actionFetchPokemonsListError = (params: any) => actionGenerator(ACTION_NAME_FETCH_LIST_ERROR, params)
const actionSetPokemonsListRequestResult = (params: PokemonListResult) => actionGenerator(ACTION_NAME_SET_LIST_REQUEST_RESULT, params)

export {
  ACTION_NAME_FETCH_LIST,
  ACTION_NAME_SET_LIST,
  ACTION_NAME_FETCH_LIST_ERROR,
  ACTION_NAME_SET_LIST_REQUEST_RESULT,
  actionFetchPokemonList,
  actionSetPokemonsList,
  actionFetchPokemonsListError,
  actionSetPokemonsListRequestResult,
}