import { createEffect, createSignal } from 'solid-js'
import { For } from 'solid-js/web'

interface Props {
  length?: number
}
export const List = (props: Props) => {
  const [data, setData] = createSignal<number[]>([])
  const fn = () => setData(data().filter((_, x) => x % 7 > 0))

  createEffect(() => {
    console.log('Bllla', props.length)
    setData(Array.from({ length: (props.length || 5) * 10 }, (v, i) => i))
  })

  return (
    <div>
      <button onClick={fn}>clickme</button>
      <For each={data()}>{i => <div>{i}</div>}</For>
    </div>
  )
}
