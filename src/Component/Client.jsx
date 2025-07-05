import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

// ✅ Import images correctly for production bundling
import NEXO from '../assets/images/NEXO.jpg';
import MONK from '../assets/images/MONK.jpg';
import JUSTO from '../assets/images/JUSTO.webp';
import QUALICOM from '../assets/images/QUALICOM.jpg';
import SURYA from '../assets/images/SURYA.png';
import CODEHUB from '../assets/images/codehub_logo-removebg-preview.png';

const Clients = () => {
  const marqueeRef = useRef(null);

  const clients = [
    { name: 'NEXO', logo: NEXO },
    { name: 'MONK', logo: MONK },
    { name: 'JUSTO', logo: JUSTO },
    { name: 'QUALICOM', logo: QUALICOM },
    { name: 'SURYA', logo: SURYA },
    { name: 'CODEHUB', logo: CODEHUB },
  ];

  useEffect(() => {
    const animateLoop = (el) => {
      gsap.fromTo(
        el,
        { xPercent: 0 },
        {
          xPercent: -50,
          ease: 'none',
          duration: 30,
          repeat: -1,
          modifiers: {
            xPercent: gsap.utils.wrap(-50, 0),
          },
        }
      );
    };

    if (marqueeRef.current) animateLoop(marqueeRef.current);
  }, []);

  const renderClientLogos = () =>
    [...clients, ...clients].map((client, index) => (
      <div
        key={`${client.name}-${index}`}
        className="relative bg-zinc-800 rounded-xl p-5 flex items-center justify-center min-w-[120px] sm:min-w-[140px] md:min-w-[160px] lg:min-w-[180px] xl:min-w-[200px]"
      >
        <img
          src={client.logo}
          alt={`${client.name} logo`}
          className="w-[70%] h-[70%] object-contain object-center"
          draggable="false"
          style={{ maxWidth: '100px', maxHeight: '100px' }}
        />
        <div className="absolute inset-0 border-2 border-transparent rounded-xl" />
      </div>
    ));

  return (
    <section className="py-16 sm:py-20 bg-zinc-900 overflow-hidden">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white mb-12">
          Trusted By Industry Leaders
        </h2>

        <div className="flex overflow-hidden">
          <div
            ref={marqueeRef}
            className="flex whitespace-nowrap w-max gap-6 sm:gap-8"
          >
            {renderClientLogos()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
