import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "AI Study Companion",
  description: "AI-powered study tools for students",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <Navbar />

        <main className="pt-6">{children}</main>
      </body>
    </html>
  );
}
