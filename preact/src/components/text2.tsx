import register from 'preact-custom-element'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  root: {
    fontSize: 20,
  },
})

const Greeting = ({ name = 'World' }) => {
  const classes = useStyles()
  return <p className={classes.root}>{`Hello, ${name}!`}</p>
}

register(Greeting, 'x-greeting-2', ['name'])
