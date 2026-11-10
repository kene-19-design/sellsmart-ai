"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Store = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  category: string | null;
  status: string;
  published: boolean;
};

type Product = {
  id: string;
  name: string;
  price_ngn: number;
  stock: number;
  status: string;
  image_url: string | null;
};

export default function SellerDashboard() {
  const router = useRouter();

  const [store, setStore] = useState<Store | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadDashboard() {
      setLoading(true);
      setError("");

      try {
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError) throw authError;

        if (!user) {
          router.replace("/login");
          return;
        }

        const { data: storeData, error: storeError } =
          await supabase
            .from("stores")
            .select(
              "id, name, slug, description, category, status, published"
            )
            .eq("owner_id", user.id)
            .maybeSingle();

        if (storeError) throw storeError;

        if (!storeData) {
          if (active) {
            setError(
              "We could not find a store linked to your account. Please contact support."
            );
          }
          return;
        }

        const { data: productData, error: productError } =
          await supabase
            .from("products")
            .select(
              "id, name, price_ngn, stock, status, image_url"
            )
            .eq("store_id", storeData.id)
            .order("created_at", { ascending: false });

        if (productError) throw productError;

        if (active) {
          setStore(storeData as Store);
          setProducts((productData || []) as Product[]);
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load your dashboard. Please try again."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadDashboard();

    return () => {
      active = false;
    };
  }, [router]);

  async function handleSignOut() {
    setSigningOut(true);

    const { error } = await supabase.auth.signOut();

    if (error) {
      setError(error.message);
      setSigningOut(false);
      return;
    }

    router.replace("/login");
    router.refresh();
  }

  const totalStock = products.reduce(
    (total, product) => total + (product.stock || 0),
    0
  );

  const lowStock = products.filter(
    (product) => product.stock <= 5
  ).length;

  const money = (amount: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount || 0);

  if (loading) {
    return (
      <main style={styles.center}>
        <div style={styles.loadingCard}>
          <h2>SellSmart AI</h2>
          <p>Loading your seller dashboard...</p>
        </div>
      </main>
    );
  }

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <a href="/" style={styles.logo}>
          SellSmart <span style={{ color: "#10b981" }}>AI</span>
        </a>

        <button
          onClick={handleSignOut}
          disabled={signingOut}
          style={styles.logout}
        >
          {signingOut ? "Signing out..." : "Sign Out"}
        </button>
      </header>

      <div style={styles.container}>
        <section style={styles.welcome}>
          <div>
            <span style={styles.eyebrow}>SELLER CENTRE</span>
            <h1>Welcome to your dashboard</h1>
            <p>
              Manage your store and keep track of your products.
            </p>
          </div>

          <div style={styles.storeIcon}>🏪</div>
        </section>

        {error ? (
          <div style={styles.error}>
            <strong>Dashboard notice</strong>
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              style={styles.retry}
            >
              Try Again
            </button>
          </div>
        ) : store ? (
          <>
            <section style={styles.storeCard}>
              <div>
                <span style={styles.eyebrow}>YOUR STORE</span>
                <h2>{store.name}</h2>
                <p>{store.description || "Welcome to your store."}</p>
                <p style={styles.category}>
                  Category: {store.category || "Not specified"}
                </p>
              </div>

              <div style={styles.statusArea}>
                <span
                  style={{
                    ...styles.status,
                    background: store.published
                      ? "#dcfce7"
                      : "#fef3c7",
                    color: store.published
                      ? "#166534"
                      : "#92400e",
                  }}
                >
                  {store.published ? "Published" : "Not published"}
                </span>
                <small>Store status: {store.status}</small>
              </div>
            </section>

            <section style={styles.stats}>
              <div style={styles.statCard}>
                <span>Total Products</span>
                <strong>{products.length}</strong>
              </div>

              <div style={styles.statCard}>
                <span>Total Stock</span>
                <strong>{totalStock}</strong>
              </div>

              <div style={styles.statCard}>
                <span>Low Stock Items</span>
                <strong>{lowStock}</strong>
              </div>
            </section>

            <section style={styles.products}>
              <div style={styles.sectionHeading}>
                <div>
                  <h2>Your Products</h2>
                  <p>Products currently saved in your store.</p>
                </div>
              </div>

              {products.length === 0 ? (
                <div style={styles.empty}>
                  <div style={{ fontSize: "40px" }}>📦</div>
                  <h3>No products yet</h3>
                  <p>
                    Your store is ready. Your products will
                    appear here when you add them.
                  </p>
                </div>
              ) : (
                <div style={styles.productList}>
                  {products.map((product) => (
                    <article
                      key={product.id}
                      style={styles.productCard}
                    >
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.name}
                          style={styles.productImage}
                        />
                      ) : (
                        <div style={styles.noImage}>📦</div>
                      )}

                      <div style={{ flex: 1 }}>
                        <h3>{product.name}</h3>
                        <strong style={styles.price}>
                          {money(product.price_ngn)}
                        </strong>
                        <p style={styles.stock}>
                          Stock: {product.stock}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>

            <section style={styles.nextStep}>
              <h2>Your store is ready for growth.</h2>
              <p>
                Product creation, order management, payments
                and store customisation are the next features
                we will add.
              </p>
            </section>
          </>
        ) : null}
      </div>
    </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    minHeight: "100vh",
    background: "#f4f8f5",
    color: "#173b2b",
    fontFamily: "Arial, sans-serif",
  },
  center: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f8f5",
    fontFamily: "Arial, sans-serif",
    padding: 20,
  },
  loadingCard: {
    background: "white",
    padding: 30,
    borderRadius: 16,
    textAlign: "center",
  },
  header: {
    background: "white",
    padding: "17px 5%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
  },
  logo: {
    fontSize: 23,
    fontWeight: 800,
    color: "#087b49",
    textDecoration: "none",
  },
  logout: {
    background: "#fff",
    color: "#087b49",
    border: "1px solid #087b49",
    borderRadius: 9,
    padding: "10px 17px",
    fontWeight: 700,
    cursor: "pointer",
  },
  container: {
    maxWidth: 1100,
    margin: "auto",
    padding: "30px 18px 60px",
  },
  welcome: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 20,
    padding: "30px",
    borderRadius: 20,
    background: "linear-gradient(120deg, #dff7e8, #fff3df)",
    marginBottom: 24,
  },
  eyebrow: {
    color: "#07834f",
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: 2,
  },
  storeIcon: {
    fontSize: 55,
    background: "white",
    padding: 15,
    borderRadius: 18,
  },
  storeCard: {
    background: "white",
    borderRadius: 16,
    padding: 24,
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 15,
    boxShadow: "0 4px 18px rgba(0,0,0,0.04)",
  },
  statusArea: {
    display: "flex",
    flexDirection: "column",
    gap: 9,
    alignItems: "flex-start",
  },
  status: {
    padding: "8px 13px",
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 700,
  },
  category: {
    color: "#64748b",
    fontSize: 13,
  },
  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 16,
    margin: "22px 0",
  },
  statCard: {
    background: "white",
    padding: 22,
    borderRadius: 15,
    display: "flex",
    flexDirection: "column",
    gap: 12,
    boxShadow: "0 4px 18px rgba(0,0,0,0.04)",
  },
  products: {
    background: "white",
    padding: 24,
    borderRadius: 16,
    marginTop: 22,
  },
  sectionHeading: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  empty: {
    textAlign: "center",
    background: "#f7faf8",
    borderRadius: 13,
    padding: "35px 20px",
    color: "#64748b",
  },
  productList: {
    display: "grid",
    gap: 13,
  },
  productCard: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    border: "1px solid #e5eee8",
    borderRadius: 12,
    padding: 12,
  },
  productImage: {
    width: 75,
    height: 75,
    borderRadius: 10,
    objectFit: "cover",
  },
  noImage: {
    width: 75,
    height: 75,
    display: "grid",
    placeItems: "center",
    background: "#eef5ef",
    borderRadius: 10,
    fontSize: 25,
  },
  price: {
    color: "#07834f",
  },
  stock: {
    color: "#64748b",
    fontSize: 13,
  },
  nextStep: {
    marginTop: 22,
    background: "#e6f5eb",
    padding: 24,
    borderRadius: 15,
  },
  error: {
    background: "#fff1f0",
    color: "#a32121",
    padding: 20,
    borderRadius: 12,
  },
  retry: {
    background: "#087b49",
    color: "white",
    border: 0,
    padding: "10px 18px",
    borderRadius: 8,
  },
};
