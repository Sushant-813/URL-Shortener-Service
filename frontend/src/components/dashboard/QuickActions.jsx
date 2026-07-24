import QuickActionCard from "./QuickActionCard";

const QUICK_ACTIONS = [
  {
    title: "Create Short URL",
    description: "Start a new shortened link from your URL workspace.",
    route: "/myurls",
  },
  {
    title: "My URLs",
    description: "View and manage all of your shortened links.",
    route: "/myurls",
  },
  {
    title: "Analytics",
    description: "Review link performance and click activity.",
    route: "/analytics",
  },
];

function QuickActions({ actions = QUICK_ACTIONS }) {
  return (
    <section className="mt-12" aria-labelledby="quick-actions-heading">
      <h2
        id="quick-actions-heading"
        className="text-2xl font-semibold tracking-[-0.02em] text-[var(--color-text-primary)]"
      >
        Quick actions
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {actions.map((action) => (
          <QuickActionCard key={action.title} {...action} />
        ))}
      </div>
    </section>
  );
}

export default QuickActions;
