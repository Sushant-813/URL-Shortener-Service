import { Link, useNavigate } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";

import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import authService from "../../services/authService";

const REGISTRATION_FIELDS = ["username", "email", "password"];

function getRegistrationErrorMessage(error) {
  const { status, data } = error.response ?? {};

  if (status === 409 && typeof data === "string" && data.trim()) {
    return data;
  }

  return "Unable to create your account. Please check your details and try again.";
}

function Register() {
  const navigate = useNavigate();
  const {
    register: registerField,
    handleSubmit,
    control,
    clearErrors,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const password = useWatch({ control, name: "password" });

  async function onSubmit({ username, email, password: submittedPassword }) {
    clearErrors("root");

    try {
      await authService.register({
        username,
        email,
        password: submittedPassword,
      });
      navigate("/login", {
        replace: true,
        state: {
          message: "Your account has been created. You can now sign in.",
        },
      });
    } catch (error) {
      const { status, data } = error.response ?? {};

      if (status === 400 && data && typeof data === "object") {
        const fieldErrors = Object.entries(data).filter(([field]) =>
          REGISTRATION_FIELDS.includes(field),
        );

        if (fieldErrors.length) {
          fieldErrors.forEach(([field, message]) => {
            setError(field, {
              type: "server",
              message: String(message),
            });
          });
          return;
        }
      }

      const message = getRegistrationErrorMessage(error);

      if (status === 409) {
        const duplicateField = message.toLowerCase().includes("email")
          ? "email"
          : "username";
        setError(duplicateField, { type: "server", message });
        return;
      }

      setError("root", { type: "server", message });
    }
  }

  return (
    <section
      className="flex min-h-screen items-center justify-center px-4 py-12"
      aria-labelledby="register-heading"
    >
      <Card className="w-full max-w-md">
        <div className="space-y-2">
          <p className="text-sm font-medium text-[var(--color-text-secondary)]">
            URL Shortener
          </p>
          <h1
            id="register-heading"
            className="text-2xl font-semibold tracking-[-0.02em]"
          >
            Create your account
          </h1>
          <p className="text-sm text-[var(--color-text-muted)]">
            Start managing shortened links from one workspace.
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
          {errors.root?.message && (
            <p
              className="rounded-md border border-[var(--color-danger)] bg-[var(--color-surface-2)] px-3 py-2 text-sm text-[var(--color-text-secondary)]"
              role="alert"
            >
              {errors.root.message}
            </p>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="username">
              Username
            </label>
            <Input
              id="username"
              autoComplete="username"
              aria-describedby={errors.username ? "username-error" : undefined}
              aria-invalid={Boolean(errors.username)}
              placeholder="Choose a username"
              {...registerField("username", {
                required: "Username is required.",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters.",
                },
                maxLength: {
                  value: 30,
                  message: "Username must be 30 characters or fewer.",
                },
              })}
            />
            {errors.username?.message && (
              <p id="username-error" className="text-sm text-[var(--color-danger)]">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="email">
              Email address
            </label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              aria-describedby={errors.email ? "email-error" : undefined}
              aria-invalid={Boolean(errors.email)}
              placeholder="name@example.com"
              {...registerField("email", {
                required: "Email is required.",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Enter a valid email address.",
                },
              })}
            />
            {errors.email?.message && (
              <p id="email-error" className="text-sm text-[var(--color-danger)]">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="password">
              Password
            </label>
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              aria-describedby={errors.password ? "password-error" : undefined}
              aria-invalid={Boolean(errors.password)}
              placeholder="Create a password"
              {...registerField("password", {
                required: "Password is required.",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters.",
                },
              })}
            />
            {errors.password?.message && (
              <p id="password-error" className="text-sm text-[var(--color-danger)]">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="confirm-password">
              Confirm password
            </label>
            <Input
              id="confirm-password"
              type="password"
              autoComplete="new-password"
              aria-describedby={
                errors.confirmPassword ? "confirm-password-error" : undefined
              }
              aria-invalid={Boolean(errors.confirmPassword)}
              placeholder="Re-enter your password"
              {...registerField("confirmPassword", {
                required: "Please confirm your password.",
                validate: (value) =>
                  value === password || "Passwords do not match.",
              })}
            />
            {errors.confirmPassword?.message && (
              <p
                id="confirm-password-error"
                className="text-sm text-[var(--color-danger)]"
              >
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? "Creating account…" : "Create account"}
          </Button>
        </form>

        <p className="mt-6 text-sm text-[var(--color-text-muted)]">
          Already have an account?{" "}
          <Link
            className="font-medium text-[var(--color-text-primary)] underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-focus)]"
            to="/login"
          >
            Sign in
          </Link>
        </p>
      </Card>
    </section>
  );
}

export default Register;
