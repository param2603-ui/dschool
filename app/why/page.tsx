import React from 'react';
import PageHeader from '../components/PageHeader';
import SectionCard from '../components/SectionCard';

const WhyPage = () => {
  return (
    <div className="py-24 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
      <PageHeader title="Why Choose Us?" />

      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Quality Isn't Expensive, It's Priceless</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SectionCard
            title="Experienced Instructors"
            description="Learn from certified professionals with years of experience."
          />
          <SectionCard
            title="Flexible Scheduling"
            description="Choose a schedule that fits your lifestyle with weekend and evening classes."
          />
          <SectionCard
            title="Modern Training Vehicles"
            description="Train in the latest vehicles equipped with advanced safety features."
          />
          <SectionCard
            title="Comprehensive Curriculum"
            description="Our curriculum covers everything from basic skills to advanced techniques."
          />
          <SectionCard
            title="Mock Tests"
            description="Prepare for your RTO test with our structured mock tests."
          />
          <SectionCard
            title="Lifetime Support"
            description="Enjoy lifetime support and refresher courses after you pass."
          />
        </div>
      </section>
    </div>
  );
};

export default WhyPage;