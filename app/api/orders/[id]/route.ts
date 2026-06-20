const orders = [
  {
    id: "1048",
    customer: "Nordic Solutions",
    email: "billing@nordic.io",
    status: "Zaplaceno",
    amount: "8 490 Kč",
    date: "2026-06-18",
    items: [
      { name: "Dashboard licence", qty: 1, price: "4 990 Kč" },
      { name: "Reporting modul", qty: 1, price: "3 500 Kč" },
    ],
  },
  {
    id: "1047",
    customer: "BluePeak Agency",
    email: "info@bluepeak.dev",
    status: "Čeká",
    amount: "3 290 Kč",
    date: "2026-06-17",
    items: [{ name: "API integrace", qty: 1, price: "3 290 Kč" }],
  },
  {
    id: "1046",
    customer: "Vertex Labs",
    email: "ops@vertexlabs.ai",
    status: "Zaplaceno",
    amount: "12 900 Kč",
    date: "2026-06-16",
    items: [
      { name: "Custom analytics", qty: 1, price: "8 900 Kč" },
      { name: "Reporting modul", qty: 1, price: "4 000 Kč" },
    ],
  },
  {
    id: "1045",
    customer: "CoreData Systems",
    email: "finance@coredata.cloud",
    status: "Storno",
    amount: "1 490 Kč",
    date: "2026-06-15",
    items: [{ name: "Dashboard licence", qty: 1, price: "1 490 Kč" }],
  },
  {
    id: "1044",
    customer: "NovaTech Group",
    email: "orders@novatech.io",
    status: "Zaplaceno",
    amount: "6 900 Kč",
    date: "2026-06-14",
    items: [{ name: "Custom analytics", qty: 1, price: "6 900 Kč" }],
  },
  {
    id: "1043",
    customer: "Orbit Solutions",
    email: "hello@orbit.cz",
    status: "Čeká",
    amount: "2 490 Kč",
    date: "2026-06-13",
    items: [{ name: "Reporting modul", qty: 1, price: "2 490 Kč" }],
  },
];

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const order = orders.find((o) => o.id === id);

  if (!order) {
    return Response.json({ error: "Objednávka nenalezena" }, { status: 404 });
  }

  await new Promise((res) => setTimeout(res, 400));
  return Response.json({ order });
}
