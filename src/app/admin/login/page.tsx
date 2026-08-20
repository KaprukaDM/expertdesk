"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signIn, signOut, getSession } from "next-auth/react";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Logo } from "@/components/site/logo";

export default function AgencyLoginPage() {
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

    // This is the AGENCY door. A client (non-ADMIN) account that signs in here is sent back
    // out and pointed at the client login — the two sides stay separate.
    const session = await getSession();
    if (session?.user?.role !== "ADMIN") {
      await signOut({ redirect: false });
      setError("That's a client account, not an agency one.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="flex min-h-dvh flex-1 items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-4 text-center">
          <div className="flex justify-center">
            <Logo />
          </div>
          <div className="space-y-1">
            <span className="bg-secondary text-primary mx-auto flex size-10 items-center justify-center rounded-xl">
              <ShieldCheck className="size-5" />
            </span>
            <h1 className="font-heading text-2xl font-semibold">Agency sign-in</h1>
            <p className="text-muted-foreground text-sm">Kapruka team access — order fulfilment.</p>
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
            <p role="alert" className="text-sm text-critical">
              {error}
            </p>
          )}
          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? (
              <>
                <Spinner className="size-4" /> Signing in…
              </>
            ) : (
              "Sign in"
            )}
          </Button>
        </form>

        <p className="text-muted-foreground text-center text-xs">
          Not agency staff? This area is for the Kapruka team only.
        </p>
      </div>
    </main>
  );
}
