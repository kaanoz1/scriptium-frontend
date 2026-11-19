import Link from "next/link";

//TODO: Revise.

export default function NotFound() {
  return (
    <html lang="en">
      <body
        style={{
          display: "grid",
          placeItems: "center",
          minHeight: "100vh",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1>404</h1>
          <p>Page not found.</p>
          <Link href="/en">Go home</Link>
        </div>
      </body>
    </html>
  );
}
