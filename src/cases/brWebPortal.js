import coverImg from '../assets/cases/br-web-portal/cover.png'
import introImg from '../assets/cases/br-web-portal/brwp-intro.png'
import challengeImg from '../assets/cases/br-web-portal/IMTU.gif'
import miroImg from '../assets/cases/br-web-portal/brwp-miro.png'
import slice5Img from '../assets/cases/br-web-portal/Slice 5.png'
import slice7Img from '../assets/cases/br-web-portal/Slice 7.png'
import imtuDesktopGif from '../assets/cases/br-web-portal/IMTU_desktop.gif'
import step1Img from '../assets/cases/br-web-portal/1.png'
import step2Img from '../assets/cases/br-web-portal/2.png'
import step3Img from '../assets/cases/br-web-portal/3.png'
import logoImg from '../assets/tools/BRev_logo_squircle.png'
import toolFigma from '../assets/tools/Figma.png'
import toolSketch from '../assets/tools/sketch.png'
import toolMiro from '../assets/tools/Miro.png'
import toolJira from '../assets/tools/Jira.png'
import toolZeplin from '../assets/tools/zeplin 1.png'
import toolStorybook from '../assets/tools/storybook.png'
import toolTailwind from '../assets/tools/Tailwind.png'

const brWebPortal = {
  id: 'br-web-portal',
  title: 'Web Portal',
  subtitle: 'Designing a Web Portal for International Mobile Top-Ups and Account Management',
  description:
    'Extending a successful mobile app feature to a responsive web platform — mobile top-ups and account management for BOSS Revolution.',
  tags: ['Web', 'UX Design', 'Desktop & Mobile'],
  cover: coverImg,
  logo: logoImg,

  meta: [
    { label: 'Role', value: 'Lead UX Design' },
    { label: 'Platform', value: 'Web — Desktop & Mobile' },
    { label: 'Team', value: '1 designer · 2 FE devs · PM · QA' },
  ],

  intro:
    'BOSS Revolution is an international calling and messaging app with extra services as mobile top-ups, and money transfers built in.',

  introImage: {
    src: introImg,
  },

  context:
    'The company already had a successful mobile app with features allowing users to purchase bundles of IMTU (international mobile top-ups). The team saw an opportunity to extend it to a web platform for both mobile and desktop users. My task was to create a web experience that seamlessly integrated with the existing brand\'s look and feel. The underlining framework to be used was chosen to be Tailwind CSS.',

  splitIntro: true,

  tools: [
    { name: 'Figma', icon: toolFigma },
    { name: 'Sketch', icon: toolSketch },
    { name: 'Miro', icon: toolMiro },
    { name: 'Jira', icon: toolJira },
    { name: 'Zeplin', icon: toolZeplin },
    { name: 'Storybook', icon: toolStorybook },
    { name: 'Tailwind', icon: toolTailwind },
  ],

  sections: [
    {
      heading: 'Challenge',
      layout: 'img-left-text-right',
      body: [
        'To adapt a successful mobile feature to work just as smoothly on the web presented it\'s own set of challenges. The real struggle was making sure the desktop version didn\'t feel clunky while keeping everything familiar and on-brand. I had to figure out how to make the experience seamless across both platforms without overcomplicating things.',
        'I began by reviewing the mobile app design to understand the user flow. As always, my approach was iterative:',
      ],
      steps: [
        { icon: step1Img, text: 'Created initial wireframes for both mobile and desktop versions, focusing on usability while adhering to the established layout.' },
        { icon: step2Img, text: 'Collected feedback from stakeholders and the development team, made necessary adjustments, refined the screens, and developed prototypes to meet the requirements.' },
        { icon: step3Img, text: 'Collaborated closely with engineering to ensure the designs were easy to implement and user-friendly, while also aligning with the brand\'s visual identity.' },
      ],
      image: challengeImg,
    },
    {
      layout: 'info-grid',
      cells: [
        { label: 'Role', body: 'Led the design process, from concept to final implementation. Prototyping, usability testing.' },
        { label: 'Team', body: "One designer, 2 Front-end developers, Project manager, QA's." },
        { label: 'Tools', body: 'Sketch, Figma, Storybook, Tailwind CSS, Jira, Miro, Zeplin.' },
        { label: 'Deliverables', body: 'Ready for development Figma flows mixed with some Zeplin handoff.' },
      ],
    },
    {
      heading: 'Iterative Design Process',
      image: miroImg,
      imageCaption: 'A collection of Miro boards showcasing brainstorming, user flow mapping, enabling feedback and alignment across the team.',
    },
    {
      heading: 'Refinement & Handoff',
      body: 'By bringing developers in early, we were able to catch and solve most issues upfront, making sure both the mobile and desktop versions worked smoothly. Throughout the process, we ran several iterations and A/B tests to refine key pages and ensure an optimal user experience.  I also collaborated closely with stakeholders to keep the web portal aligned with the brand\'s look and feel.',
      image: slice5Img,
      image2: imtuDesktopGif,
      image3: slice7Img,
      imageCaption: 'Iterations and A/B tests used to refine the mobile and desktop user experience.',
    },
  ],

  retrospective:
    'The web portal launched in stages after priorities shifted mid-project due to input from marketing and back-end teams. While the timeline and feature set were adjusted, the portal successfully met its immediate goals. Ongoing refinements are underway, ensuring a stronger user experience in future releases.',
  retroUrl: 'www.bossrevolution.com',
}

export default brWebPortal
