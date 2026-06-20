import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Produkty",
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
