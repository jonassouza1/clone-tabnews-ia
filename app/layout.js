import "./globals.css";

export const metadata = {
  title: "Jonas e jogos retrô",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
