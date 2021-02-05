import { css, keyframes } from 'goober'
import register from 'preact-custom-element'
import { useCallback, useState } from 'preact/hooks'

const rotate = keyframes`
  from, to {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }
`

interface Props {
  color?: string
  name?: string
}

const useStyles = ({ color = 'black' }: Props) => ({
  normal: css({
    color: 'red',
    fontSize: '30px',
  }),
  normalProp: css({
    color,
  }),
  animated: css({
    background: 'tomato',
    color: 'white',
    display: 'block',
    animation: `${rotate} 5s ease-in-out infinite`,
  }),
})

export const Sample = ({ color, name = 'Default value' }: Props) => {
  const classes = useStyles({ color })
  const [value, setValue] = useState(0)
  const onClick = useCallback(() => {
    setValue(x => x + 1)
  }, [])
  return (
    <div>
      <p className={classes.normal}>Normal</p>
      <p className={classes.normalProp}>{`With props: ${name}`}</p>
      <p className={classes.animated}>{value}</p>
      <button onClick={onClick}>Click me</button>
    </div>
  )
}

register(Sample, 'preact-sample-css', ['color'])
