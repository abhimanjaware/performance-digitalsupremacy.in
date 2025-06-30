import React, { useEffect, useRef, useState } from 'react';
// import logo from "./assets/images/digitasuplogo.png";

function Loader() {
  const [isVisible, setIsVisible] = useState(true);
  const loaderRef = useRef(null);
  const logoRef = useRef(null);
  const backgroundRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
    script.onload = () => {
      const { gsap } = window;
      const tl = gsap.timeline();

      gsap.set(logoRef.current, { opacity: 0, scale: 0.8 });
      gsap.set(backgroundRef.current, { y: '100%' });

      tl
        .to(logoRef.current, {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power2.out'
        })
        .to({}, { duration: 0.5 })
        .to(backgroundRef.current, {
          y: '0%',
          duration: 1.2,
          ease: 'power2.inOut'
        })
        .to(loaderRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.inOut',
          delay: 0.3,
          onComplete: () => {
            setIsVisible(false); // Unmount after animation
          }
        });
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // 🔒 Don’t render anything if animation is over
  if (!isVisible) return null;

  return (
    <div ref={loaderRef} className="fixed inset-0 z-50">
      <div className="loader-interface bg-black h-screen w-full flex justify-center items-center relative overflow-hidden">
        <div ref={logoRef} className="logo absolute z-10">
          <img
          className="w-32 h-auto sm:w-40 md:w-48 mix-blend-difference"
            src="src\assets\images\DIGITAL-removebg-preview.png"
            alt="Logo"
          />
        </div>
        <div
          ref={backgroundRef}
          className="absolute inset-0 bg-white"
          style={{ transform: 'translateY(100%)' }}
        />
      </div>
    </div>
  );
}

export default Loader;
