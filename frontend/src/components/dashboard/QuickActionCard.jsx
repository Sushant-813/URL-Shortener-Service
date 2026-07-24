import { Link } from "react-router-dom";

import Card from "../ui/Card";

function QuickActionCard({ title, description, route }) {
  return (
    <Link
      className="group block h-full rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-canvas)]"
      to={route}
    >
      <Card className="flex h-full flex-col transition-colors duration-200 group-hover:border-[var(--color-brand-primary)] group-hover:bg-[var(--color-surface-2)] motion-reduce:transition-none">
        <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
          {title}
        </h3>
        <p className="mt-3 text-sm text-[var(--color-text-secondary)]">
          {description}
        </p>
      </Card>
    </Link>
  );
}

export default QuickActionCard;
