import { Link } from 'wouter-preact'
import { List } from '../component/list'
import { Carousel } from '../component/carousel'

interface TurfProps {
  image: string
  title: string
  content: string
  learnMore: string
}
const TurfOption = ({ content, image, learnMore, title }: TurfProps) => (
  <div>
    <img src={image} />
    <div>{title}</div>
    <div>{content}</div>
    <Link href={learnMore}>Learn more</Link>
  </div>
)

const cccc = [
  {
    image: '/asset/banner_home-02.jpg',
    title: 'Residential Turf',
    content:
      'With its low maintenance, uniform good looks and durability, it’s no surprise artificial grass has now become a popular choice for homes throughout Perth.',
    learnMore: '/artificial-grass',
  },
  {
    image: '/asset/banner_home-04.jpg',
    title: 'Wholesale Turf',
    content:
      'Artificial Turf Direct have years of experience working with contractors on large commercial jobs and will work with you to ensure timely completion of projects and within budget.',
    learnMore: '/wholesale/',
  },
  {
    image: '/asset/banner_home-01.jpg',
    title: 'Commercial Turf',
    content:
      'Artificial grass has many commercial applications, thanks to its easy ability to transform outdoor spaces. Whether you’re looking for sports turf or something else, we have you covered.',
    learnMore: '/industries/',
  },
]

interface TurfCarouselProps {
  image: string
  title: string
  content: string
  learnMore?: string
  learnMoreText?: string
}
const TurfCarouselOption = ({
  content,
  image,
  learnMore,
  learnMoreText,
  title,
}: TurfCarouselProps) => (
  <div>
    <img src={image} />
    <div>{title}</div>
    <div>{content}</div>
    {learnMore && <Link href={learnMore}>{learnMoreText}</Link>}
  </div>
)

const dddd = [
  {
    image: '/asset/new-product-arrival.jpg',
    title: 'New product Deluxe 40 ',
    content: 'PU Coating with more UV resistance. Kids& pets friendly',
    learnMore: '/products/deluxe-40/',
    learnMoreText: 'Deluxe 40',
  },
  {
    image: '/asset/HOME1.jpg',
    title: 'Artificial Plants for vertical Gardens',
    content: 'Australia Wide Delivery T&C applied',
    learnMore: '/artificial-plants/',
    learnMoreText: 'Artificial plants',
  },
  {
    image: '/asset/banner_home-01.jpg',
    title: 'Artificial Grass, Wholesale &amp; Direct to the Public',
    content: 'All our products are certified lead free',
  },
]

interface BenefitProps {
  title: string
  content: string
}
const BenefitOption = ({ content, title }: BenefitProps) => (
  <div>
    <div>{title}</div>
    <div>{content}</div>
  </div>
)

const ssss = [
  {
    title: 'Realistic',
    content:
      'Don’t be put off by the name ‘fake grass’. Our high-quality products are designed to appear natural and authentic.',
  },
  {
    title: 'Low maintenance',
    content:
      ' Forget the hassles of fertilising, weeding, or water restrictions. Plus, keep your synthetic lawn looking fresh and clean all year long with our easy-to-follow maintenance manual.',
  },
  {
    title: 'Even coverage',
    content:
      ' From sporting fields to landscaping and everything in between, or synthetic turf offers a smooth and even surface every time. Artificial grass is not prone to bald patches and is the perfect option for those hard-to-grow areas.',
  },
  {
    title: 'Always green',
    content:
      ' Regardless of climate, your new synthetic turf will provide a lush, green oasis all year round.',
  },
  {
    title: 'Safe',
    content:
      ' Our artificial grass is lead-free, with many products manufactured to ISO614001 and/or ISO9001 standards',
  },
]

export const HomePage = () => {
  return (
    <div>
      <Carousel itemComponent={TurfCarouselOption} itemsContent={dddd} />
      <List itemComponent={TurfOption} itemsContent={cccc} />
      <h2>Features And Benefits Of Artificial Turf</h2>
      <p>
        There’s nothing nicer than a lush, green lawn – but there’s no doubt it can be tough to
        achieve with Perth’s hot summer sun and challenging water restrictions. By installing
        artificial lawn, your grass will look good year-round, and, because it’s so low maintenance,
        you’ll have more time to spend on things you want to do.
      </p>
      <List itemComponent={BenefitOption} itemsContent={ssss} />
      <h2>Quality Guarantee Artificial Grass Installation</h2>
      <p>
        From the smallest backyards to big commercial landscapes, our synthetic turf products offer
        something for everyone. Just a few of our many installation projects have included
        commercial installations (synthetic turf sporting fields, artificial grass for function
        centres, schools, universities, public open spaces, hospitals and aged care facilities) and
        residential installations for backyards, apartments and units. Our quality range of
        synthetic turf products can also be purchased at wholesale prices for builders and
        landscapers. There is no minimum order required, and our fully stocked warehouse means we
        have products available for immediate order. We are also proud to offer extensive support to
        all our customers, including assistance with residential approvals for Perth councils. So,
        for services and synthetic turf products you can trust, contact us today to see how we can
        transform your space. Think artificial grass installation is tough? Think again! Our DIY
        residential artificial grass products are simple to install, so you can start enjoying your
        new garden in no time at all. All it takes is a little preparation and some easy-to-follow
        instructions. You can find out more on our installation page. For larger commercial
        artificial turf installation, our experienced team of landscapers will be on hand to offer a
        fast and cost-effective solution for your specific needs. Contact us today for more
        information.
      </p>
      <h2>Contact Artificial Turf Direct</h2>
      <p>
        Our friendly team can help you make the right selection for your project. Visit our O’Connor
        showroom to view and take away samples or discuss your landscaping project with us on
      </p>
      <p>(08) 9337 7715</p>
      <Link href="/contact-us/">Contact us</Link>
    </div>
  )
}
