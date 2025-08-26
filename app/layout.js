import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({subsets: ["latin"]});


export const metadata = {
  title: "Prospr",
  description: "Track every spend. Grow every rupee.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        {/* header */}
        <Header />
        <main className="min-h-screen">
          {children}
        </main>        
        {/* footer */}
        <footer className="bg-blue-50 py-12">
          <div className="container mx-auto px-4 text-center text-gray-500">
            <p> Made with ❤️ by Ishani Kundu</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
