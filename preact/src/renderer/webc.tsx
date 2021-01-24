import { nanoid } from 'nanoid'
import { useEffect } from 'preact/hooks'
import { WebcProps } from './types'

interface UrlsElement extends HTMLDivElement {
  urls?: string[]
}

const SCRIPTS_ID = nanoid(5)

export const NodeWebc = ({ name, url }: WebcProps) => {
  useEffect(() => {
    let dom = document.getElementById(SCRIPTS_ID)

    if (!dom) {
      dom = document.createElement('div')
      dom.id = SCRIPTS_ID
      document.body.append(dom)
    }

    let existingUrls = (dom as UrlsElement).urls

    if (!existingUrls) {
      existingUrls = [url]
      ;(dom as UrlsElement).urls = existingUrls
    } else if (existingUrls.includes(url)) return
    else existingUrls.push(url)

    const sc = document.createElement('script')
    sc.src = url
    sc.type = 'text/javascript'
    dom.append(sc)
  }, [url])
  const Tag = name

  return (
    <>
      <Tag />
    </>
  )
}
