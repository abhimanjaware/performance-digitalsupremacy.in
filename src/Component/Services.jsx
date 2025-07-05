import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Services() {
  const containerRef = useRef(null);
  const cardsRef = useRef(null);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  const services = [
    {
      id: 1,
      number: "01",
      total: "04",
      title: "GROWTH\nMARKETING",
      description:
        "Drive customer acquisition and revenue growth through strategic paid media campaigns, SEO optimization, and conversion funnel improvements.",
      features: [
        "Paid media (Meta, Google, TikTok)",
        "SEO/ASO",
        "Funnel optimization",
      ],
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center",
    },
    {
      id: 2,
      number: "02",
      total: "04",
      title: "CONTENT &\nCREATIVE",
      description:
        "Create compelling visual and written content that captures attention, builds brand identity, and drives engagement across all platforms.",
      features: ["Ad creatives", "Copywriting", "Video production"],
      image:
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop&crop=center",
    },
    {
      id: 3,
      number: "03",
      total: "04",
      title: "LEAD GENERATION\n& CRM",
      description:
        "Build and nurture customer relationships through targeted email campaigns, SMS marketing, and automated workflows that convert leads into loyal customers.",
      features: ["Email/SMS marketing", "Automation flows", "CRM management"],
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&crop=center",
    },
    {
      id: 4,
      number: "04",
      total: "04",
      title: "ANALYTICS &\nSTRATEGY",
      description:
        "Make data-driven decisions with comprehensive analytics dashboards, detailed reporting, and strategic KPI planning to optimize performance.",
      features: ["Dashboard setup", "Reporting", "KPI planning"],
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&crop=center",
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (windowSize.width <= 768) return;

    const cards = cardsRef.current;
    const container = containerRef.current;

    if (!cards || !container || !cards.children.length) return;

    const cardWidth = cards.children[0].offsetWidth;
    const gap = windowSize.width <= 1024 ? 24 : 32;
    const totalWidth = (cardWidth + gap) * services.length - gap;
    const containerWidth = container.offsetWidth;

    ScrollTrigger.matchMedia({
      "(min-width: 769px)": function() {
        const scrollTween = gsap.to(cards, {
          x: -(totalWidth - containerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: () => `+=${totalWidth - containerWidth}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        return () => {
          scrollTween.kill();
          ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [windowSize.width, services.length]);

  const isMobile = windowSize.width <= 768;
  const isTablet = windowSize.width > 768 && windowSize.width <= 1024;

  return (
    <div
      ref={containerRef}
      className="bg-white w-full overflow-hidden font-sans"
    >
      {/* Header */}
      <div className={`w-full ${isMobile ? 'h-auto py-8 px-6' : 'h-[20vh] px-10'} flex items-center justify-start border-b border-zinc-200`}>
        <div>
          <h1 className={`${isMobile ? 'text-4xl' : isTablet ? 'text-6xl' : 'text-8xl'} font-extrabold text-black tracking-tight`}>
            SERVICES
          </h1>
          <p className={`text-zinc-600 mt-4 ${isMobile ? 'text-base' : 'text-2xl'} italic font-medium`}>
            We build <span className="font-bold text-black underline">clarity</span>,{" "}
            <span className="font-bold text-black underline">scale</span>, and{" "}
            <span className="font-bold text-black underline">creative performance</span>.
          </p>
        </div>
      </div>

      {/* Card Scroll */}
      <div className={`${isMobile ? 'h-auto py-6 px-6' : 'h-[80vh] p-8'} w-full overflow-hidden`}>
        {isMobile ? (
          <div className="space-y-6">
            {services.map((service) => (
              <div
                key={service.id}
                className="group h-auto w-full rounded-xl bg-zinc-100 overflow-hidden flex flex-col border border-zinc-300 transition-shadow duration-300 hover:shadow-2xl"
              >
                {/* Top - Image */}
                <div className="w-full h-48 relative overflow-hidden bg-zinc-200">
                  <img
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src={service.image}
                    alt={service.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent" />
                </div>

                {/* Bottom - Content */}
                <div className="w-full p-6 flex flex-col justify-center items-start gap-4 transition-transform duration-300 group-hover:-translate-y-1">
                  <h5 className="font-bold text-xl text-zinc-500">
                    {service.number}{" "}
                    <span className="text-zinc-300">/{service.total}</span>
                  </h5>

                  <h2 className="leading-snug text-2xl font-extrabold text-zinc-900 whitespace-pre-line tracking-tight">
                    {service.title}
                  </h2>

                  <p className="py-2 text-zinc-700 text-base leading-relaxed font-medium">
                    {highlightKeywords(service.description)}
                  </p>

                  <ul className="space-y-2 mb-4">
                    {service.features.map((feature, index) => (
                      <li
                        key={index}
                        className="text-base text-zinc-700 flex items-center font-semibold"
                      >
                        <span className="w-2 h-2 bg-zinc-600 rounded-full mr-3"></span>
                        <span className="text-black">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* <button className="w-full px-6 py-3 text-base font-bold rounded-full text-white bg-black hover:bg-zinc-800 transition-all duration-300 shadow-inner hover:shadow-lg">
                    GET STARTED
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            ref={cardsRef}
            className="flex items-center h-full"
            style={{ gap: isTablet ? '24px' : '32px' }}
          >
            {services.map((service) => (
              <div
                key={service.id}
                className={`group h-full ${isTablet ? 'w-[85vw]' : 'w-[75vw]'} flex-shrink-0 rounded-xl bg-zinc-100 overflow-hidden flex border border-zinc-300 transition-shadow duration-300 hover:shadow-2xl`}
              >
                {/* Left */}
                <div className={`${isTablet ? 'w-[45%] px-6' : 'w-[40%] px-10'} h-full flex flex-col justify-center items-start gap-6 transition-transform duration-300 group-hover:-translate-y-1`}>
                  <h5 className={`font-bold ${isTablet ? 'text-3xl' : 'text-4xl'} text-zinc-500`}>
                    {service.number}{" "}
                    <span className="text-zinc-300">/{service.total}</span>
                  </h5>

                  <h2 className={`leading-snug ${isTablet ? 'text-3xl' : 'text-5xl'} font-extrabold text-zinc-900 whitespace-pre-line tracking-tight`}>
                    {service.title}
                  </h2>

                  <p className={`py-2 text-zinc-700 ${isTablet ? 'text-lg' : 'text-xl'} leading-relaxed font-medium`}>
                    {highlightKeywords(service.description)}
                  </p>

                  <ul className="space-y-2 mb-4">
                    {service.features.map((feature, index) => (
                      <li
                        key={index}
                        className={`${isTablet ? 'text-base' : 'text-lg'} text-zinc-700 flex items-center font-semibold`}
                      >
                        <span className="w-2 h-2 bg-zinc-600 rounded-full mr-3"></span>
                        <span className="text-black">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* <button className={`${isTablet ? 'px-6 py-3 text-base' : 'px-8 py-4 text-lg'} font-bold rounded-full text-white bg-black hover:bg-zinc-800 transition-all duration-300 shadow-inner hover:shadow-lg`}>
                    GET STARTED
                  </button> */}
                </div>

                {/* Right */}
                <div className={`${isTablet ? 'w-[55%]' : 'w-[60%]'} h-full relative overflow-hidden bg-zinc-200`}>
                  <img
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src={service.image}
                    alt={service.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Utility function to highlight keywords
function highlightKeywords(text) {
  const keywords = [
    "customer acquisition",
    "revenue growth",
    "paid media",
    "SEO",
    "conversion",
    "content",
    "brand identity",
    "engagement",
    "email campaigns",
    "automation",
    "CRM",
    "analytics",
    "reporting",
    "KPI planning",
  ];

  const pattern = new RegExp(`\\b(${keywords.join("|")})\\b`, "gi");

  return text.split(pattern).map((part, i) =>
    keywords.includes(part.toLowerCase()) ? (
      <span key={i} className="text-black font-semibold underline underline-offset-4">
        {part}
      </span>
    ) : (
      part
    )
  );
}

export default Services;