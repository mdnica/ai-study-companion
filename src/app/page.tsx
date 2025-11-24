import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="p-10 space-y-6">
      <h1 className="text-4xl font-bold"> AI Study Companion</h1>
      <p className="text-muted foreground text-lg">
        What would you like to do today?
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
        <ActionCard title="AI Chat" href="/chat" />
        <ActionCard title="Flashcard Generator" href="/flashcards" />
        <ActionCard title="Study Planner" href="/planner" />
        <ActionCard title="PDF / File Summarizer" href="/upload" />
        <ActionCard title="Notes → Quiz Generator" href="/quiz" />
      </div>
    </main>
  );
}

function ActionCard({ title, href }: { title: string; href: string }) {
  return (
    <a
      href={href}
      className="border p-6 rounded-lg shadow-sm hover:shadow-md transition"
    >
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-2 text-sm text-gray-500">Open tool →</p>
    </a>
  );
}
