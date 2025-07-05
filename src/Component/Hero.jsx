import React, { useEffect, useRef } from 'react';

function Hero({ openContactForm }) {
  const logoRef = useRef(null);
  const companyNameRef = useRef(null);
  const hooklineRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
    script.onload = () => {
      const { gsap } = window;

      gsap.set(companyNameRef.current, { opacity: 0 });
      gsap.set(hooklineRef.current, { opacity: 0, y: 30 });

      const tl = gsap.timeline();

      tl.to({}, { duration: 3.4 })
        .to(logoRef.current, {
          x: -window.innerWidth / 2 + (window.innerWidth < 768 ? 60 : 100),
          y: -window.innerHeight / 2 + (window.innerWidth < 768 ? 60 : 80),
          scale: window.innerWidth < 768 ? 0.4 : 0.5,
          duration: 1.5,
          ease: 'power2.inOut'
        })
        .to(companyNameRef.current, {
          opacity: 1,
          duration: 0.8,
          delay: 1,
          ease: 'power2.out'
        }, '-=0.5')
        .to(hooklineRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: -0.5,
          ease: 'power2.out'
        }, '-=0.3');
    };

    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const handleContactClick = (e) => {
    e.preventDefault();
    openContactForm();
  };

  return (
    <div className="min-h-screen w-full bg-white relative overflow-hidden">
      {/* Logo Animation */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
        <img
          ref={logoRef}
          className="w-32 h-auto sm:w-40 md:w-48 mix-blend-difference"
          src="src/assets/images/DIGITAL-removebg-preview.png"
          alt="Logo"
        />
      </div>

      {/* Centered Content Section */}
      <div
        ref={hooklineRef}
        className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8 lg:px-12 w-full min-h-screen pt-16 sm:pt-20 md:pt-24"
      >
        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#0F1123] leading-tight max-w-xs sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mb-4 sm:mb-6">
          "Struggling to Scale? Let Us Build You a Lead Machine – For Free."
        </h1>

        {/* Subheading */}
        <p className="text-[#0F1123] uppercase text-xs sm:text-sm md:text-base tracking-wide max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-2xl mb-8 sm:mb-10 md:mb-12">
          "We help real estate, education, and finance businesses generate qualified leads and automate the follow-up. Book your free consultation today."
        </p>

        {/* Video Section */}
        <div className="w-full max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl">
          {/* Strip above video */}
          <div className="bg-[#0F1123] text-white py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-left rounded-t-lg">
            🔊 Click below to watch first!
          </div>

          {/* Video */}
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <video
              className="absolute top-0 left-0 w-full h-full rounded-b-lg shadow-lg object-cover"
              controls
              // poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3Ctext x='50' y='50' text-anchor='middle' dy='.3em' font-family='Arial, sans-serif' font-size='14' fill='%236b7280'%3EVideo Placeholder%3C/text%3E%3C/svg%3E"
            >
              <source src="src\assets\images\vsl website.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* CTA Button */}
          <div className="mt-6 sm:mt-8 flex justify-center">
            <button
              onClick={handleContactClick}
              className="bg-black text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-lg text-sm sm:text-base md:text-lg font-semibold hover:scale-105 hover:bg-white hover:text-black hover:border hover:border-black transition-all duration-300 w-full sm:w-auto text-center"
            >
              BOOK YOUR FREE CONSULTATION
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;