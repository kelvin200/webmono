import { LitElement, property } from 'lit-element'
import { FC } from 'react'

interface MFEProps<T> {
  component: FC<T>
  componentProps: T
}

export function MFE<T>({ component, componentProps }: MFEProps<T>) {
  return component(componentProps)
}

export abstract class TemplateMFE extends LitElement {
  @property()
  commonAttribute = ''

  container: HTMLDivElement

  constructor() {
    super()

    const container = document.createElement('div')

    this.container = container
  }
}
