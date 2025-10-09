"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { useEffect, useRef } from "react";

const HeroSection = () => {


  const imageRef = useRef()

  useEffect(() =>{

    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if(scrollPosition > scrollThreshold)
      {
        imageElement.classList.add("scrolled")
      }
      else
      {
        imageElement.classList.remove("scrolled")
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)

  }, [])

  return (
    <div className="pb-15 px-4 -mt-4">
      {/*<div className="absolute inset-0 bg-cover bg-center bg-fixed opacity-50 ">
        <img src="/Group 1707482950.png" alt="" />
      </div>*/}
      {/*<div
        className="absolute inset-0 bg-fixed bg-no-repeat opacity-50 -z-10"
        style={{ backgroundImage: "url('/Group 1707482950.png')" }}
      ></div>*/}      

      <div className="relative z-10 container mx-auto text-center ">
        <h1 className="text-5xl md:text-8xl lg:text-[70px] tracking-tighter pb-6 bg-gradient-to-br from-[#bbd2cf] via-[#536976] to-[#292e49] text-transparent bg-clip-text">
          Money made simple. <br />
          Insights made smart.
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Your all-in-one AI-powered finance companion that helps you manage
          today and prepare for tomorrow.
        </p>

        <div className="flex justify-center space-x-4">
          <Link href="/dashboard">
            <Button size="lg" className="px-8">
              Get Started
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" size="lg" className="px-8">
              Watch Demo
            </Button>
          </Link>
        </div>
        <div className="hero-image-wrapper">
          <div ref={imageRef} className="hero-image">
            <Image src="/hero-banner.png"
            width={1000}
            height={720}
            alt="dashboard preview"
            className="rounded-lg shadow-2xl border mx-auto"
            priority />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
