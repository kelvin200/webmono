import { Link, useRoute } from 'wouter-preact'
import { List } from '../component/list'

interface BlahProps {
  href: string
  text: string
}
const NavBarOption = (props: BlahProps) => {
  const [isActive] = useRoute(props.href || '')
  return (
    <Link className={isActive ? 'active' : ''} {...props}>
      {props.text}
    </Link>
  )
}

const blll = [
  {
    href: '/',
    text: 'Home',
  },
  {
    href: '/about',
    text: 'About',
  },
]

export const NavBar = () => (
  <div>
    <div>Logo</div>
    <nav>
      <List itemComponent={NavBarOption} itemsContent={blll} />
    </nav>
  </div>
)
