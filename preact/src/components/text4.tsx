import { css, setup } from 'goober'
import { h } from 'preact'
import register from 'preact-custom-element'

setup(h)

const BtnClassName = css({
  color: 'red',
})

const Greeting = ({ name = 'World' }) => {
  return <p className={BtnClassName}>{`Hello, ${name}!`}</p>
}

register(Greeting, 'x-greeting-4', ['name'])
