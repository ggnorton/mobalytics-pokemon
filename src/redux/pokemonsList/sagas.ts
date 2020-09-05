import { put, call, all, takeLatest, select } from 'redux-saga/effects'
import {
  ACTION_NAME_FETCH_LIST,
  actionFetchPokemonsListError,
  actionSetPokemonsList, actionSetPokemonsListRequestResult, fetchPokemonsListAction
} from "./actions";
import fetchListApi from '../../api/pokemonsListApi'
import fetchPokemonProfile from '../../api/pokemonProfile'
import {PokemonListResult} from "../types";
import {RootState} from "../store";

function* fetchPokemonsList(action: fetchPokemonsListAction) {
  try {
    const pokemonsList: PokemonListResult = yield call(fetchListApi, action.payload?.url)
    const pokemonProfilesList = yield all(pokemonsList.results.map((item) => call(fetchPokemonProfile, item.name)))
    yield put(actionSetPokemonsListRequestResult(pokemonsList))
    if (action.payload?.url) {
      const currentPokemonList = yield select((state: RootState) => state.pokemonsListReducer.pokemonsList)
      yield put(actionSetPokemonsList(currentPokemonList.concat(pokemonProfilesList)))
    } else {
      yield put(actionSetPokemonsList(pokemonProfilesList))
    }
  }
  catch (err) {
    yield put(actionFetchPokemonsListError(err))
  }
}

export function* fetchPokemonsListSaga() {
  yield takeLatest(ACTION_NAME_FETCH_LIST, fetchPokemonsList)
}