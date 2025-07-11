import React, { useRef, useEffect, useState } from 'react';

const ContactForm = ({ isOpen, onClose }) => {
  const formRef = useRef(null);
  const overlayRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleAnimation = () => {
      if (window.gsap) {
        const { gsap } = window;

        if (isOpen) {
          setIsVisible(true);
          gsap.set([formRef.current, overlayRef.current], { display: 'flex' });
          gsap.to(overlayRef.current, { opacity: 1, duration: 0.3 });
          gsap.to(formRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: 'back.out(1.2)'
          });
        } else if (isVisible) {
          gsap.to(overlayRef.current, {
            opacity: 0,
            duration: 0.2,
            onComplete: () => {
              gsap.set(overlayRef.current, { display: 'none' });
              setIsVisible(false);
            }
          });
          gsap.to(formRef.current, {
            opacity: 0,
            y: 40,
            duration: 0.3
          });
        }
      } else {
        if (isOpen) {
          setIsVisible(true);
        } else {
          setTimeout(() => setIsVisible(false), 300);
        }
      }
    };

    // Load GSAP
    if (window.gsap) {
      handleAnimation();
    } else {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
      script.onload = handleAnimation;

      if (!document.querySelector('script[src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"]')) {
        document.head.appendChild(script);
      } else {
        handleAnimation();
      }
    }

    // Load LeadConnector script
    if (!document.querySelector('script[src="https://link.msgsndr.com/js/form_embed.js"]')) {
      const leadConnectorScript = document.createElement('script');
      leadConnectorScript.src = 'https://link.msgsndr.com/js/form_embed.js';
      leadConnectorScript.type = 'text/javascript';
      document.body.appendChild(leadConnectorScript);
    }

  }, [isOpen, isVisible]);

  if (!isVisible && !isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={onClose}
        className="fixed inset-0 bg-black bg-opacity-70 z-40 opacity-0 w-full flex justify-center items-center"
        style={{ display: isOpen ? 'flex' : 'none' }}
      />

      {/* Scrollable Form Container */}
      <div
        ref={formRef}
        className="fixed inset-0 z-50 overflow-y-auto px-4 w sm:px-6 opacity-0 transform flex justify-center translate-y-10"
        style={{ display: isOpen ? 'flex' : 'none' }}
      >
        <div className="min-h-full flex items-center w-[70%] justify-center py-4 sm:py-8">
          <div
            className="bg-white rounded-xl shadow-2xl w-full max-w-3xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-neutral-900 p-4 sm:p-6 text-white flex justify-between items-start rounded-t-xl">
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold">Book Your Free Consultation</h2>
                <p className="opacity-80 text-sm sm:text-base mt-1">Powered by LeadConnector</p>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-300 focus:outline-none transition-colors"
                aria-label="Close form"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Iframe Section */}
            <div className="p-4 sm:p-6 bg-white rounded-b-xl">
              <iframe
                src="https://api.leadconnectorhq.com/widget/booking/hol1OPARDUvDMseP5kEc"
                style={{ width: '100%', border: 'none', overflow: 'visible', height: '800px' }}
                scrolling="yes"
                id="hol1OPARDUvDMseP5kEc_1752159189555"
                title="LeadConnector Booking Widget"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactForm;