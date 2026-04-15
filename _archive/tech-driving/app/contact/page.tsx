import React from 'react';
import PageHeader from '../components/PageHeader';

export default function ContactPage() {
  return (
    <div className="min-h-screen w-full bg-[var(--bg)] text-[var(--text-primary)]">
      <PageHeader title="Contact Us" />

      <div className="max-w-7xl mx-auto py-24 px-6 md:px-12 lg:px-16">
        <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
        <p className="text-lg mb-4">
          We would love to hear from you! Please reach out with any questions or concerns.
        </p>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-2">Contact Information</h3>
          <p className="mb-1">Phone: +1 (234) 567-890</p>
          <p className="mb-1">Email: info@techdriving.com</p>
          <p>Address: 123 Driving Lane, City, State, ZIP</p>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-2">Location</h3>
          <div className="w-full h-64">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509123!2d144.9537353153164!3d-37.81627997975161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f0f0f0f%3A0x0!2sTech%20Driving!5e0!3m2!1sen!2sau!4v1616161616161!5m2!1sen!2sau"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Visit Us</h3>
          <p>We welcome you to visit our driving school for more information and a tour of our facilities.</p>
        </div>
      </div>
    </div>
  );
}