

import { Poppins } from "next/font/google"

import Navbar from '@/components/ui/navbar';
import './globals.css';

const poppins = Poppins({ weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} text-stone-900 bg-stone-50`}>
        <Navbar />
        <main className="px-4 sm:px-24 w-full pt-[55px]">
            {children}
        </main>
      </body>
    </html>
  );
}
