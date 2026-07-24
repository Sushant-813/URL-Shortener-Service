import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link2 } from "lucide-react";

import Button from "../ui/Button";
import Input from "../ui/Input";
import useToast from "../../hooks/useToast";
import urlService from "../../services/urlService";

// Minimum datetime value for the expiration field:
// must be at least 1 minute in the future.
function getMinDatetimeLocal() {
  const d = new Date(Date.now() + 60_000);
  // datetime-local expects "YYYY-MM-DDTHH:MM"
  return d.toISOString().slice(0, 16);
}

// Parse the "datetime-local" string from the input into a JS Date.
// Returns null if the string is empty or undefined.
function parseDatetimeLocal(value) {
  if (!value) return null;
  return new Date(value);
}

// Extract a user-friendly error message from an Axios error response.
function getShortenErrorMessage(error) {
  const { status, data } = error?.response ?? {};

  if (status === 400) {
    // Backend returns a string message for validation errors.
    if (typeof data === "string" && data.trim()) return data;
    if (typeof data?.message === "string" && data.message.trim()) {
      return data.message;
    }
    return "The request was invalid. Check the URL and expiration date.";
  }

  if (status === 401 || status === 403) {
    return "Your session has expired. Please sign in again.";
  }

  return "Unable to create the short URL. Please check your connection and try again.";
}

// URL creation form.
//
// Props:
//   onSuccess(dto) – called with the UrlMappingDTO when creation succeeds.
function ShortenForm({ onSuccess }) {
  const toast = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      originalUrl: "",
      expirationDate: "",
    },
  });

  const mutation = useMutation({
    mutationFn: ({ originalUrl, expirationDate }) =>
      urlService.createShortUrl(originalUrl, parseDatetimeLocal(expirationDate)),

    onSuccess: (dto) => {
      reset();
      toast.success("Short URL created successfully.");
      onSuccess(dto);
    },

    onError: (error) => {
      toast.error(getShortenErrorMessage(error));
    },
  });

  function onSubmit(data) {
    mutation.mutate(data);
  }

  const isPending = mutation.isPending;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Create short URL"
      className="
        mt-8 rounded-lg border border-[var(--color-border-hairline)]
        bg-[var(--color-surface-1)] p-6
      "
    >
      <div className="flex items-center gap-2">
        <Link2
          size={16}
          aria-hidden="true"
          className="text-[var(--color-brand-primary)]"
        />
        <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
          Shorten a URL
        </h3>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-[1fr_auto]">
        {/* Original URL field */}
        <div className="space-y-2">
          <label
            className="text-sm font-medium text-[var(--color-text-primary)]"
            htmlFor="originalUrl"
          >
            Long URL
          </label>
          <Input
            id="originalUrl"
            type="url"
            placeholder="https://example.com/very/long/url"
            autoComplete="url"
            aria-describedby={errors.originalUrl ? "originalUrl-error" : undefined}
            aria-invalid={Boolean(errors.originalUrl)}
            {...register("originalUrl", {
              required: "URL is required.",
              validate: (value) => {
                try {
                  new URL(value);
                  return true;
                } catch {
                  return "Enter a valid URL (e.g. https://example.com).";
                }
              },
            })}
          />
          {errors.originalUrl?.message && (
            <p id="originalUrl-error" className="text-sm text-[var(--color-danger)]">
              {errors.originalUrl.message}
            </p>
          )}
        </div>

        {/* Expiration date field */}
        <div className="space-y-2">
          <label
            className="text-sm font-medium text-[var(--color-text-primary)]"
            htmlFor="expirationDate"
          >
            Expires{" "}
            <span className="text-[var(--color-text-muted)] font-normal">
              (optional)
            </span>
          </label>
          <Input
            id="expirationDate"
            type="datetime-local"
            min={getMinDatetimeLocal()}
            aria-describedby={errors.expirationDate ? "expirationDate-error" : undefined}
            aria-invalid={Boolean(errors.expirationDate)}
            className="w-full md:w-56"
            {...register("expirationDate", {
              validate: (value) => {
                if (!value) return true;
                const selected = new Date(value);
                if (selected <= new Date()) {
                  return "Expiration must be in the future.";
                }
                return true;
              },
            })}
          />
          {errors.expirationDate?.message && (
            <p id="expirationDate-error" className="text-sm text-[var(--color-danger)]">
              {errors.expirationDate.message}
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <Button
          type="submit"
          disabled={isPending}
          aria-busy={isPending}
          className="min-w-32"
        >
          {isPending ? "Creating…" : "Create short URL"}
        </Button>
      </div>
    </form>
  );
}

export default ShortenForm;
