import { RegisterForm } from "../_components/register-form";

export default function RegisterPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground">
        Create your account
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Choose how you&apos;d like to use GearUp.
      </p>
      <div className="mt-6">
        <RegisterForm />
      </div>
    </div>
  );
}
