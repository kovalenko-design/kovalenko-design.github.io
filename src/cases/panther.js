// Panther POS case data.
import coverImg from '../assets/cases/panther/cover.png'
import logoImg from '../assets/cases/panther/panther-logo.png'
import heroImg from '../assets/cases/panther/hero.webp'
import pizzaBuilderClip from '../assets/cases/panther/pizza-builder.mp4'
import pizzaBuilderPoster from '../assets/cases/panther/pizza-builder-poster.jpg'
import pizzaCreatorClip from '../assets/cases/panther/pizza-creator.mp4'
import pizzaCreatorPoster from '../assets/cases/panther/pizza-creator-poster.jpg'
import ceaClip from '../assets/cases/panther/cea-flow.mp4'
import ceaPoster from '../assets/cases/panther/cea-flow-poster.jpg'
import challengesImg from '../assets/cases/panther/challenges.webp'
// The four screens, cut from the 4290 px exports and saved at 2400 px wide (tablet only, shadow removed).
import screenProduct from '../assets/cases/panther/screen-product.webp'
import screenImport from '../assets/cases/panther/screen-import.webp'
import screenReports from '../assets/cases/panther/screen-reports.webp'
import screenPromotions from '../assets/cases/panther/screen-promotions.webp'
import designSystemImg from '../assets/cases/panther/design-system.webp'
// Two pages rendered from the real brief, research and PRD (public sources only, internal parts left out).
import aiDiscoveryOverview from '../assets/cases/panther/ai-discovery-overview.png'
import aiDiscoveryResearch from '../assets/cases/panther/ai-discovery-research.png'
import driftAnnotation from '../assets/cases/panther/drift-annotation-button.png'
import driftComponentConfig from '../assets/cases/panther/drift-component-config.png'
// Line drawings of the payment devices, shown as a row above the Consumer Engagement App clip.
import deviceA30 from '../assets/cases/panther/device-a30.png'
import deviceSlot from '../assets/cases/panther/device-slot.png'
import deviceA35 from '../assets/cases/panther/device-a35.png'


const panther = {
  id: 'panther',
  title: 'Panther POS',
  subtitle: 'Building a Point of Sale for Small Retail',
  description:
    'A ground-up rebuild of a legacy point-of-sale system for small retailers, including a design system built from scratch.',
  tags: ['Retail', 'UX Design'],
  cover: coverImg,
  logo: logoImg,

  meta: [
    { label: 'Role', value: 'Lead UX Design' },
    { label: 'Platform', value: 'Kotlin Multiplatform' },
    { label: 'Team', value: '2 designers · PM · QA · Front-end · Back-end' },
  ],

  intro:
    'Panther POS is the point-of-sale system from National Retail Solutions (NRS), built for small retail businesses such as bodegas and corner stores. Some also run a small kitchen that makes pizza or sandwiches.',

  introImage: {
    src: heroImg,
  },

  context:
    'NRS gives Panther away as a free base app and earns from subscriptions to the modules stores add to it. That only works if the product can keep growing: new modules, new devices, a growing user base, fewer bugs and fewer support calls. The old POS was not built for that, so its front end and back end were scrapped and rebuilt from scratch while customers were already using it.',

  approach:
    'The new app runs on Kotlin Multiplatform, so one codebase can serve Android and iOS tablets. Native was a deliberate choice: cashiers work from muscle memory, and a web-based POS would not react fast enough. The goal was a modular product that can keep growing with new features and plug-and-play devices.',

  splitIntro: true,

  // No `tools` field on purpose: tools are named in the info grid instead of an icon row.

  sections: [
    {
      heading: 'Challenges and Goals',
      body: [
        'Panther already had a small group of customers, and they could not be handed a completely different app overnight. The product also needed to become fast, modular, and ready for new features and devices.',
        "Printers, scanners, the cash drawer and the scale connect through NRS's own cloud service, and the app can still do basic math offline. Along the way I researched Square, Toast, Clover and Lightspeed to see which patterns cashiers already know.",
      ],
      image: challengesImg,
      layout: 'two-col-body',
    },
    {
      layout: 'info-grid',
      cells: [
        {
          label: 'My Role',
          body: 'Led design on Panther with one other designer over about two years. Built the design system and designed the Consumer Engagement App on my own. I also support the other NRS products my team works on.',
        },
        {
          label: 'Team',
          body: 'Two designers on Panther, working with a product manager, a QA team, and front-end and back-end teams.',
        },
        {
          label: 'Tools',
          body: 'Figma, and an AI-assisted workflow that ties the Kotlin repository to the design system.',
        },
        {
          label: 'Deliverables',
          body: 'Handoff assets, Figma files, AI-built prototypes, the design system, design QA docs, and the GitHub repo with the AI pipeline that supported the work.',
        },
      ],
    },
    {
      heading: 'AI for research',
      layout: 'carousel',
      body: [
        "Besides prototyping and design, I use AI to get from an idea to a PRD, with three skills I wrote. /dm-brief interviews me one question at a time. /dm-research finds real competitors and links a source for every claim. /dm-prd combines the two into a PRD and lists what's still missing.",
      ],
      slides: [
        { image: aiDiscoveryOverview, caption: 'The brief, the research and the PRD for Panther' },
        {
          image: aiDiscoveryResearch,
          caption: 'The research: seven real competitors with sources, and a stated gap',
        },
      ],
    },
    {
      // The rollout as four stages, told as the story of the product.
      heading: 'The rollout',
      layout: 'timeline',
      stages: [
        {
          title: 'Same look, new stack',
          body: 'The first release looked exactly like the old one, just running on the new stack.',
        },
        {
          title: 'Small steps',
          body: 'After that, the app changed in small steps, so customers who were already using it were not shocked.',
        },
        {
          title: 'Earning trust',
          body: 'As the product grew, so did the trust of customers and stakeholders. That let us do things we could not do before, and calmer colors are one example.',
        },
        {
          title: 'Today',
          body: 'The product keeps growing with new modules and new features. The plan is to move into quick service restaurants, a new domain for us.',
        },
      ],
      note: {
        label: 'Challenge:',
        body: 'cashiers work from muscle memory, so component positions stayed put and expert stakeholders reviewed every change.',
      },
    },
    {
      // One section: title, what it is (with the cashier's ordering issue in one sentence), the hard part, then the clip.
      heading: 'New tools for retailers with in-store pizza kitchens',
      body: [
        'Many NRS customers have a small kitchen in the shop, and a module for it could bring in new customers and improve margins. Pizza Builder lets a cashier build a custom pizza on the tablet, and the order goes to the kitchen as a printed ticket. Customers do not order in a fixed sequence, so the cashier can switch between the left half, the right half and the whole pizza at any moment, and set how much of each ingredient goes on that side.',
        'The hard part was the domain: specialist companies such as Slice make POS software only for pizza shops, so I started by learning how they work and what the fastest way to build a pizza is.',
      ],
      // A looping clip that opens full screen on click.
      clip: {
        src: pizzaBuilderClip,
        poster: pizzaBuilderPoster,
        caption: 'Pizza Builder flow example',
      },
    },
    {
      heading: 'Builder Creator',
      body: 'The Builder Creator is where a store clerk with the right access sets up the builder: which modifiers are available and in what order they appear.',
      clip: {
        src: pizzaCreatorClip,
        poster: pizzaCreatorPoster,
        caption: 'Builder Creator flow example',
      },
    },
    {
      // The three paragraphs follow the slide order (import, reports, promotions).
      heading: 'Beyond the register',
      layout: 'carousel',
      body: [
        {
          lead: 'Pricebook import',
          text: "is an important onboarding tool. A store owner who used another company's system can bring their whole inventory database over to ours, and we do a lot of work on the back end to match it with our naming standards and ways of doing things.",
        },
        {
          lead: 'Reports',
          text: 'is one of the most important screens for a store owner, where they can track the daily activity for sales and inventory.',
        },
        {
          lead: 'Promotions',
          text: 'is where they create and monitor the promotions they run, with a small dashboard that shows how each one performed.',
        },
      ],
      slides: [
        { image: screenProduct, caption: 'Create or edit products to sell' },
        { image: screenImport, caption: 'Pricebook import: review step' },
        { image: screenReports, caption: 'Sales and inventory reports' },
        { image: screenPromotions, caption: 'Create and track promotions' },
      ],
    },
    {
      heading: 'Design System',
      body: [
        'Since the stack is Kotlin Multiplatform, I stayed in the Google family and used Material Design as the base. It is heavily modified, with its own variables, design tokens and components, and component states are named in the same language the developers use in their UI library. The system was built while the rollout was happening, so the UI file always reused the proper components instead of redoing work.',
      ],
      // Overview bento, exported at 2560 px wide.
      image: designSystemImg,
      imageCaption:
        'The Panther design system at a glance: color, typography, components, spacing, icons, and the three token tiers.',
      // The drift paragraph sits below the overview and above the pair of drift images.
      bodyAfter:
        'The end goal was for AI agents to reuse the components on their own and build separate screens. For some screens, they already do. Design and code drift apart over time, though. I used AI to compare the Kotlin Multiplatform UI repository with the Figma design system. Repeated scans, plus skills I wrote to mark inconsistencies and gaps directly in the Figma file, showed where design and implementation disagreed on elements and tokens. We then agreed with the developers on a common approach for each case.',
      // What the scan leaves behind in Figma: an annotation card on the canvas and the same details in the component description.
      pair: [
        {
          image: driftAnnotation,
          caption:
            'An annotation card on the Figma canvas: the Kotlin package, a link to the file, the props, and a flagged gap (the red line at the bottom): two button types that exist in code but not yet in Figma.',
        },
        {
          image: driftComponentConfig,
          caption:
            "The same details in the component's description. An agent may never open the properties panel, so the card sits on the canvas right next to the component, where it is hard to miss.",
        },
      ],
    },
    {
      heading: 'Consumer Engagement App',
      layout: 'clip-side',
      devices: [deviceA30, deviceSlot, deviceA35],
      body: [
        "The app runs on the payment devices at the counter: touchscreens with built-in card and chip readers, running Android, so they can run custom software. They are also a second screen facing the customer. When a device is idle, its screen plays a slideshow of ads or relevant messages, and during a sale it shows the customer their basket as it fills. That is a business opportunity: selling screen time.",
        "I was the only designer on it and designed it from scratch, working from a list of business needs from stakeholders. The device and the app are standalone: they don't connect to the POS directly, only through the cloud. That connection has to be established and held before the device can pair with a specific POS terminal. The MVP proved we could do that, and V1 added ads, the live basket animation and tipping.",
      ],
      // The customer-facing flow as a looping clip, with a row of device drawings above it.
      clip: {
        src: ceaClip,
        poster: ceaPoster,
        caption:
          'The customer-facing flow, happy path: connecting to the terminal, signing in to BOSS Club, the basket filling as items are added, the tip choice, and the thank-you screen.',
      },
    },
  ],

  retrospective:
    "Android is live for all customers. Because the app is built on Kotlin Multiplatform, iOS (already tested and working) and the web are ready to go too, but the company's goals are not there yet. On the Consumer Engagement App, the MVP and V1 are built and V2 is designed and ready for development. For scale, NRS as a whole runs about 39,300 active POS terminals for independent retailers. Panther is a functional, clean product on a design system built to keep growing, which was the goal.",
  // No retroUrl on purpose.
}

export default panther
