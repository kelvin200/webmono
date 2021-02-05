import { setup } from 'goober'
import Markdown from 'markdown-to-jsx'
import { h } from 'preact'
import register from 'preact-custom-element'

setup(h)

export const MyMarkdown = ({ children }: { children: any }) =>
  typeof children !== 'string' ? null : <Markdown>{children}</Markdown>

register(MyMarkdown, 'keyweb-markdown')
