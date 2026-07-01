"use client";

export default function Footer({ onScaleOpen }) {
  return (
    <footer className="w-full mt-20 border-t border-zinc-200 dark:border-zinc-900 py-8 px-6 text-center text-xs text-zinc-500">
      <div className="max-w-6xl mx-auto flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} UIU CGPA Calculator &mdash; GPA &amp; Tuition Fee Planner for United International University students in Bangladesh.</p>
          <nav aria-label="Footer navigation" className="flex gap-4">
            <span className="hover:text-zinc-700 dark:hover:text-zinc-300 cursor-pointer" onClick={onScaleOpen}>
              UIU Grading Policy
            </span>
            <span aria-hidden="true">&bull;</span>
            <a href="https://www.uiu.ac.bd" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-700 dark:hover:text-zinc-300">
              United International University
            </a>
          </nav>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-3 border-t border-zinc-200 dark:border-zinc-900">
          <p>Developed by <span className="font-semibold text-zinc-600 dark:text-zinc-400">Siyam Islam Omi</span> — a student from United International University</p>
          <div className="flex gap-4">
            <a href="https://github.com/omi1739" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/siyam-islam-omi" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">
              LinkedIn
            </a>
            <a href="https://siyam-omi.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">
              Portfolio
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
