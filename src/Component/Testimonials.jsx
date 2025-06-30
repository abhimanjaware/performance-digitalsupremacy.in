import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    company: "Justo Real Estate",
    description: "Boosted lead flow by 300% in Nashik using our digital funnel. Their attention to local strategy was unmatched.",
    quote: "Working with this team was a game-changer. They understood the real estate space deeply and delivered quality leads consistently."
  },
  {
    company: "Silvermerc Designs",
    description: "357% growth in non-brand traffic. A perfect blend of creative and performance marketing.",
    quote: "Their ability to merge fashion with storytelling gave our brand new energy. Our online sales never looked better."
  },
  {
    company: "CodeHub India",
    description: "EdTech brand saw 120% more admissions through conversion-optimized campaigns.",
    quote: "They didn't just bring us leads — they brought us committed students ready to enroll. Highly strategic and efficient."
  },
  {
    company: "Digital Supremacy",
    description: "Our internal campaigns saw a 2.4x ROAS uplift. We trust them even as marketers ourselves.",
    quote: "As a digital agency, we're picky. But this team brought clarity, execution speed, and clear returns. It's rare to find that combo."
  },
  {
    company: "Trading Monk",
    description: "Scaled admissions across India for our stock market training program.",
    quote: "They brought structure to our marketing journey. Funnels, creatives, and trust-building content all just clicked into place."
  },
  {
    company: "Little Cove Resort",
    description: "35% jump in direct bookings through strategic Instagram and Google optimization.",
    quote: "They gave our property the online luxury feel it deserved. Guests started mentioning our ads while checking in!"
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 640);
      setIsTablet(width > 640 && width <= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        }
      );
    }
  }, [activeIndex]);

  return (
    <section className={`bg-white text-black py-12 md:py-20 px-4 sm:px-6 md:px-8 ${isMobile ? 'min-h-screen' : 'h-auto'} flex flex-col items-center justify-center relative overflow-hidden`}>
      {/* Header */}
      <div className="text-center mb-8 md:mb-16 w-full">
        <h2 className={`${isMobile ? 'text-3xl' : isTablet ? 'text-5xl' : 'text-6xl'} font-bold mb-4 md:mb-6`}>
          Testimonials
        </h2>
        <div className="w-16 md:w-24 h-1 bg-black mx-auto mb-4 md:mb-6 rounded-full"></div>
        <p className={`${isMobile ? 'text-sm' : 'text-lg'} text-gray-600 max-w-2xl mx-auto leading-relaxed px-2`}>
          Hear what our clients have to say about their success with our design, marketing, and digital strategies.
        </p>
      </div>

      {/* Testimonial Card */}
      <div
        className={`w-full ${isMobile ? 'p-6' : 'p-8 md:p-12'} mx-auto text-center bg-gray-50 rounded-2xl ${isTablet ? 'md:rounded-3xl' : 'rounded-3xl'} border border-gray-200 shadow-md transition-all duration-500 max-w-4xl`}
        ref={cardRef}
      >
        <p className={`${isMobile ? 'text-base' : 'text-xl md:text-2xl'} text-gray-800 font-medium italic mb-4 md:mb-6 leading-relaxed`}>
          "{testimonials[activeIndex].quote}"
        </p>
        <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-black`}>
          {testimonials[activeIndex].company}
        </h3>
        <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-600 mt-2`}>
          {testimonials[activeIndex].description}
        </p>
      </div>

      {/* Slider Controls */}
      <div className="flex flex-col sm:flex-row justify-center items-center mt-8 md:mt-12 w-full space-y-4 sm:space-y-0 sm:space-x-6">
        <div className="flex space-x-4 sm:space-x-6 order-2 sm:order-1">
          <button
            onClick={handlePrev}
            className={`${isMobile ? 'px-3 py-1 text-sm' : 'px-4 py-2'} text-black border border-black rounded-full hover:bg-black hover:text-white transition`}
          >
            ← Previous
          </button>

          <button
            onClick={handleNext}
            className={`${isMobile ? 'px-3 py-1 text-sm' : 'px-4 py-2'} text-black border border-black rounded-full hover:bg-black hover:text-white transition`}
          >
            Next →
          </button>
        </div>

        <div className="flex space-x-2 sm:space-x-3 order-1 sm:order-2 mb-4 sm:mb-0">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full border transition-all duration-300 ${
                activeIndex === idx
                  ? "bg-black border-black scale-110"
                  : "bg-white border-gray-400 hover:border-black"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Bottom Decorative Line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-black to-transparent"></div>
    </section>
  );
};

export default Testimonials;