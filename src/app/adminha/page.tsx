import { Suspense } from "react";
import LoginForm from "./LoginForm";

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <main className="grid min-h-dvh place-items-center bg-bg text-sm text-muted">
          Loading…
        </main>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
