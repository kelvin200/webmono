import register from 'preact-custom-element'
import { useEffect, useRef, useState } from 'preact/hooks'
import { BehaviorSubject, fromEvent } from 'rxjs'

const value$ = new BehaviorSubject<number>(0)
const updateValue = (diff: number) => value$.next(value$.getValue() + diff)

const App = () => {
  return (
    <div>
      <Controller />
      <Value />
    </div>
  )
}

const Controller = () => {
  const buttonPlus = useRef<HTMLButtonElement>()
  const buttonMinus = useRef<HTMLButtonElement>()

  useEffect(() => {
    const sub = fromEvent(buttonPlus.current, 'click').subscribe(() => updateValue(1))
    return sub.unsubscribe
  }, [buttonPlus])

  useEffect(() => {
    const sub = fromEvent(buttonMinus.current, 'click').subscribe(() => updateValue(-1))
    return sub.unsubscribe
  }, [buttonMinus])

  return (
    <div>
      <button ref={buttonMinus}>-</button>
      <button ref={buttonPlus}>+</button>
    </div>
  )
}

const Value = () => {
  const [val, setVal] = useState(0)

  useEffect(() => {
    const sub = value$.subscribe(v => setVal(v))
    return sub.unsubscribe
  }, [])

  return <span>{`Value: ${val}`}</span>
}

register(App, 'keyweb-reactive-rxjs')
