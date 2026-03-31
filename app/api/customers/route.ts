export async function GET() {
  await new Promise((res) => setTimeout(res, 700));

  return Response.json({
    customers: [
      {
        name: "Nordic Solutions",
        segment: "Enterprise",
        company: "nordic.io",
        spend: "184 000 Kč",
        status: "Aktivní",
      },
      {
        name: "BluePeak Agency",
        segment: "Agency",
        company: "bluepeak.dev",
        spend: "92 000 Kč",
        status: "Aktivní",
      },
      {
        name: "Vertex Labs",
        segment: "Startup",
        company: "vertexlabs.ai",
        spend: "61 000 Kč",
        status: "Aktivní",
      },
      {
        name: "CoreData Systems",
        segment: "B2B",
        company: "coredata.cloud",
        spend: "248 000 Kč",
        status: "VIP",
      },
      {
        name: "NovaTech Group",
        segment: "Enterprise",
        company: "novatech.io",
        spend: "132 000 Kč",
        status: "Aktivní",
      },
    ],
  });
}