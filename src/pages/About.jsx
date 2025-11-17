/* eslint-disable no-unused-vars */
import React from 'react';
import { IoIosHeart, IoIosRocket, IoIosBody } from 'react-icons/io';
import Hero from '../sections/about/Hero';
import Founders from '../sections/about/Founders';
import OriginStory from '../sections/about/OriginStory';
import WhyGrid from '../sections/about/WhyGrid';
import Mission from '../sections/about/Mission';
import CTA from '../sections/about/CTA';

// --- STATIC CONTENT SCHEMA ---
const aboutContent = {
  hero: {
    heading: "We're Niyati & Yash",
    subheading: "The heart and science behind Fitniya. We're a husband-and-wife team dedicated to one mission: helping women build the strength and confidence they deserve."
  },
  niyati: {
    name: "Niyati Chauhan",
    title: "The Heart: Cofounder & Confidence Coach",
    story: "I know what it's like to feel invisible. For years, I struggled with a fast metabolism and a poor appetite. I was tired of hearing 'you should just eat more.' I founded Fitniya to create the supportive, empathetic, and science-backed space I never had.",
    img: "https://img.freepik.com/free-photo/brunette-businesswoman-posing_23-2148142767.jpg?t=st=1763351361~exp=1763354961~hmac=728dc3768047e4bc557371d22b9fa5e29b22d51b1e8acc2af29f80e4b897a368&w=1480"
  },
  yash: {
    name: "Yash Chauhan",
    title: "The Science: Founder & Head Coach",
    story: "While Niyati provides the heart, I provide the science. With a decade in athletic coaching, I build the systems. My programs are based on proven exercise physiology and nutritional science to ensure you're not just gaining weight, but building sustainable, functional strength.",
    img: "https://img.freepik.com/free-photo/portrait-elegant-professional-businessman_23-2150917272.jpg?t=st=1763351554~exp=1763355154~hmac=2b0650da7e7936357a0a634c1a00c38dc317340c22d426f05d5adabd4b8dbbf1&w=1480"
  },
  ourStory: {
    sections: [
      {
        number: "01",
        title: "The Struggle",
        content: "Niyati spent years battling with her body image, trying every diet and program designed for weight loss—when what she needed was the complete opposite. She felt invisible, dismissed, and alone."
      },
      {
        number: "02",
        title: "The Expertise",
        content: "Meanwhile, Yash was coaching athletes to peak performance, watching them transform through science-backed nutrition and training. He saw what was possible when the right system met the right support."
      },
      {
        number: "03",
        title: "The Gap",
        content: "Together, we realized there was a massive gap in the fitness industry: no one was truly serving women who wanted to gain weight healthily. The programs, the advice, the support—none of it existed."
      },
      {
        number: "04",
        title: "The Birth of Fitniya",
        content: "We combined Niyati's empathy and lived experience with Yash's decade of coaching expertise to create Fitniya—a program that doesn't just add pounds, but builds confidence, strength, and a healthier relationship with food and fitness."
      }
    ]
  },
  whyWeStarted: [
    {
      icon: IoIosHeart,
      title: "Personal Experience",
      description: "Niyati lived through the frustration of being told to 'just eat more' without real guidance or support. We started Fitniya because we know firsthand how isolating this journey can feel."
    },
    {
      icon: IoIosRocket,
      title: "Fill the Gap",
      description: "The fitness industry is saturated with weight loss programs, but where's the support for women who want to gain weight healthily? We saw a need and decided to fill it with science and empathy."
    },
    {
      icon: IoIosBody,
      title: "Create Real Change",
      description: "We didn't want to create another generic meal plan app. We wanted to build a 1:1 coaching experience that transforms not just bodies, but confidence and self-worth."
    }
  ],
  ourMission: {
    bigNumber: "10,000",
    headline: "Women Transformed",
    content: "Our mission is simple but powerful: to help 10,000 women gain healthy weight, build sustainable strength, and unlock the confidence they deserve. We believe every woman deserves to feel strong, nourished, and empowered in her own skin.",
    features: [
      "Science-backed nutrition strategies",
      "1:1 coaching & real human support",
      "Sustainable habit building",
      "Confidence transformation"
    ]
  },
  cta: {
    heading: "Ready to Start Your Journey?",
    subheading: "You don't have to do this alone. Let's build your new story, together.",
    buttonText: "Book Your Free 1:1 Call"
  }
};

const About = () => {
  const { hero, niyati, yash, ourStory, whyWeStarted, ourMission, cta } = aboutContent;
  return (
    <main className="bg-white overflow-hidden">
      <Hero heading={hero.heading} subheading={hero.subheading} />
      <Founders niyati={niyati} yash={yash} />
      <OriginStory sections={ourStory.sections} />
      <WhyGrid cards={whyWeStarted} />
      <Mission mission={ourMission} />
      <CTA heading={cta.heading} subheading={cta.subheading} buttonText={cta.buttonText} />
    </main>
  );
};

export default About;