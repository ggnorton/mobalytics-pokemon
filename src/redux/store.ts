import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { saga } from './sagas';

import {pokemonsListReducer, PokemonListReducer} from './pokemonsList/reducers'
import { pokemonProfileReducer, PokemonProfileReducer } from './pokemonProfile/reducers'

const sagaMiddleware = createSagaMiddleware();

export interface RootState {
  pokemonsListReducer: PokemonListReducer;
  pokemonProfileReducer: PokemonProfileReducer;
}

// eslint-disable-next-line import/prefer-default-export
const store = createStore(combineReducers({ pokemonsListReducer, pokemonProfileReducer }), applyMiddleware(sagaMiddleware));

sagaMiddleware.run(saga);

export default store;