import coverImg from '../assets/cases/zendit/cover.png'
import logoImg from '../assets/tools/logo-zendit.png'
import platformOverviewImg from '../assets/cases/zendit/platform-overview.png'
import multiUserScreensImg from '../assets/cases/zendit/multi-user-screens.png'
import multiUserClip from '../assets/cases/zendit/multi-user-flow.mp4'
import multiUserPoster from '../assets/cases/zendit/multi-user-flow-poster.jpg'
import bulkOrderClip from '../assets/cases/zendit/bulk-order-flow.mp4'
import bulkOrderPoster from '../assets/cases/zendit/bulk-order-flow-poster.jpg'

const zendit = {
  id: 'zendit',
  title: 'zendit',
  subtitle: 'B2B Feature Design for a Global Prepaid Platform',
  description: 'B2B platform UX for multi-user account management and bulk eSIM ordering.',
  tags: ['UX Design', 'Web', 'B2B'],
  cover: coverImg,
  logo: logoImg,
  logoWide: true,

  meta: [
    { label: 'Role', value: 'UX Design' },
    { label: 'Platform', value: 'Web' },
    { label: 'Business', value: 'B2B' },
    { label: 'Team', value: '1 designer · 4 devs · PM' },
  ],

  intro:
    'zendit is a B2B platform that gives businesses API access to a global catalog of prepaid services - mobile top-ups, gift cards, eSIMs, and utility payments. It lets clients offer prepaid products without building the infrastructure themselves.',

  introImage: {
    src: platformOverviewImg,
  },

  context:
    'Joined the product during active development. Requirements arrived as intent, not specification, defining the flow, edge cases, and component structure was part of the work.',

  approach:
    'New UI patterns were built within the existing Ant Design-based system: adapted, branded, and delivered as reusable components before being applied in the product.',

  features: [
    {
      title: 'Multi-User Account Management',
      description:
        'Enterprise clients sharing a single zendit account had no way to bring in additional team members or control what each person could access. Everything ran through a single login - a practical and security limitation as teams grew.',
      problem:
        'No prior patterns existed in the product for access control or user administration. The design challenge was figuring out how a permission system should behave within an established interface.',
      work: 'Designed a user administration area where account owners add team members and set what each one can do.',
      decisions: [
        {
          lead: 'Permissions set from the user list.',
          text: 'Owners adjust access for several people in a row, so they never leave the list to do it.',
        },
        {
          lead: 'Ownership transfer.',
          text: 'When the owner leaves the company, the account does not leave with them.',
        },
        {
          lead: 'Deactivate or delete.',
          text: "Depending on a person's status in the organization, the owner can deactivate their access or delete them.",
        },
      ],
      image: multiUserScreensImg,
      imageCaption:
        'Flow diagram developed iteratively alongside the PM spec, covering branching logic and edge case handling. This is a partial view.',
      imageLayout: 'overlay',
      clip: {
        src: multiUserClip,
        poster: multiUserPoster,
        caption: 'Multi-user account management flow example',
      },
    },
    {
      title: 'Bulk Ordering',
      description:
        'High-volume clients were provisioning eSIMs one order at a time. For customers working at scale, this created a significant operational bottleneck with no visibility into progress or failures.',
      problem:
        'No mechanism existed for creating large-volume eSIM orders in a single operation, tracking their processing status, or handling failed transactions without manual intervention on each one.',
      work: 'Designed a Bulk Order tab inside the client account. A new order is an offer ID and a quantity. Once it runs, results split into successful and failed transactions, and the results file can be downloaded and refunds started from there.',
      decisions: [
        {
          lead: 'Wallet balance before submitting.',
          text: 'The client sees whether the balance covers the order before it starts, not after it fails.',
        },
        {
          lead: 'Failed items checked in place.',
          text: 'Each failed transaction opens inside the order, so the client sees why it failed without searching for it.',
        },
      ],
      clip: {
        src: bulkOrderClip,
        poster: bulkOrderPoster,
        caption: 'Bulk ordering flow example',
      },
    },
  ],

  retrospective: [
    'zendit was a year-long engagement covering more features. Working directly with stakeholders, with no predefined flows or UI direction, the work involved mapping interactions, extending the design system, and delivering production-ready flows across multiple parts of the platform.',
    {
      lead: 'What I would measure next:',
      text: 'how often bulk orders have failed items, and how many team members clients add once they can.',
    },
  ],
  retroUrl: 'www.zendit.io',
}

export default zendit
