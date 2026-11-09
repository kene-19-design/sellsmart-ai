"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Checking your reset link...");
  const [error, setError] = useState(false);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    let active = true;

    async function checkResetLink() {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const tokenHash = params.get("token_hash");
      const type = params.get("type");

      if (code) {
        const { error } =
          await supabase.auth.exchangeCodeForSession(code);

        if (!active) return;

        if (error) {
          setError(true);
          setMessage("Your reset link is invalid or has expired. Please request another one.");
          return;
        }
      } else if (tokenHash && type === "recovery") {
        const { error } = await supabase.auth.verifyOtp({
          token_hash: tokenHash,
          type: "recovery",
        });

        if (!active) return;

        if (error) {
          setError(true);
          setMessage("Your reset link is invalid or has expired. Please request another one.");
          return;
        }
      } else {
        const { data } = await supabase.auth.getSession();

        if (!data.session) {
          if (!active) return;
          setError(true);
          setMessage("Your reset link is missing or has expired. Please request another one.");
          return;
        }
      }

      if (active) {
        setReady(true);
        setMessage("Enter your new password below.");
      }
    }

    checkResetLink();

    return () => {
      active = false;
    };
  }, []);

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(false);

    if (password.length < 8) {
      setError(true);
      setMessage("Your new password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError(true);
      setMessage("Your passwords do not match.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    setLoading(false);

    if (error) {
      setError(true);
      setMessage(error.message);
      return;
    }

    setUpdated(true);
    setMessage("Your password has been changed successfully.");
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
          Reset Your Password
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "#64748b",
            lineHeight: 1.6,
          }}
        >
          {message}
        </p>

        {ready && !updated && (
          <form onSubmit={handleUpdate}>
            <label style={labelStyle}>New Password</label>
            <input
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your new password"
              style={inputStyle}
            />

            <label style={labelStyle}>Confirm New Password</label>
            <input
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Enter your new password again"
              style={inputStyle}
            />

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "15px",
                marginTop: "10px",
                background: loading ? "#6ee7b7" : "#059669",
                color: "white",
                border: "none",
                borderRadius: "10px",
                fontSize: "16px",
                fontWeight: 700,
              }}
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        )}

        {updated && (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Link
              href="/login"
              style={{
                color: "#059669",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Go to Login
            </Link>
          </div>
        )}

        {error && (
          <div style={{ textAlign: "center", marginTop: "15px" }}>
            <Link
              href="/forgot-password"
              style={{
                color: "#059669",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Request another reset link
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: "7px",
  fontWeight: 600,
  color: "#334155",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px",
  border: "1px solid #cbd5e1",
  borderRadius: "10px",
  marginBottom: "18px",
  boxSizing: "border-box",
  fontSize: "15px",
};
