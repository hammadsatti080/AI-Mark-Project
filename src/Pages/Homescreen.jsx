import React from 'react'
import Header from '../Component/Homescreen/Header'
import Hero from '../Component/Homescreen/Hero'
import Ratingsection from '../Component/Homescreen/Ratingsection'
import Servicesection from '../Component/Homescreen/Servicesection'
import Processsection from '../Component/Homescreen/Processsection'
import FAQ from '../Component/Homescreen/FAQ'
import Teamportion from '../Component/Homescreen/Teamportion'
import Clientportion from '../Component/Homescreen/Clientportion'
import Testimonial from '../Component/Homescreen/Testimonial'

export default function Homescreen() {
  return (
    <div>
     <Header/>
     <Hero/>
     <Ratingsection/>
     <Servicesection/>
     <Processsection/>
     <FAQ/>
     <Teamportion/>
     <Clientportion/>
     <Testimonial/>
    </div>
  )
}
