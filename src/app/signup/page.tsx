"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function SignupPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accountType, setAccountType] = useState("customer");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (password.length < 8) {
      setError("Your password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Your passwords do not match.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: {
          full_name: fullName,
          account_type: accountType,
        },
      },
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    if (data.session) {
      router.push("/");
      router.refresh();
      return;
    }

    setSuccess(true);
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
          "radial-gradient(circle at top right, #a7f3d0, transparent 38%), linear-gradient(135deg, #ecfdf5, #eff6ff, #ffffff)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "470px",
          background: "white",
          padding: "32px 26px",
          borderRadius: "22px",
          boxShadow: "0 15px 50px rgba(0,60,40,0.12)",
          border: "1px solid #e5f3eb",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "25px" }}>
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
            Create your account and start shopping or selling.
          </p>
        </div>

        {success ? (
          <div
            style={{
              background: "#ecfdf5",
              padding: "22px",
              borderRadius: "12px",
              textAlign: "center",
              color: "#065f46",
            }}
          >
            <h2>Check your email!</h2>
            <p>
              We have sent a confirmation link to {email}. Open the email
              and confirm your account before signing in.
            </p>
            <Link
              href="/login"
              style={{
                display: "inline-block",
                marginTop: "15px",
                color: "#047857",
                fontWeight: 700,
              }}
            >
              Go to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSignup}>
            <label style={labelStyle}>Full Name</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              autoComplete="name"
              style={inputStyle}
            />

            <label style={labelStyle}>Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              autoComplete="email"
              style={inputStyle}
            />

            <label style={labelStyle}>Account Type</label>
            <select
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
              style={inputStyle}
            >
              <option value="customer">Customer - I want to shop</option>
              <option value="seller">Seller - I want to sell products</option>
            </select>

            <label style={labelStyle}>Password</label>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              autoComplete="new-password"
              style={inputStyle}
            />

            <label style={labelStyle}>Confirm Password</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Enter your password again"
              autoComplete="new-password"
              style={inputStyle}
            />

            {error && (
              <p
                style={{
                  background: "#fef2f2",
                  color: "#b91c1c",
                  padding: "12px",
                  borderRadius: "8px",
                  fontSize: "13px",
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
                marginTop: "12px",
                background: loading ? "#6ee7b7" : "#059669",
                color: "white",
                border: "none",
                borderRadius: "10px",
                fontSize: "16px",
                fontWeight: 700,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>
        )}

        <p
          style={{
            textAlign: "center",
            marginTop: "23px",
            color: "#64748b",
            fontSize: "14px",
          }}
        >
          Already have an account?{" "}
          <Link
            href="/login"
            style={{
              color: "#059669",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Sign In
          </Link>
        </p>

        <div style={{ textAlign: "center", marginTop: "18px" }}>
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

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: "7px",
  fontWeight: 600,
  color: "#334155",
  fontSize: "14px",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "13px",
  border: "1px solid #cbd5e1",
  borderRadius: "10px",
  marginBottom: "17px",
  boxSizing: "border-box",
  fontSize: "15px",
  background: "white",
};
