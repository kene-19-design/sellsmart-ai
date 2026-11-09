"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

const countries = [
  { name: "Nigeria", code: "NG", dial: "+234" },
  { name: "United States", code: "US", dial: "+1" },
  { name: "United Kingdom", code: "GB", dial: "+44" },
  { name: "Canada", code: "CA", dial: "+1" },
  { name: "Ghana", code: "GH", dial: "+233" },
  { name: "South Africa", code: "ZA", dial: "+27" },
  { name: "Kenya", code: "KE", dial: "+254" },
  { name: "Uganda", code: "UG", dial: "+256" },
  { name: "Tanzania", code: "TZ", dial: "+255" },
  { name: "Cameroon", code: "CM", dial: "+237" },
  { name: "Egypt", code: "EG", dial: "+20" },
  { name: "India", code: "IN", dial: "+91" },
  { name: "China", code: "CN", dial: "+86" },
  { name: "Australia", code: "AU", dial: "+61" },
  { name: "New Zealand", code: "NZ", dial: "+64" },
  { name: "Germany", code: "DE", dial: "+49" },
  { name: "France", code: "FR", dial: "+33" },
  { name: "Italy", code: "IT", dial: "+39" },
  { name: "Spain", code: "ES", dial: "+34" },
  { name: "Netherlands", code: "NL", dial: "+31" },
  { name: "Ireland", code: "IE", dial: "+353" },
  { name: "United Arab Emirates", code: "AE", dial: "+971" },
  { name: "Saudi Arabia", code: "SA", dial: "+966" },
  { name: "Brazil", code: "BR", dial: "+55" },
  { name: "Mexico", code: "MX", dial: "+52" },
  { name: "Japan", code: "JP", dial: "+81" },
  { name: "Singapore", code: "SG", dial: "+65" },
  { name: "Malaysia", code: "MY", dial: "+60" },
  { name: "Turkey", code: "TR", dial: "+90" },
  { name: "Sweden", code: "SE", dial: "+46" }
];

const categories = [
  "Fashion",
  "Electronics",
  "Beauty and personal care",
  "Home and kitchen",
  "Food and groceries",
  "Health and wellness",
  "Sports and fitness",
  "Books and education",
  "Automobiles",
  "Other"
];

const field: React.CSSProperties = {
  width: "100%",
  padding: "13px",
  margin: "7px 0 17px",
  border: "1px solid #cbd5ce",
  borderRadius: "8px",
  boxSizing: "border-box",
  fontSize: "15px",
  background: "white"
};

export default function SellerRegister() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    sellerType: "individual",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "NG",
    phone: "",
    storeName: "",
    category: "",
    description: ""
  });

  function update(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!supabaseUrl || !supabaseKey) {
      setError("Supabase configuration is missing. Please contact support.");
      return;
    }

    if (form.password.length < 8) {
      setError("Your password must contain at least 8 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Your passwords do not match.");
      return;
    }

    const selectedCountry = countries.find(
      country => country.code === form.country
    );

    if (!selectedCountry) {
      setError("Please select your country.");
      return;
    }

    const phoneNumber = form.phone.replace(/[\s()-]/g, "");

    if (!/^[0-9]{6,15}$/.test(phoneNumber)) {
      setError("Please enter a valid phone number.");
      return;
    }

    setLoading(true);

    try {
      const { data, error: signupError } =
        await supabase.auth.signUp({
          email: form.email.trim().toLowerCase(),
          password: form.password,
          options: {
            data: {
              account_type: "seller",
              seller_type: form.sellerType,
              full_name: form.fullName.trim(),
              country: selectedCountry.name,
              country_code: selectedCountry.code,
              phone: `${selectedCountry.dial}${phoneNumber}`,
              store_name: form.storeName.trim(),
              category: form.category,
              description: form.description.trim()
            }
          }
        });

      if (signupError) {
        throw signupError;
      }

      if (!data.user) {
        throw new Error("Account creation could not be completed.");
      }

      setMessage(
        data.session
          ? "Your SellSmart AI seller account has been created. Your store is being set up automatically."
          : "Registration received! Please check your email and confirm your address to continue."
      );

      setForm({
        sellerType: "individual",
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        country: "NG",
        phone: "",
        storeName: "",
        category: "",
        description: ""
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{
      minHeight: "100vh",
      background: "#f3f8f5",
      padding: "35px 16px",
      fontFamily: "Arial, sans-serif"
    }}>
      <div style={{
        maxWidth: "600px",
        margin: "auto",
        background: "white",
        padding: "28px",
        borderRadius: "16px",
        boxShadow: "0 5px 25px rgba(0,0,0,0.05)"
      }}>
        <h1 style={{ color: "#087b49" }}>
          Become a SellSmart AI Seller
        </h1>

        <p>
          Create your seller account and set up your online store.
        </p>

        {message && (
          <div style={{
            background: "#e8f6ed",
            color: "#087b49",
            padding: "15px",
            borderRadius: "8px",
            marginBottom: "18px"
          }}>
            {message}
          </div>
        )}

        {error && (
          <div style={{
            background: "#fff0f0",
            color: "#b42318",
            padding: "15px",
            borderRadius: "8px",
            marginBottom: "18px"
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label>Seller type</label>
          <select
            name="sellerType"
            value={form.sellerType}
            onChange={update}
            style={field}
            required
          >
            <option value="individual">Individual seller</option>
            <option value="business">Registered business</option>
          </select>

          <label>Full name</label>
          <input
            name="fullName"
            value={form.fullName}
            onChange={update}
            placeholder="Enter your full name"
            style={field}
            required
          />

          <label>Email address</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={update}
            placeholder="Enter your email"
            style={field}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={update}
            placeholder="At least 8 characters"
            style={field}
            minLength={8}
            required
          />

          <label>Confirm password</label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={update}
            placeholder="Enter your password again"
            style={field}
            required
          />

          <label>Country</label>
          <select
            name="country"
            value={form.country}
            onChange={update}
            style={field}
            required
          >
            {countries.map(country => (
              <option key={country.code} value={country.code}>
                {country.name} ({country.dial})
              </option>
            ))}
          </select>

          <label>Phone number</label>
          <div style={{
            display: "flex",
            gap: "8px",
            alignItems: "center"
          }}>
            <div style={{
              padding: "13px",
              border: "1px solid #cbd5ce",
              borderRadius: "8px",
              background: "#f7faf8"
            }}>
              {countries.find(c => c.code === form.country)?.dial}
            </div>

            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={update}
              placeholder="Your phone number"
              style={{ ...field, flex: 1, minWidth: 0 }}
              required
            />
          </div>

          <label>Store name</label>
          <input
            name="storeName"
            value={form.storeName}
            onChange={update}
            placeholder="Example: Luke Fashion Store"
            style={field}
            required
          />

          <label>Product category</label>
          <select
            name="category"
            value={form.category}
            onChange={update}
            style={field}
            required
          >
            <option value="">Choose a category</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <label>About your store</label>
          <textarea
            name="description"
            value={form.description}
            onChange={update}
            placeholder="Tell customers about your products"
            rows={4}
            style={field}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "15px",
              background: loading ? "#7aa995" : "#087b49",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            {loading ? "Creating your account..." : "Create seller account"}
          </button>
        </form>
      </div>
    </main>
  );
  }
