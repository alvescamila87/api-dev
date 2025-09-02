import type { ReactNode } from "react";
import { Footer } from "../footer/Footer";
import { NavBar } from "../navbar/NavBar";

interface LayoutContainerProps {
  children: ReactNode;
}

export function LayoutContainer({ children }: LayoutContainerProps) {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-100">
      <NavBar />
      <main className="flex-grow container mx-auto p-8">{children}</main>
      <Footer />
    </div>
  );
}
