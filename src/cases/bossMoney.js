import coverImg from '../assets/cases/boss-money/cover.png'
import heroPhonesImg from '../assets/cases/boss-money/hero-phones.png'
import challengesImg from '../assets/cases/boss-money/challenges.png'
import challengesMobileImg from '../assets/cases/boss-money/Challenges-Goals-mob.png'
import designSystemImg from '../assets/cases/boss-money/design-system.png'
import dataIterationImg from '../assets/cases/boss-money/data-iteration.png'
import researchImg from '../assets/cases/boss-money/research.png'
import evolutionImg from '../assets/cases/boss-money/evolution.png'
import inboxGif from '../assets/cases/boss-money/Inbox.gif'
import happyPassGif from '../assets/cases/boss-money/MT-happy-pass.gif'
import logoImg from '../assets/tools/BMoney_logo_squircle.png'
import toolFigma from '../assets/tools/Figma.png'
import toolJira from '../assets/tools/Jira.png'
import toolMiro from '../assets/tools/Miro.png'
import toolAmplitude from '../assets/tools/Amplitude.png'

const bossMoney = {
  id: 'boss-money',
  title: 'BOSS Money',
  subtitle: 'Redesigning the International Money Transfer Experience',
  description: 'End-to-end redesign of a fintech mobile app for global remittance, including a new design system built from scratch.',
  tags: ['Fintech', 'Mobile', 'UX Design'],
  cover: coverImg,
  logo: logoImg,

  meta: [
    { label: 'Role', value: 'Lead UX Design' },
    { label: 'Platform', value: 'Mobile — Flutter' },
    { label: 'Team', value: '2 designers · 5 devs · PM · QA' },
  ],

  intro:
    'BOSS Money is an international money transfer app that helps people send money worldwide with various options like cash pickup, peer-to-peer mobile wallets, bank transfers, and home delivery.',

  introImage: {
    src: heroPhonesImg,
  },

  context:
    'BOSS Money started as a straight forward app for sending money internationally, primarily focusing on mobile wallet transfers and bank deposits. As the app grew, the original design became too convoluted and struggling to support the new functionalities.',

  approach:
    'To scale efficiently, BOSS Money needed to transition to a unified Flutter code base, aligning with it\'s sister app, BOSS Revolution. This would enable a vision of modular app design for both of the apps and beyond.',

  splitIntro: true,

  tools: [
    { name: 'Figma', icon: toolFigma },
    { name: 'Jira', icon: toolJira },
    { name: 'Miro', icon: toolMiro },
    { name: 'Amplitude', icon: toolAmplitude },
  ],

  sections: [
    {
      heading: 'Challenges and Goals',
      body: [
        'Our team used created opportunity for significant redesign. The old design had become emotionally outdated and was no longer able to support the expanding feature set, including new services like peer-to-peer wallet transfers.',
        'It was crucial to simplify the user experience and support the app\'s evolving international feature set.',
      ],
      image: challengesImg,
      imageMobile: challengesMobileImg,
      layout: 'overlay',
    },
    {
      layout: 'info-grid',
      cells: [
        { label: 'My Role', body: 'Led the design process, from concept to final implementation. Design system from scratch. Prototyping, usability testing.' },
        { label: 'Team', body: "Two designers, 5 front-end developers, back-end devs, project managers and an owner, QA's." },
        { label: 'Tools', body: 'Figma, Lottie, Jira, Miro, Amplitude.' },
        { label: 'Deliverables', body: 'Ready for development Figma flows, Lottie micro-animations.' },
      ],
    },
    {
      layout: 'two-media',
      image: inboxGif,
      image2: happyPassGif,
    },
    {
      heading: 'Research & Competitor Analysis',
      layout: 'text-left-img-right',
      body: [
        'Our team uses Amplitude as a tool to research how people are using the app—what features they used the most and where they get stuck. This data is key in helping us figure out where to focus our efforts.',
        'We also looked at competing apps in fintech space a well as elsewhere to see what they were doing well and where we fell short. This helped us identify opportunities to stand out by offering a smoother, more intuitive user experience, while still keeping all the core functionalities users expect.',
      ],
      image: researchImg,
    },
    {
      heading: 'Design System',
      body: 'The previous app had been built without a formal design system, making it challenging to maintain visual consistency across the interface. This underscored the necessity of creating a design system from the ground up—one that would deliver a cohesive user experience while ensuring alignment across both BOSS apps. After discussions with our front-end team, we decided to base the new design system on Material Design standards, which aligned well with our use of Flutter in development and allowed us to create a scalable system that supported some out-of-the-box solutions to speed up the development process, as well as streamlining the process in general.',
      image: designSystemImg,
    },
    {
      heading: 'Data Based Iteration',
      body: 'Iteration is a big part of how we develop our product. We use Miro boards to map out user flows and see how the app\'s front-end would connect with the back-end. It is the space for brainstorming and figuring out how everything would work—from user actions to the behind-the-scenes API calls. We also employ Amplitude to check out real user data, which really helped us make smarter design choices.',
      image: dataIterationImg,
    },
    {
      heading: 'Evolution',
      body: 'Looking ahead, we are exploring several design concepts to push the app further. These screens represent potential updates that could enhance the user experience and expand the app\'s functionality. While still in the early stages, these ideas reflect our focus on continuous improvement and adapting to user needs.',
      image: evolutionImg,
      imageCaption: 'Exploring redesign solutions for a universal money amount entry across app services, ensuring it accounts for tax, fee, and legal scenarios. Designing a path towards a truly worldwide peer-to-peer in-app wallet product.',
    },
  ],

  retrospective:
    'Like many redesigns, the initial reaction from customers was mixed. People were used to the old version, and the shift took some getting used to. However, over time, the numbers told a different story. Our key metrics showed a significant boost in transaction numbers, which directly led to an increase in revenue. Over time, it became clear that the redesign was a success, and users adapted to the improved experience.',
  retroUrl: 'www.bossmoney.com',
}

export default bossMoney
