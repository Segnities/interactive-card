import { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';

import './styles/Layout.scss';

const spaceGrotesk = Space_Grotesk({ weight: ['500'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Interactive card',
  description: "Interactive card with input data",
  icons: { icon: "/favicon.ico", apple: "/favicon.ico" }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">

      <body className={spaceGrotesk.className}>{children}</body>
    </html>
  )
}
