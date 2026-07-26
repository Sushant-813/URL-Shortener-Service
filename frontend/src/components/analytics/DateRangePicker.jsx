import Button from "../ui/Button";
import Input from "../ui/Input";
import { toISODate } from "../../utils/analyticsUtils";

// Quick-select presets. `days` is the number of days before today to use as
// start (e.g. days=6 → last 7 days including today).
const PRESETS = [
  { label: "Last 7 days", days: 6 },
  { label: "Last 30 days", days: 29 },
  { label: "Last 90 days", days: 89 },
];

// Date range controls: quick-select preset buttons + individual date inputs.
//
// Props:
//   startDate            – "YYYY-MM-DD" string (controlled)
//   endDate              – "YYYY-MM-DD" string (controlled)
//   onStartDateChange    – (newValue: string) => void
//   onEndDateChange      – (newValue: string) => void
function DateRangePicker({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}) {
  const todayStr = toISODate(new Date());

  function applyPreset(days) {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - days);
    onStartDateChange(toISODate(start));
    onEndDateChange(toISODate(end));
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Quick-select preset buttons */}
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((preset) => (
          <Button
            key={preset.label}
            variant="secondary"
            onClick={() => applyPreset(preset.days)}
          >
            {preset.label}
          </Button>
        ))}
      </div>

      {/* Separator */}
      <span
        aria-hidden="true"
        className="hidden text-[var(--color-border-hairline)] sm:inline"
      >
        |
      </span>

      {/* Custom date range inputs */}
      <div className="flex flex-wrap items-center gap-2">
        <label
          htmlFor="analytics-start-date"
          className="text-sm text-[var(--color-text-muted)]"
        >
          From
        </label>
        <Input
          id="analytics-start-date"
          type="date"
          value={startDate}
          max={endDate}
          onChange={(e) => onStartDateChange(e.target.value)}
          className="w-auto [color-scheme:dark]"
        />

        <label
          htmlFor="analytics-end-date"
          className="text-sm text-[var(--color-text-muted)]"
        >
          to
        </label>
        <Input
          id="analytics-end-date"
          type="date"
          value={endDate}
          min={startDate}
          max={todayStr}
          onChange={(e) => onEndDateChange(e.target.value)}
          className="w-auto [color-scheme:dark]"
        />
      </div>
    </div>
  );
}

export default DateRangePicker;
