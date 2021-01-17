import register from 'preact-custom-element'
import styled from 'styled-components'

const Title = styled.p({
  color: 'blue',
})

const Greeting = ({ name = 'World' }) => {
  return <Title>{`Hello, ${name}!`}</Title>
}

register(Greeting, 'x-greeting-3', ['name'])
