"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  async function handleReset(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError(false);

    const { error: resetError } =
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

    setLoading(false);

    if (resetError) {
      setError(true);
      setMessage(resetError.message);
      return;
    }

    setMessage(
      "If an account exists with this email, a password reset link will be sent. Please check your inbox."
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        background: "linear-gradient(135deg, #ecfdf5, #eff6ff)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "430px",
          background: "white",
          padding: "35px 25px",
          borderRadius: "20px",
          boxShadow: "0 12px 40px rgba(0,60,40,0.10)",
        }}
      >
        <h1 style={{ textAlign: "center", color: "#064e3b" }}>
          SellSmart <span style={{ color: "#10b981" }}>AI</span>
        </h1>

        <h2 style={{ textAlign: "center", color: "#18352a" }}>
          Forgot Password?
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "#64748b",
            lineHeight: 1.6,
          }}
        >
          Enter the email address linked to your account. We'll send
          instructions to reset your password.
        </p>

        <form onSubmit={handleReset}>
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
              marginBottom: "18px",
              boxSizing: "border-box",
              fontSize: "15px",
            }}
          />

          {message && (
            <p
              style={{
                padding: "12px",
                borderRadius: "8px",
                background: error ? "#fef2f2" : "#ecfdf5",
                color: error ? "#b91c1c" : "#065f46",
                fontSize: "13px",
              }}
            >
              {message}
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
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "22px" }}>
          <Link
            href="/login"
            style={{
              color: "#059669",
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            ← Back to Login
          </Link>
        </p>
      </div>
    </main>
  );
}
