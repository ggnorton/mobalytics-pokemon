import React, { PureComponent } from 'react'
import classNames from 'classnames'

import style from './AsyncEntitiesList.module.scss'


const INFINITE_SCROLL_LOAD_HEIGHT_DELTA = 100

interface Props {
  className?: string;
  nextPage?: string | null;
  isLoading?: boolean;
  nextPageAction?: () => void;
  reverse?: boolean;
  scrollContainer?: Node | string;
  component?: React.ElementType<any>;
  componentProps?: any;
}

interface ClassProps extends Partial<Props> {
  component: React.ElementType<any>
}

export const AsinEntitiesListFunctional: React.FC<Props> = ({
  children,
  className,
  nextPage,
  isLoading,
  nextPageAction,
  reverse,
  scrollContainer,
  component: Component = 'div',
  componentProps
}) => {
  let _scrollContainerNode = React.useRef<any>(scrollContainer)
  let _nextPageActionFired = React.useRef<boolean>(false)

  const _selfRootRef = React.useRef(null)

  const childrenArray = Array.isArray(children) ? children : [children]
  let content = childrenArray

  if (reverse) content.reverse()


  React.useEffect(() => {
    const handleScroll = () => {
      const scrollBottom = _scrollContainerNode.current.scrollTop + _scrollContainerNode.current.offsetHeight
      const scrollDelta = _scrollContainerNode.current.scrollHeight - INFINITE_SCROLL_LOAD_HEIGHT_DELTA
      if (
        !_nextPageActionFired.current &&
        scrollBottom > scrollDelta &&
        nextPage && !isLoading
      ) {
        _nextPageActionFired.current = true
        if (nextPageAction) {
          nextPageAction()
        }
      }
    }
  
    const setScrollEvent = () => {
      if (typeof _scrollContainerNode.current === 'string') {
        _scrollContainerNode.current = document.querySelector(_scrollContainerNode.current)
      }
      if (!_scrollContainerNode.current) {
        _scrollContainerNode.current = _selfRootRef
      }
      if (!_scrollContainerNode.current) return
      _scrollContainerNode.current.addEventListener('scroll', handleScroll)
      handleScroll()
    }

    setScrollEvent()
    return () => {
      _scrollContainerNode.current.removeEventListener('scroll', handleScroll)
    }
  }, [nextPage, isLoading, nextPageAction])

  React.useEffect(() => {
    _nextPageActionFired.current = false
  }, [nextPage])

  return (
      <Component {...{
        className: classNames(style.root, className),
        ref: _selfRootRef,
        ...componentProps,
      }} >
        {content}
      </Component>
  )
}

export class AsyncEntitiesList extends PureComponent<ClassProps> {
  public static defaultProps = {
    component: 'div',
  }

  private nextPageActionFired: boolean;
  private scrollContainerNode: any;
  private selfRootRef: any;

  public constructor(props: ClassProps) {
    super(props)

    this.setScrollEvent = this.setScrollEvent.bind(this)
    this.handleScroll = this.handleScroll.bind(this)

    this.nextPageActionFired = false
    this.scrollContainerNode = null
  }

  public componentDidMount() {
    this.setScrollEvent()
  }

  public componentDidUpdate(prevProps: Props) {
    this.setScrollEvent()
    if (this.props.nextPage !== prevProps.nextPage) {
      this.nextPageActionFired = false
    }
  }

  public componentWillUnmount() {
    if (this.scrollContainerNode) {
      this.scrollContainerNode.removeEventListener('scroll', this.handleScroll)
    }
  }

  private setScrollEvent() {
    const {
      scrollContainer,
    } = this.props

    this.scrollContainerNode = scrollContainer
    if (typeof this.scrollContainerNode === 'string') {
      this.scrollContainerNode = document.querySelector(this.scrollContainerNode)
    }
    if (!this.scrollContainerNode) {
      this.scrollContainerNode = this.selfRootRef
    }
    if (!this.scrollContainerNode) return
    this.scrollContainerNode.addEventListener('scroll', this.handleScroll)
    this.handleScroll()
  }

  private handleScroll() {
    const scrollBottom = this.scrollContainerNode.scrollTop + this.scrollContainerNode.offsetHeight
    const scrollDelta = this.scrollContainerNode.scrollHeight - INFINITE_SCROLL_LOAD_HEIGHT_DELTA
    if (
      !this.nextPageActionFired &&
      scrollBottom > scrollDelta &&
      this.props.nextPage && !this.props.isLoading
    ) {
      this.nextPageActionFired = true
      if (this.props.nextPageAction) {
        this.props.nextPageAction()
      }
    }
  }

  public render() {
    const {
      className = '',
      reverse,

      component: Component,
      componentProps,
      children,
    } = this.props
    const childrenArray = Array.isArray(children) ? children : [children]
    let content = childrenArray

    if (reverse) content.reverse()

    return (
      <Component {...{
        className: classNames(style.root, className),
        ref: (node: any) => {
          if (node) {
            this.selfRootRef = node
          }
        },
        ...componentProps,
      }} >
        {content}
      </Component>
    )
  }
}
