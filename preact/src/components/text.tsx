import { css, keyframes, setup } from 'goober'
import { h } from 'preact'
import register from 'preact-custom-element'

setup(h)

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

const Sample = ({ color, name = 'Default value' }: Props) => {
  const classes = useStyles({ color })
  return (
    <div>
      <p className={classes.normal}>Normal</p>
      <p className={classes.normalProp}>{`With props: ${name}`}</p>
      <p className={classes.animated}>Animated</p>
    </div>
  )
}

register(Sample, 'preact-sample-css', ['color'])
