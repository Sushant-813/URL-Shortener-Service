import { useLocation, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import useAuth from "../../hooks/useAuth";
import authService from "../../services/authService";

function getLoginErrorMessage(error) {
  const { status, data } = error?.response ?? {};

  if (status === 401 || status === 403) {
    return "Incorrect username or password. Please try again.";
  }

  if (typeof data === "string" && data.trim()) {
    return data;
  }

  return "Unable to sign in. Please check your connection and try again.";
}

function getPostLoginDestination(from) {
  if (
    !from ||
    typeof from.pathname !== "string" ||
    !from.pathname.startsWith("/") ||
    from.pathname.startsWith("//")
  ) {
    return "/dashboard";
  }

  const search = typeof from.search === "string" ? from.search : "";
  const hash = typeof from.hash === "string" ? from.hash : "";

  return `${from.pathname}${search}${hash}`;
}

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const successMessage =
    typeof location.state?.message === "string" ? location.state.message : null;
  const {
    register: registerField,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit({ username, password }) {
    clearErrors("root");

    try {
      const response = await authService.login(username, password);

      if (!response?.token) {
        throw new Error("The server did not return an authentication token.");
      }

      if (!login(response.token)) {
        setError("root", {
          type: "server",
          message: "Unable to verify your authentication session. Please try again.",
        });
        return;
      }

      navigate(getPostLoginDestination(location.state?.from), { replace: true });
    } catch (error) {
      setError("root", {
        type: "server",
        message: getLoginErrorMessage(error),
      });
    }
  }

  return (
    <section
      className="flex min-h-screen items-center justify-center px-4 py-12"
      aria-labelledby="login-heading"
    >
      <Card className="w-full max-w-md">
        <div className="space-y-2">
          <p className="text-sm font-medium text-[var(--color-text-secondary)]">
            URL Shortener
          </p>
          <h1
            id="login-heading"
            className="text-2xl font-semibold tracking-[-0.02em]"
          >
            Sign in to your workspace
          </h1>
          <p className="text-sm text-[var(--color-text-muted)]">
            Manage and monitor your shortened links.
          </p>
        </div>

        {successMessage && (
          <p
            className="mt-6 rounded-md border border-[var(--color-success)] bg-[var(--color-surface-2)] px-3 py-2 text-sm text-[var(--color-text-secondary)]"
            role="status"
          >
            {successMessage}
          </p>
        )}

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
              placeholder="Enter your username"
              {...registerField("username", {
                required: "Username is required.",
              })}
            />
            {errors.username?.message && (
              <p id="username-error" className="text-sm text-[var(--color-danger)]">
                {errors.username.message}
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
              autoComplete="current-password"
              aria-describedby={errors.password ? "password-error" : undefined}
              aria-invalid={Boolean(errors.password)}
              placeholder="Enter your password"
              {...registerField("password", {
                required: "Password is required.",
              })}
            />
            {errors.password?.message && (
              <p id="password-error" className="text-sm text-[var(--color-danger)]">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? "Signing in…" : "Sign in"}
          </Button>
        </form>

        <p className="mt-6 text-sm text-[var(--color-text-muted)]">
          New to URL Shortener?{" "}
          <Link
            className="font-medium text-[var(--color-text-primary)] underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-focus)]"
            to="/register"
          >
            Create an account
          </Link>
        </p>
      </Card>
    </section>
  );
}

export default Login;
