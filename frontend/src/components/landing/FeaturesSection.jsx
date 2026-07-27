import { Link2, BarChart3, ShieldCheck } from "lucide-react";
import Card from "../ui/Card";
import LandingSectionHeader from "./LandingSectionHeader";

const FEATURES = [
  {
    icon: Link2,
    title: "URL Shortening",
    description:
      "Generate clean, instant 8-character short links with optional expiration dates and custom alias management.",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description:
      "Track click totals, peak activity dates, and daily averages with aggregate and link-level interactive charts.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Dashboard",
    description:
      "Manage link status, toggle active states, perform soft deletes, and search all your links securely in real time.",
  },
];

function FeaturesSection() {
  return (
    <section id="features" className="py-12 scroll-mt-20">
      <LandingSectionHeader
        badge="Features"
        title="Everything you need to control your links"
        description="Built for developers and teams who demand precision, speed, and deep performance insights."
      />

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {FEATURES.map((feature) => {
          const Icon = feature.icon;
          return (
            <Card key={feature.title} hoverable className="flex flex-col h-full">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-surface-2)] text-[var(--color-brand-primary)] border border-[var(--color-border-hairline)]">
                <Icon size={20} aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                {feature.description}
              </p>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

export default FeaturesSection;
