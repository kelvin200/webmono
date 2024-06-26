const homeCarousel = [
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

const homeList = [
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

const homeListBtm = [
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

const navbar = [
  {
    url: '/',
    text: 'Home',
  },
  {
    url: '/about',
    text: 'About',
  },
]

const home = [
  '@N:homeCarousel',
  '@N:homeList',
  '@H2:Features And Benefits Of Artificial Turf',
  `@P:There’s nothing nicer than a lush, green lawn – but there’s no doubt it can be tough to
  achieve with Perth’s hot summer sun and challenging water restrictions. By installing
  artificial lawn, your grass will look good year-round, and, because it’s so low maintenance,
  you’ll have more time to spend on things you want to do.`,
  '@N:homeListBtm',
  '@H2:Quality Guarantee Artificial Grass Installation',
  `@P:From the smallest backyards to big commercial landscapes, our synthetic turf products offer
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
  information.`,
  '@H2:Contact Artificial Turf Direct',
  `@P:Our friendly team can help you make the right selection for your project. Visit our O’Connor
  showroom to view and take away samples or discuss your landscaping project with us on`,
  '@PHONE:(08) 9337 7715',
  '@LINK:/contact-us/|${Contact us}',
]

export const config = {
  node: {
    root: {
      type: 'GRID',
      style: {
        // gridTemplateColumns: '40px 50px auto 50px 40px',
        // gridTemplateRows: '25% 100px auto',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      },
      content: {
        '0,0': '@N:sidebar',
        '0,1': '@N:navbar',
        '1,1': '@N:rootContent',
      },
    },
    sidebar: {
      type: 'MD',
      content: 'dddddd',
      style: {
        gridColumnStart: 1,
        gridColumnEnd: 3,
        gridRowStart: 1,
        gridRowEnd: 'last-line',
      },
    },
    navbar: {
      type: 'NAVBAR',
      content: navbar,
      style: {
        gridColumnStart: 3,
        gridColumnEnd: 'end',
        gridRowStart: 1,
        gridRowEnd: 2,
      },
      // direction: 'row',
      // contentSrc: 'content-navbar',
      // itemTemplate: '@LINK:$.url|$.text',
    },
    rootContent: {
      operator: 'lookup',
      input: [
        '$.route',
        {
          '/': '@N:home',
          '/about': '@N:about',
        },
      ],
      style: {
        gridColumnStart: 3,
        gridColumnEnd: 'end',
        gridRowStart: 2,
        gridRowEnd: 'last-line',
      },
    },

    homeCarousel: {
      type: 'CAROUSEL',
      contentSrc: 'content-1',
      itemTemplate: {
        content: [
          '@IMG:$.image',
          '@DIV:$.title',
          '@DIV:$.content',
          '@LINK:$.learnMore:$.learnMoreText',
        ],
      },
    },
    homeList: {
      type: 'LIST',
      direction: 'row',
      contentSrc: 'content-2',
      itemTemplate: {
        content: [
          '@IMG:$.image',
          '@DIV:$.title',
          '@DIV:$.content',
          '@LINK:$.learnMore:${Learn more}',
        ],
      },
    },
    homeListBtn: {
      type: 'LIST',
      direction: 'row',
      contentSrc: 'content-3',
      itemTemplate: {
        content: ['@DIV:$.title', '@DIV:$.content'],
      },
    },
    home: {
      contentSrc: 'content-home',
    },
  },
  root: '@N:root',
}

export const cmsMap = {
  'content-1': homeCarousel,
  'content-2': homeList,
  'content-3': homeListBtm,
  'content-navbar': navbar,
  'content-home': home,
  'content-config': config,
}
