import { useState } from "react";
import Link from "next/link";

const Navbar = ({ scrollProgress }: { scrollProgress: number }) => {
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "gu" : "en"));
  };

  const navOpacity = scrollProgress > 0.05 ? 1 : 0;
  const navItems = [
    { label: language === "en" ? "About" : "અમારા વિશે", href: "/about" },
    { label: language === "en" ? "Services" : "સેવાઓ", href: "/courses" },
    { label: language === "en" ? "Why Us" : "શા માટે અમને પસંદ કરો", href: "/why" },
    { label: language === "en" ? "Contact" : "સંપર્ક", href: "/contact" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-16 py-4 transition-opacity duration-500 backdrop-blur-xl"
      style={{
        opacity: navOpacity,
        background: "rgba(255,255,255,0.8)",
        borderBottom: "1px solid rgba(15,23,42,0.08)",
      }}
    >
      <div className="text-sm font-bold tracking-[0.2em] uppercase" style={{ color: "var(--text-primary)" }}>
        Tech Driving
      </div>

      <div className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <Link key={item.label} href={item.href} className="text-sm font-medium">
            {item.label}
          </Link>
        ))}
      </div>

      <button
        className="text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full border transition-all duration-200"
        style={{
          borderColor: "rgba(0, 0, 0, 0.45)",
          color: "var(--accent)",
          background: "rgba(255, 255, 255, 0.95)",
        }}
        onClick={toggleLanguage}
      >
        {language === "en" ? "Gujarati" : "English"}
      </button>
    </nav>
  );
};

export default Navbar;