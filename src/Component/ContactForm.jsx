import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

const ContactForm = ({ isOpen, onClose }) => {
  const formRef = useRef(null);
  const overlayRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Animation effects
  useEffect(() => {
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
    } else {
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
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={onClose}
        className="fixed inset-0 bg-black bg-opacity-70 z-40 opacity-0 hidden"
      />

      {/* Form Container */}
      <div
        ref={formRef}
        className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6 opacity-0 transform translate-y-10"
      >
        <div 
          className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-neutral-900 p-4 sm:p-6 text-white">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold">Get in Touch</h2>
                <p className="opacity-80 text-sm sm:text-base mt-1">We'll respond within 24 hours</p>
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
          </div>

          <form className="p-4 sm:p-6 space-y-4 bg-white">
            {/* Form fields... */}
            <div className="pt-2 flex flex-col sm:flex-row justify-end sm:space-x-3 space-y-2 sm:space-y-0">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2 border border-gray-400 rounded-md text-gray-700 hover:bg-gray-100 transition-colors text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2 bg-neutral-800 text-white rounded-md hover:bg-neutral-900 transition-colors shadow-md text-sm sm:text-base"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactForm;