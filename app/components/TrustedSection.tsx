import { BackgroundComponent } from "./ui/BackgroundComponent";

export const TrustedSection = () => {
  return (
    <BackgroundComponent variant="yellow">
      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Trusted driving training built for every learner.
          </h2>
          <p className="text-lg md:text-xl text-gray-700">
            Experience precision driving education like never before. Tech Driving blends cutting-edge simulation with expert instruction for a next-generation driving school experience.
          </p>
        </div>
      </div>
    </BackgroundComponent>
  );
};

export default TrustedSection;
