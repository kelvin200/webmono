import { createSignal } from 'solid-js'
import { For } from 'solid-js/web'

const a = Array.from({ length: 2000 }, (v, i) => i)

export const List = () => {
  const [data, setData] = createSignal(a)
  const fn = () => setData(data().filter((_, x) => x % 7 > 0))

  return (
    <div>
      <button onClick={fn}>clickme</button>
      <For each={data()}>{i => <div>{i}</div>}</For>
    </div>
  )
}
