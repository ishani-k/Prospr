"use client";

import Link from "next/link";
import { Button } from "./ui/button";

const HeroSection = () => {
  return (
    <div className="pb-20 px-4">
      <div>
        <h1>
          Money made simple. <br />
          Insights made smart.
        </h1>
        <p>
          Your all-in-one AI-powered finance companion that helps you manage
          today and prepare for tomorrow.
        </p>

        <div>
          <Link href="/dashboard">
            <Button size="lg" className="px-8">
              Get Started
            </Button>
          </Link>
        </div>
        <div>
          <Link href="/dashboard">
            <Button variant="outline" size="lg" className="px-8">
              Watch Demo
            </Button>
          </Link>
        </div>
        <div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
