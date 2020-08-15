import { put, call, all, takeLatest } from 'redux-saga/effects'
import {
  ACTION_NAME_FETCH_LIST,
  actionFetchPokemonsListError,
  actionSetPokemonsList
} from "./actions";
import fetchListApi from '../../api/pokemonsListApi'
import fetchPokemonProfile from '../../api/pokemonProfile'
import {PokemonListResult} from "../types";

function* fetchPokemonsList() {
  try {
    const pokemonsList: PokemonListResult = yield call(fetchListApi)
    const pokemonProfilesList = yield all(pokemonsList.results.map((item) => call(fetchPokemonProfile, item.name)))
    yield put(actionSetPokemonsList(pokemonProfilesList))
  }
  catch (err) {
    yield put(actionFetchPokemonsListError(err))
  }
}

export function* fetchPokemonsListSaga() {
  yield takeLatest(ACTION_NAME_FETCH_LIST, fetchPokemonsList)
}