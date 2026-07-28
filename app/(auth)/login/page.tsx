import { LoginForm } from "../_components/login-form";

export default function LoginPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground">
        Welcome back
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Log in to manage your rentals.
      </p>
      <div className="mt-6">
        <LoginForm />
      </div>
    </div>
  );
}
