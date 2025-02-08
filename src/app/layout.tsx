import type { Metadata } from "next";
import { Roboto } from 'next/font/google';
import "./globals.css";


export const metadata: Metadata = {
  title: "JWT Auth",
  description: "Shadow Pass: A secret pass (JWT) that operates in the shadows to grant access.",
};

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'], // Include all available weights
  style: ['normal', 'italic'], // Include both normal and italic styles
  subsets: ['latin'], // Use 'latin' for basic support
  display: 'swap', // Optional: improves rendering performance
  preload: true, // Optional: preloads font for better performance
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={`antialiased ${roboto.className}`}>
        <div className="w-full flex justify-center">
          <div className="max-w-[1200px] w-full">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
