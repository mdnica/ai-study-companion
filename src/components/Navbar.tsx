"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/chat", label: "AI Chat" },
    { href: "/flashcards", label: "Flashcards" },
    { href: "/planner", label: "Study Planner" },
    { href: "/upload", label: "Summarizer" },
    { href: "/quiz", label: "Quiz Generator" },
  ];

  return (
    <nav className="border-b bg-white/40 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center gap-8">
        <h1 className="text-xl font-bold">StudyCompanion</h1>

        <div className="flex items-center gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium hover:text-blue-600 transition",
                pathname === link.href
                  ? "text-blue-600 font-semibold"
                  : "text-gray-700"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
