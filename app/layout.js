import './globals.css';
import Head from 'next/head';
import TopBar from './top-bar';
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <div className="min-h-screen flex flex-col">
          <TopBar />
          {children}
        </div>
      </body>
    </html>
  );
}
