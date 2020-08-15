import { all, fork } from 'redux-saga/effects'
import {fetchPokemonsListSaga} from "./pokemonsList/sagas";
import {fetchPokemonProfileSaga} from "./pokemonProfile/sagas";

export function* saga() {
  yield all([
    fork(fetchPokemonsListSaga),
    fork(fetchPokemonProfileSaga),
  ])
}