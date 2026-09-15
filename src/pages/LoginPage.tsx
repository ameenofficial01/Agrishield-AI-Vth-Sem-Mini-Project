import { useState } from "react";
import { Eye, EyeOff, Loader2, Lock, Mail, ShieldCheck, Sprout } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function LoginPage() {
  const { login } = useApp();
  const [email, setEmail] = useState("officer@agroshield.demo");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    // Frontend-only demo authentication — no backend call yet.
    window.setTimeout(() => {
      login();
    }, 500);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-4 py-10">
      <div className="w-full max-w-[400px]">
        <div className="mb-7 flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-forest-500 to-forest-700 shadow-[inset_0_1px_0_rgb(255_255_255/0.15)] ring-1 ring-forest-800/10">
            <Sprout className="h-6 w-6 text-emerald-100" strokeWidth={2.2} />
          </div>
          <h1 className="mt-3.5 text-[20px] font-bold tracking-tight text-ink">
            AgroShield <span className="text-forest-600">AI</span>
          </h1>
          <p className="mt-1 text-[12.5px] font-medium text-faint">
            Pest Risk Intelligence &amp; Early Warning
          </p>
        </div>

        <div className="rounded-xl border border-line bg-white p-6 shadow-card sm:p-7">
          <p className="text-[15px] font-semibold text-ink">Officer Sign In</p>
          <p className="mt-1 text-[12px] text-faint">
            Sign in to access pest risk monitoring for your district.
          </p>

          <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
            <label className="block">
              <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.06em] text-faint">
                Email / Officer ID
              </span>
              <span className="relative flex items-center">
                <Mail className="pointer-events-none absolute left-3 h-4 w-4 text-faint" strokeWidth={1.9} />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@department.gov.in"
                  className="h-10.5 w-full rounded-lg border border-line bg-white pl-9 pr-3 text-[13px] font-medium text-ink outline-none transition-colors placeholder:text-faint hover:border-[#c9d2c9] focus:border-forest-600 focus:ring-2 focus:ring-forest-600/15"
                />
              </span>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.06em] text-faint">
                Password
              </span>
              <span className="relative flex items-center">
                <Lock className="pointer-events-none absolute left-3 h-4 w-4 text-faint" strokeWidth={1.9} />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter any password (demo)"
                  className="h-10.5 w-full rounded-lg border border-line bg-white pl-9 pr-10 text-[13px] font-medium text-ink outline-none transition-colors placeholder:text-faint hover:border-[#c9d2c9] focus:border-forest-600 focus:ring-2 focus:ring-forest-600/15"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 text-faint hover:text-subtle"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </span>
            </label>

            <div className="flex items-center justify-between text-[12px]">
              <label className="flex items-center gap-2 text-subtle">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-3.5 w-3.5 rounded border-line text-forest-600 focus:ring-forest-600/30"
                />
                Remember me
              </label>
              <button type="button" className="font-medium text-forest-700 hover:underline">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className={`flex h-10.5 w-full items-center justify-center gap-2 rounded-lg text-[13.5px] font-semibold text-white shadow-sm transition-all ${
                submitting
                  ? "cursor-wait bg-forest-700"
                  : "bg-forest-800 hover:bg-forest-700 active:scale-[0.99]"
              }`}
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in…
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-5 flex items-start gap-2 rounded-lg bg-paper/80 p-3 text-[11px] leading-relaxed text-faint">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-subtle" />
            Frontend demo sign-in — no real account is created or verified. Any email and
            password will continue into the prototype.
          </div>
        </div>

        <p className="mt-5 text-center text-[10.5px] leading-relaxed text-faint">
          AgroShield AI · Explainable AI-based, location-specific pest risk forecasting and early
          warning
          <br />
          Frontend prototype using demonstration data.
        </p>
      </div>
    </div>
  );
}
