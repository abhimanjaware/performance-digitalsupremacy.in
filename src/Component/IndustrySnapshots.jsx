import React, { useEffect, useRef, useState, useCallback } from "react";

const industries = [
  {
    title: "Real Estate Marketing",
    icon: "🏢",
    description: "We support real estate developers, agencies, and consultants by driving qualified leads, enhancing brand visibility, and increasing property bookings through targeted digital strategies.",
    result: "Generated 768 leads at $2.98 CPL for a US-based brokerage in 30 days, while maintaining a 3.647% CTR",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=60"
  },
  {
    title: "Crypto & Web3 Marketing",
    icon: "₿",
    description: "Navigating ad restrictions and trust barriers in Web3 is our playground. For crypto and blockchain brands, we focus on community building, content education, and performance marketing to drive adoption.",
    result: "Built a Telegram community of 5,000+ and achieved 2.3x return from content-driven influencer collabs",
    image: "https://images.unsplash.com/photo-1609554496796-c345a5335ceb?w=800&auto=format&fit=crop&q=60"
  },
  {
    title: "Forex Coaching & Education",
    icon: "📈",
    description: "For Forex coaching institutes, we tap into aspirational messaging and results-focused positioning. We specialize in admissions-focused campaigns, social media visibility, and conversion-optimized funnels.",
    result: "Doubled admissions in 2 months with a CPL of ₹52 using video ads + targeted keyword campaigns",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&auto=format&fit=crop&q=60"
  },
  {
    title: "Hospitality & Tourism",
    icon: "🏖️",
    description: "In the hospitality industry, guest experience starts before they arrive. We help resorts and tourism businesses amplify their online presence, engage audiences on social, and boost direct bookings.",
    result: "Increased direct bookings by 35% YoY and grew Instagram reach by 4.5x in 60 days (Little Cove Resort)",
    image: "https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?w=800&auto=format&fit=crop&q=60"
  },
  {
    title: "E-commerce",
    icon: "🛒",
    description: "For e-commerce brands, we focus on maximizing ROAS through strategic funnel optimization, advanced retargeting, and AOV enhancement strategies.",
    result: "Achieved 5.6x ROAS with retargeting funnel optimization",
    image: "https://images.unsplash.com/photo-1592503254549-d83d24a4dfab?w=800&auto=format&fit=crop&q=60"
  },
  {
    title: "Visa & Immigration Consulting",
    icon: "🛂",
    description: "For immigration consultants, trust and clarity are critical. We help firms improve lead conversion, user communication, and ad performance through multilingual messaging and automated outreach.",
    result: "Reduced CPL by 34% and increased consultation bookings by 2.1x using language-targeted ads",
    image: "https://images.unsplash.com/photo-1619467416348-6a782839e95f?w=800&auto=format&fit=crop&q=60"
  },
  {
    title: "Startup & SaaS",
    icon: "🚀",
    description: "Early-stage startups and SaaS brands need traction fast — without wasting budget. We work closely with founders to launch MVPs, drive sign-ups, and build email nurture flows that turn users into loyal customers.",
    result: "Acquired 300+ beta users at $1.95/sign-up for a productivity SaaS in its pre-launch phase",
    image: "https://images.unsplash.com/photo-1590971862391-06cac0657603?w=800&auto=format&fit=crop&q=60"
  }
];

const IndustrySnapshots = () => {
  const [isVisible, setIsVisible] = useState({});
  const [activeCard, setActiveCard] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const cardRefs = useRef([]);

  // Check if device is mobile/tablet
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.dataset.index);
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible((prev) => ({ ...prev, [index]: true }));
            }, index * 100); // Staggered animation
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const handleCardInteraction = useCallback((index, isActive) => {
    if (isMobile) {
      setActiveCard(isActive ? index : null);
    }
  }, [isMobile]);

  return (
    <section className="relative min-h-screen bg-white text-black py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-16 overflow-hidden">
      {/* Header */}
      <div className="relative z-10 text-center mb-12 sm:mb-16 lg:mb-20">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-black leading-tight">
          Industry Snapshots
        </h2>
        <div className="w-16 sm:w-20 lg:w-24 h-1 bg-black mx-auto rounded-full mb-4 sm:mb-6"></div>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-2">
          Discover how we've transformed businesses across industries using creative strategies and measurable results.
        </p>
      </div>

      {/* Industry Cards */}
      <div className="relative z-10 space-y-8 sm:space-y-12 lg:space-y-20">
        {industries.map((industry, index) => (
          <div
            key={industry.title}
            ref={(el) => (cardRefs.current[index] = el)}
            data-index={index}
            className={`transition-all duration-700 ease-out ${
              isVisible[index]
                ? "translate-y-0 opacity-100"
                : "translate-y-8 sm:translate-y-12 opacity-0"
            }`}
            onClick={() => handleCardInteraction(index, activeCard !== index)}
            onTouchStart={() => handleCardInteraction(index, true)}
            onTouchEnd={() => setTimeout(() => handleCardInteraction(index, false), 3000)}
          >
            <div className={`
              bg-gray-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 xl:p-14 
              border border-gray-200 transition-all duration-500 cursor-pointer
              ${activeCard === index || !isMobile ? 'shadow-xl transform scale-[1.02]' : 'shadow-md'}
              hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]
            `}>
              {/* Title Section */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl bg-black text-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-md shrink-0">
                  {industry.icon}
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-black leading-tight">
                  {industry.title}
                </h3>
              </div>

              {/* Content Grid */}
              <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-start lg:items-center">
                {/* Text Content */}
                <div className="space-y-6 sm:space-y-8 lg:space-y-16 order-2 lg:order-1">
                  <p className="text-sm sm:text-base lg:text-lg xl:text-2xl text-gray-800 leading-relaxed">
                    {industry.description}
                  </p>
                  
                  {/* Result Card */}
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 sm:p-5 rounded-xl shadow-sm">
                    <span className="block text-sm sm:text-base lg:text-lg font-semibold text-green-700 mb-1 sm:mb-2">
                      📊 Latest Result
                    </span>
                    <span className="text-gray-800 font-medium text-sm sm:text-base lg:text-lg leading-relaxed">
                      {industry.result}
                    </span>
                  </div>
                </div>

                {/* Image */}
                <div className="order-1 lg:order-2">
                  <img
                    src={industry.image}
                    alt={industry.title}
                    className="w-full h-48 sm:h-64 lg:h-80 xl:h-96 object-cover rounded-xl border border-gray-300 shadow-md
                             transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Instructions */}
      {/* {isMobile && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded-full text-sm z-20 opacity-75">
          Tap cards to interact
        </div>
      )} */}
    </section>
  );
};

export default IndustrySnapshots;