import { Poppins } from "next/font/google";

import Navbar from "@/components/ui/navbar";
import "./globals.css";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import Error from "./error";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata = {
  keywords: [
    "FRC",
    "FIRST Robotics",
    "Impact Award",
    "Chairman's Award",
    "Engineering Inspiration Award",
    "First Robotics Competitions",
    "FRC Awards",
    "FRC Analytics",
    "FRC Data",
    "data analytics",
  ],
  icons: {
    icon: "/images/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} text-stone-900 bg-stone-50`}>
        <Navbar />
        <div className="relative">
          <main className="px-4 sm:px-24 w-full relative top-[55px] pt-8 pb-16">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
