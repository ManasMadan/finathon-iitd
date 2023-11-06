import "./globals.css";

export const metadata = {
  title: "Wealth Builder Game",
  description: "Wealth Builder Game",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
}
