import coverImg from '../assets/cases/boss-revolution/cover.png'
import bellImg from '../assets/cases/boss-revolution/bell.png'
import introPhoneImg from '../assets/cases/boss-revolution/brev-phones.png'
import screensImg from '../assets/cases/boss-revolution/s3-screens.jpg'
import logoImg from '../assets/tools/BRev_logo_squircle.png'
import toolFigma from '../assets/tools/Figma.png'
import toolMiro from '../assets/tools/Miro.png'
import toolJira from '../assets/tools/Jira.png'
import toolFlutter from '../assets/tools/Flutter.png'

const bossRevolution = {
  id: 'boss-revolution',
  title: 'BOSS Revolution',
  subtitle: 'UX for International Services, VoIP, and Messaging',
  description: 'UX iteration across messaging, calling, mobile top-ups, and money transfers for 1.5M monthly users.',
  tags: ['Mobile', 'UX Design', 'iOS & Android'],
  cover: coverImg,
  logo: logoImg,

  meta: [
    { label: 'Role', value: 'UX Design' },
    { label: 'Platform', value: 'Mobile — iOS & Android' },
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
      imageCaption: 'Key flows — top-up recharge, country home screen, money transfer, and contact card.',
    },
  ],

  retrospective:
    'This project wasn\'t about redesigning everything — it was about making smart, focused improvements where they mattered. We worked through a lot of complexity: legacy flows, platform differences, international regulations, and a wide range of user needs. It took a lot of coordination with product, engineering, and compliance, but the updates made the app easier to use and more consistent across platforms. The feedback has been positive, and more importantly, the foundation is now stronger for future improvements.',
}

export default bossRevolution
