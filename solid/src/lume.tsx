import { customElement } from 'solid-element'
import { List } from './list'

// customElement('my-component', { someProp: 'one', otherProp: 'two' }, (props, { element }) => {
//     // ... Solid code
//   })

customElement('my-component', { length: undefined }, List)
