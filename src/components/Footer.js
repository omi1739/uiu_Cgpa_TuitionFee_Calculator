export default function Footer({ onScaleOpen }) {
  return (
    <footer className="w-full mt-20 border-t border-zinc-200 dark:border-zinc-900 py-8 px-6 text-center text-xs text-zinc-500">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <p>&copy; {new Date().getFullYear()} UIU CGPA Calculator. Tailored for United International University students.</p>
        <div className="flex gap-4">
          <span className="hover:text-zinc-700 dark:hover:text-zinc-300 cursor-pointer" onClick={onScaleOpen}>
            Grading Policy
          </span>
          <span>&bull;</span>
          <a href="https://www.uiu.ac.bd" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-700 dark:hover:text-zinc-300">
            UIU Portal
          </a>
        </div>
      </div>
    </footer>
  );
}
