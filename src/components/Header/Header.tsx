import React from 'react'
import cn from 'classnames'
import { Link } from 'react-router-dom'

import style from './Header.module.scss'

interface Props {
  className?: string;
}

const Header: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn(style.root, className)}>
      <Link to='/'>Домой</Link>
    </div>
  )
}

export default Header