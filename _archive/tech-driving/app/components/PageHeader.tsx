import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="py-12 bg-[var(--bg)] text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-[var(--text-primary)]">{title}</h1>
      {subtitle && <p className="mt-4 text-lg text-[var(--text-secondary)]">{subtitle}</p>}
    </header>
  );
};

export default PageHeader;