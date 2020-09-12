import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import cn from 'classnames'
import style from './PokemonsList.module.scss'
import {actionFetchPokemonList} from "../../redux/pokemonsList/actions";
import {RootState} from "../../redux/store";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import { AsinEntitiesListFunctional } from '../../components/AsyncEntitiesList/AsyncEntitiesList';

interface Props {
  className?: string;
}

const PokemonsList: React.FC<Props> = ({ className }) => {
  const dispatch = useDispatch()
  const pokemonsList = useSelector((state: RootState) => state.pokemonsListReducer.pokemonsList)
  const pokemonsListIsLoading = useSelector((state: RootState) => state.pokemonsListReducer.pokemonsListLoading)
  const pokemonsListError = useSelector((state: RootState) => state.pokemonsListReducer.pokemonsListError)
  const pokemonsListRequest = useSelector((state: RootState) => state.pokemonsListReducer.pokemonsListRequestResult)

  React.useEffect(() => {
    dispatch(actionFetchPokemonList())
  }, [dispatch])

  if (!pokemonsList.length && pokemonsListIsLoading) {
    return (
      <div>Список загружается</div>
    )
  }

  if (pokemonsListError) {
    return (
      <div>ошибка загрузки списка, перезагрузите страницу</div>
    )
  }

  return (
    <div className={cn(style.root, className)}>
      <h1>Самый полный список покемонов</h1>
      <h3>Самый полный список покемонов специально для mobalytics</h3>
      <AsinEntitiesListFunctional {...{
           nextPage: pokemonsListRequest?.next,
           nextPageAction: () => dispatch(actionFetchPokemonList({url: pokemonsListRequest?.next || null})),
           isLoading: pokemonsListIsLoading,
           scrollContainer: document.body
         }}>
       <div className={style.list}>
         
         {
           pokemonsList.map((item) => (
              <PokemonCard data={item} key={item.id} />
           ))
         }
         
       </div>
       </AsinEntitiesListFunctional>
    </div>
  )
}

export default PokemonsList
