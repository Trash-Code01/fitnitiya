// src/pages/Home.jsx

import React from 'react';
import Hero from '../sections/home/Hero';
import BrandMission from '../sections/home/BrandMission';
import FounderIntro from '../sections/home/FounderIntro';
import ProblemSection from '../sections/home/ProblemSection';
import FitniyaSystem from '../sections/home/FitniyaSystem';
import VideoStory from '../sections/home/VideoStory';
import CoreValues from '../sections/home/CoreValues';
import SocialProof from '../sections/home/SocialProof';
import ResultsGallery from '../sections/home/ResultsGallery';
import Differentiator from '../sections/home/Differentiator';
import JourneyTimeline from '../sections/home/JourneyTimeline';
import SocialMarquee from '../sections/home/SocialMarquee';
import FinalCTA from '../sections/home/FinalCTA';
import FAQ from '../sections/home/FAQ';
import PlayfulReviews from '../sections/home/PlayfulReviews';
import Testimonials from '../sections/home/Testimonials';
import FeaturedVideos from '../sections/home/FeaturedVideos';
import FinalMarquee from '../sections/home/FinalMarquee';



const Home = () => {
  return (
    <main>
      <Hero />
      <BrandMission />  
      <FounderIntro />
      <ProblemSection />
      <FitniyaSystem />
      <VideoStory />
      <CoreValues />
      <SocialProof />
      <ResultsGallery />
      <Differentiator />
      <JourneyTimeline />
      <SocialMarquee />
      <FinalCTA />
      <FAQ />
      <PlayfulReviews />
      <Testimonials />
      <FeaturedVideos />
      <FinalMarquee />
     
      {/* Other static sections will go here */}
    </main>
  );
};

export default Home;