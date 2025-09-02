import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t bg-white/60 backdrop-blur supports-[backdrop-filter]:bg-white/40 dark:bg-background/80">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-foreground/60">
            © {new Date().getFullYear()} CareerPath Finder
          </p>
          <nav className="flex items-center gap-6 text-sm text-foreground/70">
            <Link to="/about" className="hover:text-foreground/90">
              About
            </Link>
            <Link to="/contact" className="hover:text-foreground/90">
              Contact
            </Link>
            <Link to="/privacy" className="hover:text-foreground/90">
              Privacy
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
