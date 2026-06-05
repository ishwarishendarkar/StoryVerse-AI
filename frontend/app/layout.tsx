import "./globals.css";
import Navbar from "../components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body className="bg-[#080808] text-white min-h-screen">

        {/* Background glow effects */}

        <div className="fixed inset-0 -z-10 overflow-hidden">

          <div className="absolute top-20 left-20 h-72 w-72 bg-violet-600/20 blur-[120px]" />

          <div className="absolute bottom-20 right-20 h-72 w-72 bg-cyan-500/20 blur-[120px]" />

        </div>

        <Navbar />

        <main>

          {children}

        </main>

      </body>

    </html>
  );
}