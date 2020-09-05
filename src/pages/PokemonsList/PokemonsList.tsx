import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import cn from 'classnames'
import style from './PokemonsList.module.scss'
import {actionFetchPokemonList} from "../../redux/pokemonsList/actions";
import {RootState} from "../../redux/store";
import PokemonCard from "../../components/PokemonCard/PokemonCard";

const SCROLL_OFFSET = 100

interface Props {
  className?: string;
}

const PokemonsList: React.FC<Props> = ({ className }) => {
  const dispatch = useDispatch()
  const [isNextPageLoading, setIsNextPageLoading] = useState(false)
  const pokemonsList = useSelector((state: RootState) => state.pokemonsListReducer.pokemonsList)
  const pokemonsListIsLoading = useSelector((state: RootState) => state.pokemonsListReducer.pokemonsListLoading)
  const pokemonsListError = useSelector((state: RootState) => state.pokemonsListReducer.pokemonsListError)
  const pokemonsListRequest = useSelector((state: RootState) => state.pokemonsListReducer.pokemonsListRequestResult)

  React.useEffect(() => {
    dispatch(actionFetchPokemonList())
  }, [dispatch])

  React.useEffect(() => {
    const handleScroll = () => {
      const rect = document.body.getBoundingClientRect()
      if (
        !isNextPageLoading &&
        rect.bottom - window.innerHeight < SCROLL_OFFSET &&
        pokemonsListRequest
      ) {
        setIsNextPageLoading(true)
        new Promise((resolve) => {
          resolve(dispatch(actionFetchPokemonList({url: pokemonsListRequest.next})))
        })
          .finally(() => setIsNextPageLoading(false))
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.addEventListener('scroll', handleScroll)
    }
  }, [dispatch, pokemonsListRequest, isNextPageLoading])

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
       <div className={style.list}>
         {
           pokemonsList.map((item) => (
              <PokemonCard data={item} key={item.id} />
           ))
         }
       </div>
    </div>
  )
}

export default PokemonsList
