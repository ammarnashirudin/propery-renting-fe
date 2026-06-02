"use client";

import HeroSection from "@/views/Home/hero-section";
import PropertyPage from "@/views/Property/page";
import FooterSection from "@/views/Navbar/footer";

export default function HomePage() {

  return (
    <>
      <HeroSection/>
      
      <PropertyPage/>

      <div className="mt-100">
        <FooterSection/>
      </div>
      
    </>
  );
}
