import React from 'react'
import { createUseStyles } from 'react-jss'

interface Props {
  name?: string
}

const useStyles = createUseStyles({
  root: {
    fontSize: 20,
  },
})

export const Text = ({ name = 'World' }: Props) => {
  const classes = useStyles()
  return <p className={classes.root}>{`Hello, ${name}!`}</p>
}
