import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import Button from "../ui/Button";

function LandingHero() {
  const navigate = useNavigate();

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center py-16 text-center sm:py-24 lg:py-32 motion-safe:animate-[fadeSlideUp_300ms_ease-out_both]"
    >
      {/* Tagline pill */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-border-hairline)] bg-[var(--color-surface-2)] px-3.5 py-1.5 text-xs font-medium text-[var(--color-brand-hover)]">
        <Sparkles size={14} aria-hidden="true" className="shrink-0" />
        <span>Shorten • Share • Track</span>
      </div>

      {/* Main product title */}
      <h1 className="max-w-4xl text-4xl font-bold tracking-[-0.03em] text-[var(--color-text-primary)] sm:text-5xl lg:text-6xl">
        LinkFlow
      </h1>

      {/* Subtitle / Value proposition */}
      <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--color-text-secondary)] sm:text-lg lg:text-xl">
        Shorten URLs, monitor performance, and manage everything from one beautiful dashboard.
      </p>

      {/* Primary and secondary call-to-action buttons */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Button
          variant="primary"
          onClick={() => navigate("/register")}
          className="flex items-center gap-2 px-6 py-2.5 text-base"
        >
          <span>Get Started</span>
          <ArrowRight size={16} aria-hidden="true" />
        </Button>
        <Button
          variant="secondary"
          onClick={() => navigate("/login")}
          className="px-6 py-2.5 text-base"
        >
          Sign In
        </Button>
      </div>
    </section>
  );
}

export default LandingHero;
