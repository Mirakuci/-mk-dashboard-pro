export async function GET() {
  await new Promise((res) => setTimeout(res, 700));

  return Response.json({
    products: [
      { name: "Dashboard licence", category: "SaaS", price: "9 900 Kč", stock: "Aktivní" },
      { name: "Reporting modul", category: "Addon", price: "4 900 Kč", stock: "Aktivní" },
      { name: "API integrace", category: "Custom", price: "12 900 Kč", stock: "Na objednávku" },
      { name: "Custom analytics", category: "Enterprise", price: "15 900 Kč", stock: "Aktivní" },
    ],
  });
}
