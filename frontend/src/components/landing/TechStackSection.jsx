import { Code2, Cpu, Database, KeyRound, BarChart2, Layers } from "lucide-react";
import Card from "../ui/Card";
import LandingSectionHeader from "./LandingSectionHeader";

const TECH_ITEMS = [
  {
    name: "React 19",
    category: "Frontend Framework",
    description: "Component-driven user interface built with modern hooks and fast client-side rendering.",
    icon: Code2,
  },
  {
    name: "Spring Boot",
    category: "Backend Engine",
    description: "Enterprise Java backend providing RESTful REST controllers, Data JPA, and security layers.",
    icon: Cpu,
  },
  {
    name: "MySQL",
    category: "Relational Database",
    description: "Robust relational data store with foreign key constraints, indexes, and soft deletion.",
    icon: Database,
  },
  {
    name: "JWT",
    category: "Authentication",
    description: "Stateless JSON Web Tokens for authorization across API endpoints.",
    icon: KeyRound,
  },
  {
    name: "Recharts",
    category: "Data Visualization",
    description: "Composable SVG chart components powering analytics timelines and click breakdowns.",
    icon: BarChart2,
  },
  {
    name: "Tailwind CSS",
    category: "Design System",
    description: "Utility-first CSS styling using CSS custom properties for enterprise-grade themes.",
    icon: Layers,
  },
];

function TechStackSection() {
  return (
    <section id="tech-stack" className="py-12 scroll-mt-20">
      <LandingSectionHeader
        badge="Architecture"
        title="Powered by modern tech stack"
        description="Built on reliable, scalable technologies chosen for maintainability, speed, and security."
      />

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {TECH_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.name} hoverable className="flex flex-col h-full">
              <div className="flex items-center gap-3 mb-3">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[var(--color-surface-2)] text-[var(--color-brand-primary)] border border-[var(--color-border-hairline)]">
                  <Icon size={18} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
                    {item.name}
                  </h3>
                  <span className="text-xs text-[var(--color-text-muted)] font-mono">
                    {item.category}
                  </span>
                </div>
              </div>
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

export default TechStackSection;
