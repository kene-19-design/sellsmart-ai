"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "25px 16px",
        background:
          "radial-gradient(circle at top left, #d1fae5, transparent 40%), linear-gradient(135deg, #f0fdf4, #ecfeff, #ffffff)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "440px",
          background: "white",
          padding: "35px 28px",
          borderRadius: "22px",
          boxShadow: "0 15px 50px rgba(0,60,40,0.12)",
          border: "1px solid #e5f3eb",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h1
            style={{
              fontSize: "30px",
              fontWeight: 800,
              color: "#064e3b",
              margin: "0 0 10px",
            }}
          >
            SellSmart <span style={{ color: "#10b981" }}>AI</span>
          </h1>

          <p style={{ color: "#64748b", fontSize: "14px" }}>
            Welcome back! Sign in to your account.
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: 600,
              color: "#334155",
            }}
          >
            Email Address
          </label>

          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            autoComplete="email"
            style={{
              width: "100%",
              padding: "14px",
              border: "1px solid #cbd5e1",
              borderRadius: "10px",
              marginBottom: "20px",
              boxSizing: "border-box",
              fontSize: "15px",
            }}
          />

          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: 600,
              color: "#334155",
            }}
          >
            Password
          </label>

          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            autoComplete="current-password"
            style={{
              width: "100%",
              padding: "14px",
              border: "1px solid #cbd5e1",
              borderRadius: "10px",
              marginBottom: "12px",
              boxSizing: "border-box",
              fontSize: "15px",
            }}
          />

          <div style={{ textAlign: "right", marginBottom: "22px" }}>
            <Link
              href="/forgot-password"
              style={{
                color: "#059669",
                fontSize: "13px",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Forgot password?
            </Link>
          </div>

          {error && (
            <p
              style={{
                background: "#fef2f2",
                color: "#b91c1c",
                padding: "12px",
                borderRadius: "8px",
                fontSize: "13px",
                marginBottom: "18px",
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "15px",
              background: loading ? "#6ee7b7" : "#059669",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "25px",
            color: "#64748b",
            fontSize: "14px",
          }}
        >
          Don't have an account?{" "}
          <Link
            href="/signup"
            style={{
              color: "#059669",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Create Account
          </Link>
        </p>

        <div
          style={{
            textAlign: "center",
            borderTop: "1px solid #e2e8f0",
            paddingTop: "18px",
            marginTop: "20px",
          }}
        >
          <Link
            href="/"
            style={{
              color: "#64748b",
              fontSize: "13px",
              textDecoration: "none",
            }}
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
  }
