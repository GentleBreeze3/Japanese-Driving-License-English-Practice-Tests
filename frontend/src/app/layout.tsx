import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Japanese Driving Exam',
  description: 'Practice for your Japanese driving license exam',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
