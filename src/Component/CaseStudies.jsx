import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const caseStudies = [
  {
    title: "Digital Supremacy – Digital Marketing Agency",
    image: "https://www.matebiz.com/wp-content/uploads/digital-marketing-agency-2.jpg",
    description: "Custom digital marketing strategies that drive real results through targeted campaigns and cutting-edge insights.",
    pdf: "/5. REDESIGN DIGITAL SUPREMACY.pdf"
  },
  {
    title: "Healthcare Marketing – Digital Supremacy",
    image: "https://images.unsplash.com/photo-1604480131833-5d7aea770e1c?w=500&auto=format&fit=crop&q=60",
    description: "Helping healthcare brands grow online with modern strategies and patient-centric marketing approaches.",
    pdf: "/02 redesign  healthcare.pdf"
  },
  {
    title: "Justo – Real Estate Expansion",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    description: "Generated leads and drove property sales in Nashik through localized real estate campaigns.",
    pdf: "/06. Redesign Justo Real Estate .pdf"
  },
  {
    title: "Silvermerc Designs – Jewelry Growth",
    image: "https://images.unsplash.com/photo-1656427743666-d6507c12b04e?w=500&auto=format&fit=crop&q=60",
    description: "357% increase in non-brand clicks using fashion-forward marketing for jewelry and apparel.",
    pdf: "/01Redesign Jewellery.pdf"
  },
  {
    title: "Trading Monk – Financial Education",
    image: "https://images.unsplash.com/photo-1634704784915-aacf363b021f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Empowering aspiring traders with practical learning modules and expert insights.",
    pdf: "/8.  Redesign trading monk.pdf"
  },
  {
    title: "CodeHub India – Admissions Boost",
    image: "https://plus.unsplash.com/premium_photo-1661877737564-3dfd7282efcb?w=500&auto=format&fit=crop&q=60",
    description: "120% surge in admissions for coding education through smart digital funnel strategies.",
    pdf: "/03. Redesign CODEHUB.pdf"
  },
  {
    title: "Healthy Snacks - D2C",
    image: "https://www.katheats.com/wp-content/uploads/2019/11/Snacks-13.jpg",
    description: "promoting health and wellness products with a focus on organic growth and customer engagement.",
    pdf: "Performance-Marketing-Case-Study.pdf"
  },

  {
    title: "Korean Skincare - D2C",
    image: "https://plus.unsplash.com/premium_photo-1661404164814-9d3c137097aa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmVhdXR5fGVufDB8fDB8fHww",
    description: "Korean skincare brand that has achieved significant growth through targeted digital marketing strategies.",
    pdf: "Case-Study-Performance-Marketing-Strategy.pdf"
  },
  
];

const CaseStudies = () => {
  const cardsRef = useRef([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobileDevice = () => {
      return window.innerWidth <= 1024 || 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    };

    setIsMobile(checkMobileDevice());

    const handleResize = () => {
      setIsMobile(checkMobileDevice());
    };

    window.addEventListener('resize', handleResize);

    if (!document.getElementById('case-study-animations')) {
      const style = document.createElement('style');
      style.id = 'case-study-animations';
      style.textContent = `
        @keyframes pulseClick {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0,0,0,0.7); }
          50% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(0,0,0,0); }
        }
        @keyframes bounceClick {
          0% { transform: translateY(0) scale(1); }
          100% { transform: translateY(-3px) scale(1.02); }
        }
        @keyframes borderPulse {
          0%, 100% { border-color: #000; box-shadow: 0 0 0 0 rgba(0,0,0,0.4); }
          50% { border-color: #333; box-shadow: 0 0 0 8px rgba(0,0,0,0); }
        }
        .case-study-card:hover { z-index: 50 !important; }
        .mobile-visible { opacity: 1 !important; transform: translateY(0) translateX(0) scale(1) !important; }
        .mobile-gradient { opacity: 0.7 !important; }
      `;
      document.head.appendChild(style);
    }

    cardsRef.current.forEach((card, i) => {
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none none"
            }
          }
        );
      }
    });

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCardClick = (pdfPath) => {
    window.open(pdfPath, "_blank");
  };

  return (
    <section className="relative bg-white text-black py-12 md:py-20 px-4 md:px-16 overflow-hidden">
      <div className="relative z-10 text-center mb-12 md:mb-16">
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 text-black">Case Studies</h2>
        <div className="w-16 md:w-24 h-1 bg-black mx-auto rounded-full mb-6 md:mb-8"></div>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
          Real-world success stories that reflect the impact of our marketing and digital transformation efforts.
        </p>
      </div>

      <div className="grid gap-6 md:gap-12 md:grid-cols-2 max-w-7xl mx-auto">
        {caseStudies.map((study, index) => (
          <div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            onClick={() => handleCardClick(study.pdf)}
            className={`case-study-card group relative bg-white border-2 border-gray-200 rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-400 ease-out cursor-pointer ${
              !isMobile
                ? 'hover:border-black hover:shadow-[0_25px_60px_rgba(0,0,0,0.25)] hover:-translate-y-4 hover:scale-[1.05] active:scale-[0.98]'
                : 'active:scale-95'
            }`}
            style={{ transformOrigin: 'center', margin: isMobile ? '0.5rem' : '1rem', zIndex: 1, position: 'relative' }}
          >
            <div className="relative h-48 md:h-72 overflow-hidden">
              <img
                src={study.image}
                alt={study.title}
                className={`w-full h-full object-cover transition-transform duration-500 ${
                  !isMobile ? 'group-hover:scale-115' : ''
                }`}
              />
              <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 ${
                isMobile ? 'mobile-gradient' : 'opacity-0 group-hover:opacity-100'
              }`} />
              <div className={`absolute bottom-3 md:bottom-6 left-3 md:left-6 z-30 transition-all duration-500 ${
                isMobile ? 'mobile-visible' : 'opacity-0 group-hover:opacity-100 transform translate-y-8 group-hover:translate-y-0'
              }`}>
                <div className="bg-white backdrop-blur-sm px-3 md:px-6 py-2 md:py-3 rounded-full text-black font-black text-xs md:text-sm border-2 md:border-3 border-black shadow-2xl"
                  style={!isMobile ? { animation: 'bounceClick 1s infinite alternate' } : {}}>
                  🎯 CLICK TO VIEW
                </div>
              </div>
            </div>

            <div className="p-6 md:p-10 space-y-4 md:space-y-6">
              <h3 className={`text-xl md:text-3xl font-bold transition-colors duration-300 line-clamp-2 ${
                !isMobile ? 'group-hover:text-black' : 'text-black'
              }`}>
                {study.title}
              </h3>
              <p className={`text-gray-600 text-base md:text-xl leading-relaxed transition-colors duration-300 ${
                !isMobile ? 'group-hover:text-gray-800' : 'text-gray-800'
              }`}>
                {study.description}
              </p>
              <div className={`flex items-center text-black font-bold text-sm md:text-lg transition-all duration-300 ${
                isMobile ? 'mobile-visible' : 'opacity-0 group-hover:opacity-100 transform translate-x-[-15px] group-hover:translate-x-0'
              }`}>
                <span className="mr-2 md:mr-3 bg-black text-white px-3 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm">READ MORE</span>
                <svg className={`w-5 md:w-6 h-5 md:h-6 transition-transform duration-300 ${
                  !isMobile ? 'group-hover:translate-x-2' : ''
                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {!isMobile && (
              <div className="absolute inset-0 border-[1px] border-black rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-20"
                   style={{ animation: 'borderPulse 1.5s infinite' }}></div>
            )}
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-black to-transparent"></div>
    </section>
  );
};

export default CaseStudies;
