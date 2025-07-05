import React, { useRef, useEffect, useState } from 'react';

const ContactForm = ({ isOpen, onClose }) => {
  const formRef = useRef(null);
  const overlayRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    business: '',
    message: ''
  });

  // Animation effects
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
        // Fallback animation without GSAP
        if (isOpen) {
          setIsVisible(true);
        } else {
          setTimeout(() => setIsVisible(false), 300);
        }
      }
    };

    // Check if GSAP is already loaded
    if (window.gsap) {
      handleAnimation();
    } else {
      // Load GSAP
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
      script.onload = handleAnimation;
      
      if (!document.querySelector('script[src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"]')) {
        document.head.appendChild(script);
      } else {
        handleAnimation();
      }
    }
  }, [isOpen, isVisible]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      business: '',
      message: ''
    });
    onClose();
  };

  if (!isVisible && !isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={onClose}
        className="fixed inset-0 bg-black bg-opacity-70 z-40 opacity-0"
        style={{ display: isOpen ? 'flex' : 'none' }}
      />

      {/* Form Container */}
      <div
        ref={formRef}
        className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6 opacity-0 transform translate-y-10"
        style={{ display: isOpen ? 'flex' : 'none' }}
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

          <div className="p-4 sm:p-6 space-y-4 bg-white">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
                placeholder="Enter your email address"
              />
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Business Type */}
            <div>
              <label htmlFor="business" className="block text-sm font-medium text-gray-700 mb-1">
                Business Type
              </label>
              <select
                id="business"
                name="business"
                value={formData.business}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
              >
                <option value="">Select your business type</option>
                <option value="real-estate">Real Estate</option>
                <option value="education">Education</option>
                <option value="finance">Finance</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                How can we help you?
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent resize-none"
                placeholder="Tell us about your lead generation challenges..."
              />
            </div>

            {/* Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row justify-end sm:space-x-3 space-y-2 sm:space-y-0">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2 border border-gray-400 rounded-md text-gray-700 hover:bg-gray-100 transition-colors text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full sm:w-auto px-6 py-2 bg-neutral-800 text-white rounded-md hover:bg-neutral-900 transition-colors shadow-md text-sm sm:text-base"
              >
                Book Free Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactForm;