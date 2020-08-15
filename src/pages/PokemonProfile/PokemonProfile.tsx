import React from 'react'
import { path as Rpath } from 'ramda'
import { useParams } from 'react-router-dom'
import cn from 'classnames'
import style from './PokemonProfile.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {actionFetchPokemonProfile} from "../../redux/pokemonProfile/actions";
import {PokemonProfileItem} from "../../redux/types";

interface Props {
  className?: string;
}

const PokemonProfile: React.FC<Props> = ({ className }) => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const profile: PokemonProfileItem | undefined = useSelector((state: RootState) => state.pokemonProfileReducer.pokemonProfile)
  const profileIsLoading = useSelector((state: RootState) => state.pokemonProfileReducer.pokemonsProfileLoading)
  const profileError = useSelector((state: RootState) => state.pokemonProfileReducer.pokemonsProfileError)

  React.useEffect(() => {
    if (!profile) {
      dispatch(actionFetchPokemonProfile({id}))
    }
  }, [dispatch, profile, id])

  if (!profile && profileIsLoading) {
    return (
      <div>Профиль загружается</div>
    )
  }

  if (profileError) {
    return (
      <div>ошибка загрузки профиля</div>
    )
  }

  // Would do columns , but there's little time
  const getStat = (path: (string | number)[], label: string, index?: number) => {
    return (
      <div className={style.stat} key={index}>
        <span className={style.statLabel}>{label}</span>
        <span>{Rpath(path, profile) !== undefined ? Rpath(path, profile) : 'Неизвестно'}</span>
      </div>
    )
  }

  const getTypes = () => {
    const typesList = profile?.types.map(item => item.type.name).join(', ')
    return (
      <div className={style.stat}>
        <span className={style.statLabel}>Тип</span>
        <span>{typesList?.length ? typesList : 'Неизвестно'}</span>
      </div>
    )
  }

  const getMainStats = () => {
    return profile?.stats.map((item, index) => {
      const name = profile?.stats[index].stat.name
      return getStat(['stats', index, 'base_stat'], name[0].toUpperCase() + name?.slice(1), index)
    })
  }

  return (
    <div className={cn(style.root, className)}>
      <div className={style.profile}>
        <div className={style.name}>{profile?.name}</div>
        <div className={style.profileContent}>
          <div className={style.imgWrap}>
            <img className={style.img} src={`${profile?.sprites.front_default}`} alt='#' />
          </div>
          <div className={style.params}>
            <div >Параметры {profile?.name}</div>
            {getStat(['weight'], 'Вес')}
            {getStat(['height'], 'Рост')}
            {getTypes()}
            {getMainStats()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PokemonProfile
