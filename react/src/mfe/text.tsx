import { customElement, html, property } from 'lit-element'
import React from 'react'
import ReactDOM from 'react-dom'
import { MFE, TemplateMFE } from '../mfe'
import { Text } from '../components/text'

@customElement('webmono-text')
export class TextMFE extends TemplateMFE {
  @property({ attribute: false }) hello = ''

  render() {
    ReactDOM.render(<MFE component={Text} componentProps={{ name: this.hello }} />, this.container)

    return html`${this.container}`
  }
}
