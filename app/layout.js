import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";


const inter = Inter({subsets: ["latin"]});


export const metadata = {
  title: "Prospr",
  description: "Track every spend. Grow every rupee.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={`${inter.className}`}>

        {/* header */}
        <Header />


        <main className="min-h-screen">
          {children}
        </main>        

        <Toaster richColors/>
        
        
        {/* footer */}
        <footer className="bg-blue-50 py-8">
          <div className="flex items-center justify-center mx-auto px-4 text-center text-gray-500">
            <img src="/favicon.png" width={35}></img><p className="pl-3"> Copyright © Ishani Kundu 2025 | All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
    </ClerkProvider>
  );
}
