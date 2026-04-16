import PageHeader from "../components/PageHeader";
import SectionCard from "../components/SectionCard";

const coursesData = [
  {
    title: "Beginner Course",
    description: "12 driving sessions, theory classes, RTO guidance, and mock tests.",
    price: "₹4,999",
  },
  {
    title: "Advanced Course",
    description: "20 driving sessions, highway driving, night driving, and defensive techniques.",
    price: "₹8,999",
  },
  {
    title: "Pro Track",
    description: "Unlimited sessions, 1-on-1 coaching, AI simulation access, and lifetime support.",
    price: "₹14,999",
  },
];

export default function CoursesPage() {
  return (
    <main className="min-h-screen w-full bg-[var(--bg)]">
      <PageHeader title="Our Courses" />

      <section className="py-24 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Training Programs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coursesData.map((course, index) => (
            <SectionCard key={index} title={course.title} description={course.description} price={course.price} />
          ))}
        </div>
      </section>
    </main>
  );
}