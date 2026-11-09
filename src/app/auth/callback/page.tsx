"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AuthCallbackPage() {
  const router = useRouter();
  const [message, setMessage] = useState("Confirming your email address...");
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;

    async function confirmEmail() {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const tokenHash = params.get("token_hash");
      const type = params.get("type");

      let confirmationError = null;

      if (code) {
        const result = await supabase.auth.exchangeCodeForSession(code);
        confirmationError = result.error;
      } else if (tokenHash && type) {
        const result = await supabase.auth.verifyOtp({
          token_hash: tokenHash,
          type: type as
            | "signup"
            | "invite"
            | "magiclink"
            | "recovery"
            | "email",
        });
        confirmationError = result.error;
      } else {
        confirmationError = new Error(
          "The confirmation link is missing or invalid."
        );
      }

      if (!active) return;

      if (confirmationError) {
        setError(true);
        setMessage(confirmationError.message);
        return;
      }

      setMessage("Your email has been confirmed successfully!");

      setTimeout(() => {
        if (active) {
          router.replace("/");
          router.refresh();
        }
      }, 2000);
    }

    confirmEmail();

    return () => {
      active = false;
    };
  }, [router]);

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
          textAlign: "center",
          boxShadow: "0 12px 40px rgba(0,60,40,0.10)",
        }}
      >
        <h1 style={{ color: "#064e3b" }}>
          SellSmart <span style={{ color: "#10b981" }}>AI</span>
        </h1>

        <h2 style={{ color: error ? "#b91c1c" : "#047857" }}>
          {error ? "Confirmation Problem" : "Email Confirmation"}
        </h2>

        <p style={{ color: "#475569", lineHeight: 1.6 }}>
          {message}
        </p>

        {error && (
          <a
            href="/login"
            style={{
              display: "inline-block",
              marginTop: "15px",
              color: "#059669",
              fontWeight: 700,
            }}
          >
            Go to Login
          </a>
        )}
      </div>
    </main>
  );
      }
