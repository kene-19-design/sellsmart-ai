import Link from "next/link";

const products = [
  { name: "Wireless Headphones", price: "₦42,000", emoji: "🎧" },
  { name: "Fashion Sneakers", price: "₦28,500", emoji: "👟" },
  { name: "Ladies Handbag", price: "₦36,000", emoji: "👜" },
  { name: "Kitchen Blender", price: "₦51,500", emoji: "🥤" }
];

export default function Home() {
  return (
    <main style={{
      fontFamily: "Arial, sans-serif",
      color: "#18352a",
      background: "#f7fbf8",
      minHeight: "100vh"
    }}>
      <header style={{
        padding: "22px",
        background: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h2>Sellsmart <span style={{color: "#07834f"}}>AI</span></h2>
        <Link href="/seller/register">Become a Seller</Link>
      </header>

      <section style={{
        padding: "65px 22px",
        textAlign: "center",
        background: "#e8f6ed"
      }}>
        <h1 style={{fontSize: "42px"}}>
          Welcome to Sellsmart AI
        </h1>
        <p>Shop smarter. Sell better. Grow together.</p>
        <Link href="#products">Explore Products</Link>
      </section>

      <section id="products" style={{padding: "35px 20px"}}>
        <h2>Featured Products</h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(145px, 1fr))",
          gap: "15px"
        }}>
          {products.map((product) => (
            <article key={product.name} style={{
              background: "white",
              padding: "20px",
              borderRadius: "12px",
              textAlign: "center"
            }}>
              <div style={{fontSize: "45px"}}>{product.emoji}</div>
              <h3>{product.name}</h3>
              <strong>{product.price}</strong>
            </article>
          ))}
        </div>
      </section>

      <footer style={{
        padding: "25px",
        textAlign: "center",
        background: "#18352a",
        color: "white"
      }}>
        © 2026 Sellsmart AI. All rights reserved.
      </footer>
    </main>
  );
  }
