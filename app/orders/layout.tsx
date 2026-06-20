import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Objednávky",
};

export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
