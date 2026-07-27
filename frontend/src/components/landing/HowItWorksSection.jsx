import { PlusCircle, Share2, TrendingUp } from "lucide-react";
import Card from "../ui/Card";
import LandingSectionHeader from "./LandingSectionHeader";

const STEPS = [
  {
    step: "01",
    icon: PlusCircle,
    title: "Create",
    description:
      "Paste any destination link into LinkFlow and set optional expiration parameters to get a short URL instantly.",
  },
  {
    step: "02",
    icon: Share2,
    title: "Share",
    description:
      "Copy your short code with one click and share across platforms, marketing channels, or email campaigns.",
  },
  {
    step: "03",
    icon: TrendingUp,
    title: "Track",
    description:
      "Monitor visitor click rates, peak traffic periods, and link availability from your personal dashboard.",
  },
];

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-12 scroll-mt-20">
      <LandingSectionHeader
        badge="Workflow"
        title="Three simple steps"
        description="Streamlined link management without complexity or bloated configuration."
      />

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {STEPS.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.step} hoverable className="relative flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-2xl font-bold text-[var(--color-brand-primary)]">
                  {item.step}
                </span>
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[var(--color-surface-2)] text-[var(--color-text-secondary)] border border-[var(--color-border-hairline)]">
                  <Icon size={16} aria-hidden="true" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                {item.description}
              </p>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

export default HowItWorksSection;
