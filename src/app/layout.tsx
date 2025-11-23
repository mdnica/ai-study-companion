import type { Metadata } from "next";
import "./globals.css";

export const Metadata = {
    title: "AI Study Companion",
    description: "An AI-powered study companion app",
};

export default function RootLayout ({
    children,
} : {
    children: React.ReactNode;
}) {
    return (
    <html lang="en">
        <body>{children}</body>
    </html>
    );
}