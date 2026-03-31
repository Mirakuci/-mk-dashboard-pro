export async function GET() {
  await new Promise((res) => setTimeout(res, 800));

  return Response.json({
    stats: [
      { label: "MRR", value: "428 900 Kč", change: "+8.1 %", positive: true },
      { label: "Aktivní uživatelé", value: "2 481", change: "+12.4 %", positive: true },
      { label: "Objednávky", value: "312", change: "+5.7 %", positive: true },
      { label: "Konverze", value: "3.84 %", change: "-0.3 %", positive: false },
    ],
  });
}