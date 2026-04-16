"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform } from "framer-motion";

const FRAME_COUNT = 31;

export default function CarScrollScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isReady, setIsReady] = useState(false);

  // Load all images for smooth playback
  useEffect(() => {
    const loadImages = async () => {
      const loadedImages: HTMLImageElement[] = [];

      for (let i = 1; i <= FRAME_COUNT; i++) {
        const img = new Image();
        // Zero-padding for our image naming convention, e.g., ezgif-frame-001.jpg
        const paddedIndex = i.toString().padStart(3, "0");
        const src = `/D_school-jpg/ezgif-frame-${paddedIndex}.jpg`;

        await new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = () => {
            console.error(`Failed to load frame ${i}`);
            resolve(null); // Resolve to keep the loop going instead of hanging
          };
          img.src = src;
        });

        loadedImages.push(img);
      }
      setImages(loadedImages);
      setIsReady(true);
    };

    loadImages();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Start animation when top of container hits top of viewport
    // End animation when bottom of container hits bottom of viewport
    offset: ["start start", "end end"],
  });

  // Map 0 -> 1 scroll progress to 0 -> 30 frame index smoothly
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  useEffect(() => {
    if (!isReady || images.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      // Get exact frame, rounded to nearest integer
      const currentFrame = Math.round(frameIndex.get());
      const image = images[currentFrame];

      if (image && image.complete) {
        // Adjust canvas internal size to match CSS size
        const { width, height } = canvas.getBoundingClientRect();
        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width;
          canvas.height = height;
        }

        // Object-fit: contain logic for Canvas
        const hRatio = canvas.width / image.width;
        const vRatio = canvas.height / image.height;
        const ratio = Math.min(hRatio, vRatio); 
        
        const centerShift_x = (canvas.width - image.width * ratio) / 2;
        const centerShift_y = (canvas.height - image.height * ratio) / 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw the image exactly centered
        ctx.drawImage(
          image,
          0,
          0,
          image.width,
          image.height,
          centerShift_x,
          centerShift_y,
          image.width * ratio,
          image.height * ratio
        );
      }
    };

    // Listen to Framer Motion value changes
    const unsubscribe = frameIndex.on("change", () => {
      animationFrameId = requestAnimationFrame(render);
    });

    // Resize handler ensures layout remains correct when browser window changes
    const handleResize = () => requestAnimationFrame(render);
    window.addEventListener("resize", handleResize);
    
    // Initial draw to ensure first frame is displayed immediately without scrolling
    render(); 

    return () => {
      window.removeEventListener("resize", handleResize);
      unsubscribe();
      cancelAnimationFrame(animationFrameId);
    };
  }, [isReady, images, frameIndex]);

  return (
    // This container is 300vh tall to allow for a long smooth scroll
    <div ref={containerRef} className="relative h-[300vh] w-full">
      
      {/* Loading overlay perfectly blending with pure clean white/light styling */}
      {!isReady && (
        <div className="sticky top-0 h-screen w-full flex items-center justify-center bg-[#fdfdfd] z-50">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin mb-4"></div>
            <p className="text-sm text-gray-500 font-medium tracking-[0.2em] uppercase">Starting Engine</p>
          </div>
        </div>
      )}

      {/* The sticky wrapper that holds the canvas itself */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#fdfdfd]">
        <canvas
          ref={canvasRef}
          className="block h-full w-full"
        />
      </div>
    </div>
  );
}
