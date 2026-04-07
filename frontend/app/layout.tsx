
import "../styles/globals.css";
import Nav from "../components/Nav";
import { ReactNode } from "react";
import { Manrope, Space_Grotesk } from 'next/font/google';

const bodyFont = Manrope({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const titleFont = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-title',
  display: 'swap',
});

export const metadata = {
  title: "Kanhaiya Tiwari | DevOps Portfolio",
  description: "DevOps & Cloud Engineer Portfolio"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${titleFont.variable}`}>
      <body>
        <div className="site-shell">
          <Nav />
          {children}
        </div>
      </body>
    </html>
  );
}
