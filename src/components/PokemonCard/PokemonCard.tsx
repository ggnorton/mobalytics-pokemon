import React from 'react'
import { useHistory } from 'react-router-dom'
import cn from 'classnames'

import style from './PokemonCard.module.scss'
import {PokemonProfileItem} from "../../redux/types";
import {useDispatch} from "react-redux";
import {actionSetPokemonsProfile} from "../../redux/pokemonProfile/actions";

interface Props {
  className?: string
  data: PokemonProfileItem;
}

const PokemonCard: React.FC<Props> = ({ className, data }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const goToProfile = () => {
    dispatch(actionSetPokemonsProfile(data))
    history.push(`/${data.id}`)
  }
  return (
    <div className={cn(style.root, className)} onClick={goToProfile}>
      <div className={style.img}>
        <img src={`${data.sprites.front_default}`} alt='#'/>
      </div>
      <div className={style.label}>{`${data.name}`}</div>
    </div>
  )
}

export default PokemonCard