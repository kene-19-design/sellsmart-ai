import Link from "next/link";

const products = [
  {
    name: "Wireless Headphones",
    price: "₦42,000",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700",
    tag: "Best Seller"
  },
  {
    name: "Fashion Sneakers",
    price: "₦28,500",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700",
    tag: "Trending"
  },
  {
    name: "Ladies Handbag",
    price: "₦36,000",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=700",
    tag: "Popular"
  },
  {
    name: "Kitchen Blender",
    price: "₦51,500",
    image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=700",
    tag: "Top Pick"
  }
];

export default function Home() {
  return (
    <main style={styles.page}>

      {/* Navigation */}
      <header style={styles.header}>
        <Link href="/" style={styles.logo}>
          SellSmart <span>AI</span>
        </Link>

        <nav style={styles.nav}>
          <Link href="/" style={styles.navLink}>Home</Link>
          <Link href="/login" style={styles.navLink}>Log In</Link>
          <Link href="/signup" style={styles.navLink}>Sign Up</Link>
          <Link href="/privacy-policy" style={styles.navLink}>Privacy</Link>
          <Link href="/terms" style={styles.navLink}>Terms</Link>
          <Link href="/seller/register" style={styles.sellerButton}>
            Become a Seller
          </Link>
        </nav>
      </header>

      {/* Hero section */}
      <section style={styles.hero}>
        <div style={styles.heroText}>
          <span style={styles.eyebrow}>
            YOUR SMARTER SHOPPING EXPERIENCE
          </span>

          <h1 style={styles.heading}>
            Discover More.
            <br />
            Shop <span>Smarter.</span>
            <br />
            Live Better.
          </h1>

          <p style={styles.description}>
            Explore amazing products, discover trusted sellers
            and enjoy a smarter way to shop with SellSmart AI.
          </p>

          <div style={styles.heroButtons}>
            <Link href="#products" style={styles.primaryButton}>
              Explore Products →
            </Link>

            <Link href="/signup" style={styles.secondaryButton}>
              Create an Account
            </Link>
          </div>

          <p style={styles.smallText}>
            A smarter marketplace for everyone.
          </p>
        </div>

        <div style={styles.heroImage}>
          <img
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200"
            alt="Customer shopping online"
            style={styles.heroPhoto}
          />

          <div style={styles.floatingCard}>
            <strong>Shop with confidence</strong>
            <p>Discover products you love.</p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section style={styles.benefits}>
        <div>🛡️ Secure Shopping</div>
        <div>🚚 Convenient Delivery</div>
        <div>💚 Trusted Sellers</div>
        <div>✨ Smarter Discovery</div>
      </section>

      {/* Products */}
      <section id="products" style={styles.productsSection}>
        <div style={styles.sectionHeading}>
          <span style={styles.eyebrow}>EXPLORE OUR MARKETPLACE</span>
          <h2>Featured Products</h2>
          <p>Find something special for every part of your life.</p>
        </div>

        <div style={styles.productGrid}>
          {products.map((product) => (
            <article key={product.name} style={styles.productCard}>
              <div style={styles.productImageBox}>
                <span style={styles.productTag}>{product.tag}</span>
                <img
                  src={product.image}
                  alt={product.name}
                  style={styles.productImage}
                />
              </div>

              <div style={styles.productDetails}>
                <h3>{product.name}</h3>
                <strong style={styles.price}>{product.price}</strong>

                <Link href="/signup" style={styles.cartButton}>
                  Explore Product →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Seller invitation */}
      <section style={styles.sellerSection}>
        <div>
          <span style={styles.eyebrow}>GROW WITH US</span>
          <h2>Have products to sell?</h2>
          <p>
            Bring your business to SellSmart AI.
            Create your store and connect with more customers.
          </p>
        </div>

        <Link href="/seller/register" style={styles.sellerButton}>
          Open Your Store →
        </Link>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div>
          <h2>SellSmart <span>AI</span></h2>
          <p>Shop Smart. Sell Better.</p>
        </div>

        <div>
          <strong>Quick Links</strong>
          <p><Link href="/">Home</Link></p>
          <p><Link href="/login">Log In</Link></p>
          <p><Link href="/signup">Sign Up</Link></p>
        </div>

        <div>
          <strong>Legal</strong>
          <p><Link href="/privacy-policy">Privacy Policy</Link></p>
          <p><Link href="/terms">Terms and Conditions</Link></p>
        </div>

        <p style={styles.copyright}>
          © 2026 SellSmart AI. All rights reserved.
        </p>
      </footer>
    </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    fontFamily: "Arial, sans-serif",
    background: "#f7fbf5",
    color: "#183b2b",
    minHeight: "100vh"
  },

  header: {
    padding: "18px 5%",
    background: "#ffffff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "18px",
    boxShadow: "0 3px 15px rgba(0,0,0,0.04)"
  },

  logo: {
    fontSize: "25px",
    fontWeight: "bold",
    color: "#164c32",
    textDecoration: "none"
  },

  nav: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "17px"
  },

  navLink: {
    textDecoration: "none",
    color: "#234b37",
    fontWeight: "bold",
    fontSize: "13px"
  },

  sellerButton: {
    background: "#07834f",
    color: "white",
    padding: "13px 19px",
    borderRadius: "25px",
    textDecoration: "none",
    fontWeight: "bold",
    display: "inline-block"
  },

  hero: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "35px",
    alignItems: "center",
    padding: "65px 6%",
    background: "linear-gradient(120deg, #e3f8e9, #fff5df, #e7f7e9)"
  },

  heroText: {
    padding: "15px 0"
  },

  eyebrow: {
    color: "#07834f",
    fontWeight: "bold",
    fontSize: "12px",
    letterSpacing: "2px"
  },

  heading: {
    fontSize: "clamp(38px, 6vw, 62px)",
    lineHeight: 1.12,
    margin: "20px 0",
    color: "#17432e"
  },

  description: {
    fontSize: "17px",
    lineHeight: 1.8,
    color: "#526c5b",
    maxWidth: "480px"
  },

  heroButtons: {
    display: "flex",
    flexWrap: "wrap",
    gap: "13px",
    marginTop: "28px"
  },

  primaryButton: {
    background: "#07834f",
    color: "white",
    padding: "15px 23px",
    borderRadius: "30px",
    textDecoration: "none",
    fontWeight: "bold"
  },

  secondaryButton: {
    background: "white",
    color: "#07834f",
    padding: "15px 23px",
    borderRadius: "30px",
    textDecoration: "none",
    fontWeight: "bold",
    border: "1px solid #07834f"
  },

  smallText: {
    color: "#718778",
    fontSize: "13px",
    marginTop: "22px"
  },

  heroImage: {
    position: "relative",
    borderRadius: "28px",
    overflow: "hidden",
    minHeight: "320px",
    boxShadow: "0 18px 45px rgba(20,80,45,0.15)"
  },

  heroPhoto: {
    width: "100%",
    height: "380px",
    objectFit: "cover",
    display: "block"
  },

  floatingCard: {
    position: "absolute",
    bottom: "18px",
    left: "18px",
    background: "white",
    padding: "15px 20px",
    borderRadius: "15px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.12)"
  },

  benefits: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    gap: "20px",
    padding: "25px 5%",
    background: "#ffffff",
    color: "#17603d",
    fontWeight: "bold",
    textAlign: "center"
  },

  productsSection: {
    padding: "65px 5%"
  },

  sectionHeading: {
    textAlign: "center",
    marginBottom: "35px"
  },

  productGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "22px"
  },

  productCard: {
    background: "white",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 6px 25px rgba(25,70,40,0.08)"
  },

  productImageBox: {
    height: "220px",
    position: "relative",
    background: "#f1f5ee"
  },

  productImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },

  productTag: {
    position: "absolute",
    top: "13px",
    left: "13px",
    background: "#07834f",
    color: "white",
    padding: "7px 12px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: "bold",
    zIndex: 1
  },

  productDetails: {
    padding: "18px"
  },

  price: {
    display: "block",
    color: "#07834f",
    fontSize: "19px",
    margin: "12px 0"
  },

  cartButton: {
    display: "block",
    textAlign: "center",
    background: "#e7f6eb",
    color: "#087345",
    padding: "12px",
    borderRadius: "25px",
    textDecoration: "none",
    fontWeight: "bold"
  },

  sellerSection: {
    margin: "20px 5% 60px",
    padding: "40px",
    borderRadius: "25px",
    background: "linear-gradient(120deg, #dff5e5, #fff0d9)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "20px"
  },

  footer: {
    background: "#123d2a",
    color: "white",
    padding: "45px 6%",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "30px"
  },

  copyright: {
    width: "100%",
    textAlign: "center",
    borderTop: "1px solid #41644f",
    paddingTop: "20px",
    fontSize: "13px"
  }
};
