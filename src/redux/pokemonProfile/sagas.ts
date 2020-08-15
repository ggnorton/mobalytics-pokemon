import {call, put, takeLatest} from 'redux-saga/effects'
import {
  ACTION_NAME_FETCH_PROFILE,
  actionFetchPokemonsProfileError,
  actionSetPokemonsProfile,
  fetchProfileAction,
} from "./actions";
import fetchPokemonProfileApi from '../../api/pokemonProfile'

function* fetchPokemonProfile(action: fetchProfileAction) {
  try {
    const pokemonProfile = yield call(fetchPokemonProfileApi, action.payload.id)
    yield put(actionSetPokemonsProfile(pokemonProfile))
  }
  catch (err) {
    yield put(actionFetchPokemonsProfileError(err))
  }
}

export function* fetchPokemonProfileSaga() {
  yield takeLatest(ACTION_NAME_FETCH_PROFILE, fetchPokemonProfile)
}