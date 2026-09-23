import coverImg from '../assets/cases/boss-revolution/cover.png'
import bellImg from '../assets/cases/boss-revolution/bell.png'
import introPhoneImg from '../assets/cases/boss-revolution/brev-phones.png'
import screensImg from '../assets/cases/boss-revolution/s3-screens.jpg'
import webPortalHeroImg from '../assets/cases/boss-revolution/brwp-intro.png'
import miroImg from '../assets/cases/boss-revolution/brwp-miro.png'
import slice5Img from '../assets/cases/boss-revolution/Slice 5.png'
import slice7Img from '../assets/cases/boss-revolution/Slice 7.png'
import imtuDesktopGif from '../assets/cases/boss-revolution/IMTU_desktop.gif'
import imtuFlowClip from '../assets/cases/boss-revolution/imtu-flow.mp4'
import imtuFlowPoster from '../assets/cases/boss-revolution/imtu-flow-poster.png'
import step1Img from '../assets/cases/boss-revolution/step1.png'
import step2Img from '../assets/cases/boss-revolution/step2.png'
import step3Img from '../assets/cases/boss-revolution/step3.png'
import logoImg from '../assets/tools/BRev_logo_squircle.png'
import toolFigma from '../assets/tools/Figma.png'
import toolMiro from '../assets/tools/Miro.png'
import toolJira from '../assets/tools/Jira.png'
import toolFlutter from '../assets/tools/Flutter.png'
import toolSketch from '../assets/tools/sketch.png'
import toolZeplin from '../assets/tools/zeplin 1.png'
import toolStorybook from '../assets/tools/storybook.png'
import toolTailwind from '../assets/tools/Tailwind.png'

const bossRevolution = {
  id: 'boss-revolution',
  title: 'BOSS Revolution',
  subtitle: 'UX for International Services, VoIP, and Messaging',
  description:
    'UX iteration across messaging, calling, mobile top-ups, and money transfers for 1.5M monthly users.',
  tags: ['Mobile & Web', 'UX Design', 'iOS, Android & Desktop'],
  cover: coverImg,
  logo: logoImg,

  meta: [
    { label: 'Role', value: 'UX Design' },
    { label: 'Platform', value: 'Mobile & Web' },
    { label: 'Scale', value: '1.5M users/month' },
  ],

  intro:
    'BOSS Revolution is used by 1.5 million people each month. The platform helps immigrant communities and international families stay close—offering messaging, affordable calling, fast remittance service, and mobile top-ups across borders.',

  introImage: {
    src: introPhoneImg,
  },
  introBgImage: bellImg,

  context:
    'This is a UX iteration project focused on simplifying UI for messaging, VOiP, mobile top-ups, and money transfers on iOS and Android.',

  splitIntro: true,
  introImageSmall: true,

  tools: [
    { name: 'Figma', icon: toolFigma },
    { name: 'Miro', icon: toolMiro },
    { name: 'Jira', icon: toolJira },
    { name: 'Flutter', icon: toolFlutter },
  ],

  sections: [
    {
      heading: 'The Challenge',
      body: [
        'The app supports a wide variety of financial and communication services, spanning over 300+ mobile carriers in 100+ countries. Designing under these complex conditions — while working with legacy components and meeting strict compliance rules — required surgical UX updates without breaking core flows.',
        'We also had to: Maintain trust and clarity in every transaction Support non-tech-savvy users across languages and cultures Work with region-specific delivery options (cash pickup, home delivery, etc.)',
      ],
      image: screensImg,
      imageCaption:
        'Key flows — top-up recharge, country home screen, money transfer, and contact card.',
    },
    {
      layout: 'section-intro',
      heading: 'Web Portal: Expanding the In-App Experience\nto the Web',
      meta: [
        { label: 'Role', value: 'Lead UX Design' },
        { label: 'Platform', value: 'Web — Desktop & Mobile' },
        { label: 'Team', value: '1 designer · 2 FE devs · PM · QA' },
      ],
      body: "The same BOSS Revolution experience as the native app — top-ups and account management — built as a web portal for people who'd rather not install it.",
      introImage: {
        src: webPortalHeroImg,
      },
      context:
        "The company already had a successful mobile app with features allowing users to purchase bundles of IMTU (international mobile top-ups). The team saw an opportunity to extend it to a web platform for both mobile and desktop users. My task was to create a web experience that seamlessly integrated with the existing brand's look and feel. The underlining framework to be used was chosen to be Tailwind CSS.",
      tools: [
        { name: 'Figma', icon: toolFigma },
        { name: 'Sketch', icon: toolSketch },
        { name: 'Miro', icon: toolMiro },
        { name: 'Jira', icon: toolJira },
        { name: 'Zeplin', icon: toolZeplin },
        { name: 'Storybook', icon: toolStorybook },
        { name: 'Tailwind', icon: toolTailwind },
      ],
    },
    {
      heading: 'Challenge',
      layout: 'img-left-text-right',
      body: [
        "To adapt a successful mobile feature to work just as smoothly on the web presented it's own set of challenges. The real struggle was making sure the desktop version didn't feel clunky while keeping everything familiar and on-brand. I had to figure out how to make the experience seamless across both platforms without overcomplicating things.",
        'I began by reviewing the mobile app design to understand the user flow. As always, my approach was iterative:',
      ],
      clip: {
        src: imtuFlowClip,
        poster: imtuFlowPoster,
        caption: 'IMTU flow example',
      },
      steps: [
        {
          icon: step1Img,
          text: 'Created initial wireframes for both mobile and desktop versions, focusing on usability while adhering to the established layout.',
        },
        {
          icon: step2Img,
          text: 'Collected feedback from stakeholders and the development team, made necessary adjustments, refined the screens, and developed prototypes to meet the requirements.',
        },
        {
          icon: step3Img,
          text: "Collaborated closely with engineering to ensure the designs were easy to implement and user-friendly, while also aligning with the brand's visual identity.",
        },
      ],
    },
    {
      layout: 'info-grid',
      cells: [
        {
          label: 'Role',
          body: 'Led the design process, from concept to final implementation. Prototyping, usability testing.',
        },
        { label: 'Team', body: "One designer, 2 Front-end developers, Project manager, QA's." },
        { label: 'Tools', body: 'Sketch, Figma, Storybook, Tailwind CSS, Jira, Miro, Zeplin.' },
        {
          label: 'Deliverables',
          body: 'Ready for development Figma flows mixed with some Zeplin handoff.',
        },
      ],
    },
    {
      heading: 'Iterative Design Process',
      image: miroImg,
      imageCaption:
        'A collection of Miro boards showcasing brainstorming, user flow mapping, enabling feedback and alignment across the team.',
    },
    {
      heading: 'Refinement & Handoff',
      body: "By bringing developers in early, we were able to catch and solve most issues upfront, making sure both the mobile and desktop versions worked smoothly. Throughout the process, we ran several iterations and A/B tests to refine key pages and ensure an optimal user experience.  I also collaborated closely with stakeholders to keep the web portal aligned with the brand's look and feel.",
      image: slice5Img,
      image2: imtuDesktopGif,
      image3: slice7Img,
      imageCaption:
        'Iterations and A/B tests used to refine the mobile and desktop user experience.',
    },
  ],

  retrospective:
    "This project wasn't about redesigning everything — it was about making smart, focused improvements where they mattered. We worked through a lot of complexity: legacy flows, platform differences, international regulations, and a wide range of user needs. It took a lot of coordination with product, engineering, and compliance, but the updates made the app easier to use and more consistent across platforms. The feedback has been positive, and more importantly, the foundation is now stronger for future improvements.\n\nThe web portal launched in stages after priorities shifted mid-project due to input from marketing and back-end teams. While the timeline and feature set were adjusted, the portal successfully met its immediate goals. Ongoing refinements are underway, ensuring a stronger user experience in future releases.",
  retroUrl: 'www.bossrevolution.com',
}

export default bossRevolution
