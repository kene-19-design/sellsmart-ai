"use client";

import { useState } from "react";

export default function SellerRegister() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
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
        borderRadius: "16px"
      }}>
        <h1 style={{ color: "#087b49" }}>Become a Sellsmart AI Seller</h1>
        <p>Register your business or individual store with us.</p>

        {submitted ? (
          <div style={{
            background: "#e8f6ed",
            padding: "18px",
            borderRadius: "10px"
          }}>
            <h2>Registration form completed!</h2>
            <p>
              This is a demonstration only. Your information has not
              yet been saved. We will connect the form to the database
              and approval system in the next step.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>Seller type</label>
            <select required name="sellerType" style={field}>
              <option value="">Choose seller type</option>
              <option value="individual">Individual seller</option>
              <option value="business">Registered business</option>
            </select>

            <label>Full name</label>
            <input required name="fullName" placeholder="Your full name" style={field} />

            <label>Email address</label>
            <input required type="email" name="email" placeholder="Your email" style={field} />

            <label>Phone number</label>
            <input required type="tel" name="phone" placeholder="Your phone number" style={field} />

            <label>Store name</label>
            <input required name="storeName" placeholder="Example: Luke Fashion Store" style={field} />

            <label>Product category</label>
            <select required name="category" style={field}>
              <option value="">Choose a category</option>
              <option>Fashion</option>
              <option>Electronics</option>
              <option>Beauty and personal care</option>
              <option>Home and kitchen</option>
              <option>Food and groceries</option>
              <option>Other</option>
            </select>

            <label>About your store</label>
            <textarea
              name="description"
              placeholder="Tell customers what you sell"
              rows={4}
              style={field}
            />

            <button type="submit" style={buttonStyle}>
              Submit seller registration
            </button>
          </form>
        )}
      </div>
    </main>
  );
}

const field: React.CSSProperties = {
  display: "block",
  width: "100%",
  padding: "13px",
  margin: "8px 0 18px",
  border: "1px solid #cbd5ce",
  borderRadius: "8px",
  boxSizing: "border-box",
  fontSize: "15px"
};

const buttonStyle: React.CSSProperties = {
  width: "100%",
  padding: "15px",
  background: "#087b49",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer"
};
