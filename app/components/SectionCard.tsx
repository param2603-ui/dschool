import React from 'react';

interface SectionCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  link?: string;
  price?: string;
}

const SectionCard: React.FC<SectionCardProps> = ({ title, description, imageUrl, link, price }) => {
  return (
    <div className="rounded-2xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-white/20 group">
      {imageUrl && <img className="w-full h-48 object-cover" src={imageUrl} alt={title} />}
      <div className="p-6">
        <div className="font-bold text-xl mb-2 text-white group-hover:text-blue-400 transition-colors">{title}</div>
        <p className="text-white/70 text-base leading-relaxed">{description}</p>
        
        {price && (
          <div className="mt-4 inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 font-bold border border-blue-500/30">
            {price}
          </div>
        ) }

        {link && (
          <div className="mt-6">
            <a href={link} className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-2 group/link">
              Learn More
              <span className="group-hover/link:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionCard;