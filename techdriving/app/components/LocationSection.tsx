"use client";

import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[400px] bg-slate-900/50 animate-pulse flex items-center justify-center rounded-2xl">
      <span className="text-white/50 text-lg font-medium">Loading map...</span>
    </div>
  ),
});

export const LocationSection = () => {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[80vh] pt-40 pb-24 px-6 overflow-hidden bg-slate-950">
      {/* Soft Multi-Layered SVG Wave Divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-0 pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-[60px] md:h-[120px] lg:h-[160px]"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            fill="var(--bg)"
            opacity=".25"
          ></path>
          <path
            d="M0,0V15.81C13.47,23.44,27.05,30.82,40.81,37.89,114.9,76.08,197.68,89.5,282.88,88.16,368.52,86.82,453.79,66.42,536.8,42.74,625.33,17.47,716.27,2.15,807.69,8.44,898.88,14.71,987.89,38.16,1073.47,70,1116.51,86.06,1159.2,104.66,1200,120V0Z"
            fill="var(--bg)"
            opacity=".5"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            fill="var(--bg)"
          ></path>
        </svg>
      </div>
      
      {/* Gradient Fade Transition from wave to section */}
      <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-[var(--bg)]/10 to-transparent pointer-events-none z-0 mix-blend-overlay" />

      {/* Subtle modern blurred background shapes */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-800/30 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-slate-600/20 blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[20%] w-[300px] h-[300px] rounded-full bg-indigo-600/20 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Location
            </h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-lg md:text-xl text-gray-300">
              Find us easily and start your driving journey today. Come visit our state-of-the-art facility.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            <div className="flex flex-col space-y-6 justify-center">
              <div className="bg-white/5 p-8 rounded-2xl backdrop-blur-md border border-white/10 shadow-2xl transition-all duration-300 hover:bg-white/10 hover:-translate-y-1">
                <div className="flex items-center mb-4 text-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <h3 className="text-2xl font-bold text-white">Main Headquarters</h3>
                </div>
                <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                  123 Tech Drive, Innovation Park<br/>
                  San Francisco, CA 94105
                </p>
                <div className="space-y-3 text-gray-300">
                  <div className="flex justify-between items-center bg-white/5 px-4 py-2 rounded-lg">
                    <span className="font-medium text-white">Mon-Fri</span>
                    <span>8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center bg-white/5 px-4 py-2 rounded-lg">
                    <span className="font-medium text-white">Saturday</span>
                    <span>9:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center bg-white/5 px-4 py-2 rounded-lg text-gray-400">
                    <span className="font-medium">Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/5 p-8 rounded-2xl backdrop-blur-md border border-white/10 shadow-xl transition-all duration-300 hover:bg-white/10 hover:-translate-y-1">
                <div className="flex items-center mb-4 text-green-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <h3 className="text-xl font-bold text-white">Get in Touch</h3>
                </div>
                <div className="space-y-2 mt-4 text-lg">
                  <p className="text-gray-300 flex items-center">
                    <span className="font-medium text-gray-400 w-20">Call:</span> 
                    <a href="tel:+15551234567" className="text-white hover:text-blue-400 transition-colors">(555) 123-4567</a>
                  </p>
                  <p className="text-gray-300 flex items-center">
                    <span className="font-medium text-gray-400 w-20">Email:</span> 
                    <a href="mailto:info@techdriving.com" className="text-white hover:text-blue-400 transition-colors">info@techdriving.com</a>
                  </p>
                </div>
              </div>
            </div>
            
            <div className="w-full min-h-[400px] lg:min-h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative group bg-white/5 p-1 backdrop-blur-sm">
              <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10 rounded-2xl xl:z-50"></div>
              <div className="w-full h-full rounded-xl overflow-hidden relative z-0">
                <MapComponent />
              </div>
            </div>
          </div>
      </div>
    </section>
  );
};

export default LocationSection;
