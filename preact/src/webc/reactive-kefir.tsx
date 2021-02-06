import { Emitter, Event, fromEvents, Stream, stream } from 'kefir'
import register from 'preact-custom-element'
import { useEffect, useRef, useState } from 'preact/hooks'

class BehaviorSubject<T, S> {
  private emitter?: Emitter<T, S>
  private value?: T

  stream: Stream<T, S>

  constructor(initValue: T) {
    this.stream = stream<T, S>(_emitter => {
      this.emitter = _emitter
      return () => {
        this.emitter = undefined
      }
    }).onValue(v => {
      this.value = v
    })
    this.emitter?.emit(initValue)
  }

  emit(x: T): BehaviorSubject<T, S> {
    this.emitter?.emit(x)
    return this
  }

  error(x: S): BehaviorSubject<T, S> {
    this.emitter?.error(x)
    return this
  }

  end(): BehaviorSubject<T, S> {
    this.emitter?.end()
    return this
  }

  emitEvent(x: Event<T, S>): BehaviorSubject<T, S> {
    this.emitter?.emitEvent(x)
    return this
  }

  getValue(): T {
    return this.value!
  }
}

const value$ = new BehaviorSubject(0)

const updateValue = (diff: number) => value$.emit(value$.getValue() + diff)

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
    const sub = fromEvents(buttonPlus.current, 'click').observe(() => updateValue(1))
    return sub.unsubscribe
  }, [buttonPlus])

  useEffect(() => {
    const sub = fromEvents(buttonMinus.current, 'click').observe(() => updateValue(-1))
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
    const sub = value$.stream.observe(v => setVal(v))
    return sub.unsubscribe
  }, [])

  return <span>{`Value: ${val}`}</span>
}

register(App, 'keyweb-reactive-kefir')
