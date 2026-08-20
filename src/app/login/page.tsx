"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signIn, signOut, getSession } from "next-auth/react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Logo } from "@/components/site/logo";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    if (result?.error) {
      setError("That email or password isn't right.");
      setLoading(false);
      return;
    }

    // This is the CLIENT door. If an agency (ADMIN) account signs in here, sign it back out
    // and point it at the agency login — the two sides stay separate.
    const session = await getSession();
    if (session?.user?.role === "ADMIN") {
      await signOut({ redirect: false });
      setError("That's an agency account. Please use the agency sign-in.");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="flex flex-1 items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-4 text-center">
          <div className="flex justify-center">
            <Logo />
          </div>
          <div className="space-y-1">
            <h1 className="font-heading text-2xl font-semibold">Welcome back</h1>
            <p className="text-muted-foreground text-sm">Log in to your dashboard.</p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="border-border bg-card space-y-4 rounded-2xl border p-6 shadow-sm"
          noValidate>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                className="pr-10"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-0 flex w-9 items-center justify-center text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>
          {error && (
            <div role="alert" className="space-y-1 text-sm text-critical">
              <p>{error}</p>
              {error.includes("agency") && (
                <Link href="/admin/login" className="text-foreground underline underline-offset-4">
                  Go to agency sign-in
                </Link>
              )}
            </div>
          )}
          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? (
              <>
                <Spinner className="size-4" /> Logging in…
              </>
            ) : (
              "Log in"
            )}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Don&rsquo;t have an account?{" "}
          <Link href="/signup" className="text-foreground underline underline-offset-4">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
