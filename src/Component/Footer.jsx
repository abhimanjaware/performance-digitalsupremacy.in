import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaPhoneAlt, FaGlobe, FaEnvelope } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-400 w-full px-4 sm:px-8 md:px-16 py-10 relative font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col space-y-8">
          <div className="flex flex-col space-y-6">
            <h1 className="text-white text-xl sm:text-2xl font-semibold">DIGITAL SUPERMACY</h1>

            <div className="flex gap-4 text-lg">
              <a href="https://facebook.com" className="hover:text-white transition" aria-label="Facebook"><FaFacebookF /></a>
              <a href="https://instagram.com" className="hover:text-white transition" aria-label="Instagram"><FaInstagram /></a>
              <a href="https://linkedin.com" className="hover:text-white transition" aria-label="LinkedIn"><FaLinkedinIn /></a>
            </div>
          </div>

          <div className="flex flex-col space-y-6">
            <div className="flex flex-col gap-2 text-sm">
              <a href="https://digitalsupremacy.in/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition flex items-center gap-2">
                <FaGlobe /> digitalsupremacy.in
              </a>
              <a href="tel:+919689772863" className="hover:text-white transition flex items-center gap-2">
                <FaPhoneAlt /> +91 9689772863
              </a>
              <a href="mailto:info@digitalsupermacy.in" className="hover:text-white transition flex items-center gap-2">
                <FaEnvelope /> info@digitalsupermacy.in
              </a>
            </div>
          </div>

          <div className="text-xs space-y-2 pt-4 border-t border-zinc-800">
            <p>©2025 FireFist Solution.</p>
          </div>
        </div>

        {/* Desktop/Tablet Layout */}
        <div className="hidden md:flex justify-between items-start min-h-[40vh]">
          {/* Left Section */}
          <div className="flex flex-col justify-between h-full">
            <div>
              <h1 className="text-white text-2xl font-semibold mb-6">DIGITAL SUPERMACY</h1>
              <div className="flex gap-4 text-xl">
                <a href="https://facebook.com" className="hover:text-white transition" aria-label="Facebook"><FaFacebookF /></a>
                <a href="https://instagram.com" className="hover:text-white transition" aria-label="Instagram"><FaInstagram /></a>
                <a href="https://linkedin.com" className="hover:text-white transition" aria-label="LinkedIn"><FaLinkedinIn /></a>
              </div>
            </div>

            <div className="text-xs mt-8 space-y-2">
              <p>©2025 Digital Supermacy</p>
              <div className="flex flex-wrap gap-x-4 gap-y-2 underline underline-offset-2">
                <a href="#">Privacy Policy</a>
                <a href="#">Legal</a>
                <a href="#">Terms and conditions</a>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex flex-col justify-between h-full text-sm">
            <div className="flex flex-col gap-2">
              <a href="https://digitalsupremacy.in/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition flex items-center gap-2">
                <FaGlobe /> digitalsupremacy.in
              </a>
              <a href="tel:+919689772863" className="hover:text-white transition flex items-center gap-2">
                <FaPhoneAlt /> +91 9689772863
              </a>
              <a href="mailto:info@digitalsupermacy.in" className="hover:text-white transition flex items-center gap-2">
                <FaEnvelope /> info@digitalsupermacy.in
              </a>
            </div>

            <div className="mt-10 max-w-xs">
              <p className="text-white font-medium mb-2">Subscribe to our newsletter</p>
              <div className="border-b border-zinc-500 flex items-center">
                <input
                  type="email"
                  placeholder="Write your email"
                  className="bg-transparent text-sm placeholder-zinc-500 text-white w-full py-2 focus:outline-none"
                />
                <span className="text-white text-lg cursor-pointer hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </div>
        </div>

        {/* Vertical Contact Us Button - Desktop Only */}
        <div className="hidden md:block absolute right-6 bottom-10 transform rotate-90 origin-bottom-right text-sm items-center space-x-2 cursor-pointer group">
          <div className="w-2 h-2 rounded-full border border-zinc-300 group-hover:bg-white transition" />
          <span className="text-zinc-400 group-hover:text-white transition">contact us</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
