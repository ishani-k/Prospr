"use client";

import { SignIn } from "@clerk/nextjs";
import React from "react";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl min-h-screen p-4 bg-gray-50">
      
      <div className="mb-6 text-sm text-gray-700 text-center">
        <p>Use the following demo credentials to explore the app:</p>
        <p>
          Email: <span className="font-bold">demouseracc2025@gmail.com</span> <br /> Password:{" "}
          <span className="font-bold">prospr2025</span>
        </p>
      </div>

      <SignIn
        appearance={{
          elements: {
            card: "shadow-lg border border-gray-200 rounded-2xl p-4",
          },
        }}
      />
    </div>
  );
}

