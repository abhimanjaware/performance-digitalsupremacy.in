import React, { useState } from 'react'
import Loader from './Component/Loader'
import Hero from './Component/Hero'
import Services from './Component/Services'
import Footer from './Component/Footer'
import Clients from './Component/Client'
import IndustrySnapshots from './Component/IndustrySnapshots'
import CaseStudies from './Component/CaseStudies'
import Testimonials from './Component/Testimonials'
import FAQ from './Component/FAQ'
import ContactForm from './Component/ContactForm'

function App() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  return (
    <div className='overflow-x-hidden'>
      <Loader/>
      <Hero openContactForm={() => setIsContactFormOpen(true)}/>
      <Services/>
      <IndustrySnapshots/>
      <CaseStudies/>
      <Clients/>
      <Testimonials/>
      <FAQ/>
      <Footer/>

    
      <ContactForm 
        isOpen={isContactFormOpen} 
        onClose={() => setIsContactFormOpen(false)}
      />
    </div>
  )
}

export default App