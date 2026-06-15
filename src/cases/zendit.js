import coverImg from '../assets/cases/zendit/cover.png'
import logoImg from '../assets/tools/logo-zendit.png'
import platformOverviewImg from '../assets/cases/zendit/platform-overview.png'
import multiUserScreensImg from '../assets/cases/zendit/multi-user-screens.png'

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
  ],

  intro:
    'zendit is a B2B platform that gives businesses API access to a global catalog of prepaid services - mobile top-ups, gift cards, eSIMs, and utility payments. It lets clients offer prepaid products without building the infrastructure themselves',

  introImage: {
    src: platformOverviewImg,
  },

  context:
    'Joined the product during active development. Requirements arrived as intent, not specification, defining the flow, edge cases, and component structure was part of the work.',

  approach:
    'New UI patterns were built within the existing Ant Design based system adapted, branded, and delivered as reusable components before being applied in the product.',

  features: [
    {
      title: 'Multi-User Account Management',
      description:
        'Enterprise clients sharing a single zendit account had no way to bring in additional team members or control what each person could access. Everything ran through a single login - a practical and security limitation as teams grew.',
      problem:
        'No prior patterns existed in the product for access control or user administration. The design challenge was figuring out how a permission system should behave within an established interface.',
      work:
        'Designed a user administration area where account owners can add team members and configure permissions individually - without navigating away from the user list. Ownership transfer and status controls handle the edge cases that matter when organizations change.',
      image: multiUserScreensImg,
      imageCaption:
        'Flow diagram developed iteratively alongside the PM spec, covering branching logic and edge case handling. This is a partial view',
      imageLayout: 'overlay',
      videoId: '2xNjhaiw-xQ',
    },
    {
      title: 'Bulk Ordering',
      description:
        'High-volume clients were provisioning eSIMs one order at a time. For customers working at scale, this created a significant operational bottleneck with no visibility into progress or failures.',
      problem:
        'No mechanism existed for creating large-volume eSIM orders in a single operation, tracking their processing status, or handling failed transactions without manual intervention on each one.',
      work:
        'Designed a Bulk Order flow within the existing client account area. Order creation, processing status, and exception handling all live in one place Bulk eSIM ordering starts inside an existing client account, from the Bulk Order tab. A new order is created by entering an offer ID and quantity, with wallet balance visible before submission. Once submitted, the order processes and results break down into successful and failed transactions, each investigable in place. Files can be downloaded and refunds initiated from the same view.',
      videoId: 'XwNI9jVlCOk',
    },
  ],

  retrospective:
    'zendit was a year-long engagement covering more features. Working directly from product specs with no predefined flows or UI direction, the work involved mapping interactions, extending the design system, and delivering production-ready flows across multiple parts of the platform.',
  retroUrl: 'www.zendit.io',
}

export default zendit
