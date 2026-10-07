import coverImg from '../assets/cases/boss-money/cover.png'
import heroPhonesImg from '../assets/cases/boss-money/hero-phones.png'
import challengesImg from '../assets/cases/boss-money/challenges.png'
import challengesMobileImg from '../assets/cases/boss-money/Challenges-Goals-mob.png'
import designSystemImg from '../assets/cases/boss-money/design-system.png'
import dataIterationImg from '../assets/cases/boss-money/data-iteration.png'
import researchImg from '../assets/cases/boss-money/research.png'
import evolutionImg from '../assets/cases/boss-money/evolution.png'
import inboxVideo from '../assets/cases/boss-money/Inbox.mp4'
import happyPassVideo from '../assets/cases/boss-money/MT-happy-pass.mp4'
import logoImg from '../assets/tools/BMoney_logo_squircle.png'
import toolFigma from '../assets/tools/Figma.png'
import toolJira from '../assets/tools/Jira.png'
import toolMiro from '../assets/tools/Miro.png'
import toolAmplitude from '../assets/tools/Amplitude.png'

const bossMoney = {
  id: 'boss-money',
  title: 'BOSS Money',
  subtitle: 'Designing the International Money Transfer Experience',
  description:
    'End-to-end redesign of a fintech mobile app for global remittance, including a new design system built from scratch.',
  tags: ['Fintech', 'Mobile', 'UX Design'],
  cover: coverImg,
  logo: logoImg,

  meta: [
    { label: 'Role', value: 'Lead UX Design' },
    { label: 'Platform', value: 'Mobile — Flutter' },
    { label: 'Team', value: '1 designer · 5 devs · PM · QA' },
  ],

  intro:
    'BOSS Money is an international money transfer app that helps people send money worldwide with various options like cash pickup, peer-to-peer mobile wallets, bank transfers, and home delivery.',

  introImage: {
    src: heroPhonesImg,
  },

  context:
    'BOSS Money started as a straightforward app for sending money internationally, primarily focusing on mobile wallet transfers and bank deposits. As the app grew, the original design became too convoluted and struggling to support the new functionalities.',

  approach:
    'To scale efficiently, BOSS Money needed to transition to a unified Flutter code base, aligning with its sister app, BOSS Revolution. This would enable a vision of modular app design for\u00A0both of the apps and beyond.',

  outcomes: [
    { value: '3.9 → 4.9', label: 'Google Play rating in the year after the redesign' },
    {
      value: '12%',
      label:
        'Churn reduction, achieved through a simpler ordering flow and gentle prompts at the point of exit',
    },
  ],

  splitIntro: true,
  introHeroLarge: true,

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
        'Stakeholders used the opportunity to push for a significant redesign. The old design had become emotionally outdated and was no longer able to support the expanding feature set, including new services like peer-to-peer wallet transfers.',
        "It was crucial to simplify the user experience and support the app's evolving international feature set.",
      ],
      image: challengesImg,
      imageMobile: challengesMobileImg,
      layout: 'overlay',
    },
    {
      layout: 'info-grid',
      cells: [
        {
          label: 'My Role',
          body: 'Sole designer, from concept to final implementation. Design system from scratch. Prototyping, usability testing.',
        },
        {
          label: 'Team',
          body: 'One designer, 5 front-end developers, back-end devs, project managers and an owner, QAs.',
        },
        { label: 'Tools', body: 'Figma, Lottie, Jira, Miro, Amplitude.' },
        {
          label: 'Deliverables',
          body: 'Ready for development Figma flows, Lottie micro-animations.',
        },
      ],
    },
    {
      layout: 'two-media',
      image: inboxVideo,
      image2: happyPassVideo,
    },
    {
      heading: 'Research & Competitor Analysis',
      layout: 'text-left-img-right',
      body: [
        'Our team used Amplitude as a tool to research how people were using the app—what features they used the most and where they got stuck. This data was key in helping us figure out where to focus our efforts.',
        'I studied competitors in fintech and beyond to understand what they did well and where ours fell short. That comparison made our opportunity clear: a smoother, more intuitive experience without sacrificing the core features users expect.',
      ],
      image: researchImg,
    },
    {
      heading: 'Design System',
      body: 'The previous app had been built without a formal design system, making it challenging to maintain visual consistency across the interface. This underscored the necessity of creating a design system from the ground up—one that would deliver a cohesive user experience while ensuring alignment across both BOSS apps. After discussions with our front-end team, we decided to base the new design system on Material Design standards, which aligned well with our use of Flutter in development and allowed me to create a scalable system that supported some out-of-the-box solutions to speed up the development process, as well as streamlining the process in general.',
      image: designSystemImg,
    },
    {
      heading: 'Data Based Iteration',
      body: 'Iteration was a big part of how I worked on the products. I used Miro boards to brainstorm, map out user journeys or understand how our behind-the-scenes APIs and overall back end connected to our flows. I also used Amplitude to check out real user data and behavior—to understand where they got stuck, or what went well—and that really helped me make smarter design choices.',
      image: dataIterationImg,
    },
    {
      heading: 'Evolution',
      body: "Looking ahead, I was exploring several design concepts to push the app further. These screens represent potential updates that could enhance the user experience and expand the app's functionality. While still in the early stages, these ideas reflect my focus on continuous improvement and adapting to user needs.",
      image: evolutionImg,
      imageCaption:
        'Exploring redesign solutions for a universal money amount entry across app services, ensuring it accounts for tax, fee, and legal scenarios. Designing a path towards a truly worldwide peer-to-peer in-app wallet product.',
    },
  ],

  retrospective:
    'Like many redesigns, the initial reaction from customers was mixed. People were used to the old version, and the shift took some getting used to. Over the following year, the rating climbed and our key metrics showed a significant boost in transaction numbers, which directly led to an increase in revenue. It became clear that the redesign was a success, and users adapted to the improved experience.',
  retroUrl: 'www.bossmoney.com',
}

export default bossMoney
