import PageHeader from "../components/PageHeader";

export default function AboutPage() {
  return (
    <div className="py-24 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
      <PageHeader title="About Us" />

      <section className="mt-12">
        <h2 className="text-3xl font-bold mb-4">Who We Are</h2>
        <p className="text-lg leading-relaxed mb-6">
          At Tech Driving, we are dedicated to providing a modern and innovative approach to driving education. Our mission is to equip learners with the skills and confidence they need to become safe and responsible drivers.
        </p>
        <p className="text-lg leading-relaxed mb-6">
          Our team of certified instructors brings years of experience and a passion for teaching. We utilize state-of-the-art simulators and real-world driving scenarios to ensure our students receive the best training possible.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-bold mb-4">Our Values</h2>
        <ul className="list-disc list-inside">
          <li className="mb-2">Safety: Prioritizing the safety of our students and the community.</li>
          <li className="mb-2">Integrity: Upholding the highest standards of honesty and professionalism.</li>
          <li className="mb-2">Innovation: Continuously improving our methods and technologies.</li>
          <li className="mb-2">Community: Engaging with and giving back to our local community.</li>
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-bold mb-4">Join Us</h2>
        <p className="text-lg leading-relaxed mb-6">
          Ready to start your driving journey? Enroll today and experience the Tech Driving difference!
        </p>
      </section>
    </div>
  );
}