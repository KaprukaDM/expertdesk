"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Logo } from "@/components/site/logo";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", businessName: "", email: "", phone: "", password: "" });
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error ?? "Something went wrong. Try again.");
      setLoading(false);
      return;
    }

    const result = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    if (result?.error) {
      setError("Account created — please log in.");
      setLoading(false);
      router.push("/login");
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
            <h1 className="font-heading text-2xl font-semibold">Create your account</h1>
            <p className="text-muted-foreground text-sm">
              Know exactly what&rsquo;s costing you sales — free to start.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="border-border bg-card space-y-4 rounded-2xl border p-6 shadow-sm"
          noValidate>
          <div className="space-y-2">
            <Label htmlFor="name">Your name</Label>
            <Input
              id="name"
              required
              autoComplete="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="businessName">Business name</Label>
            <Input
              id="businessName"
              required
              value={form.businessName}
              onChange={(e) => setForm({ ...form, businessName: e.target.value })}
            />
          </div>
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
            <Label htmlFor="phone">Phone number</Label>
            <Input
              id="phone"
              type="tel"
              required
              autoComplete="tel"
              placeholder="07X XXX XXXX"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                minLength={8}
                autoComplete="new-password"
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
            <p className="text-xs text-muted-foreground">At least 8 characters.</p>
          </div>

          <div className="flex items-start gap-2 pt-1">
            <Checkbox
              id="terms"
              required
              checked={agreed}
              onCheckedChange={(v) => setAgreed(v === true)}
            />
            <Label htmlFor="terms" className="text-muted-foreground text-xs leading-snug font-normal">
              I agree to the{" "}
              <Link href="/terms" className="underline underline-offset-4">
                Terms
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="underline underline-offset-4">
                Privacy Policy
              </Link>
              .
            </Label>
          </div>

          {error && (
            <p role="alert" className="text-sm text-critical">
              {error}
            </p>
          )}

          <Button type="submit" className="w-full" size="lg" disabled={loading || !agreed}>
            {loading ? (
              <>
                <Spinner className="size-4" /> Creating account…
              </>
            ) : (
              "Create account"
            )}
          </Button>
        </form>

        <p className="text-muted-foreground text-center text-xs">
          Expert Desk is in early access — built for Sri Lankan SMEs, free while we build it out.
        </p>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-foreground underline underline-offset-4">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
