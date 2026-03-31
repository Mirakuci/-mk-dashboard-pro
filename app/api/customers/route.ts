export async function GET() {
  await new Promise((res) => setTimeout(res, 700));

  return Response.json({
    customers: [
      {
        name: "David Figar",
        segment: "VIP klient",
        company: "figar.cz",
        spend: "84 000 Kč",
        status: "Aktivní",
      },
      {
        name: "Auto Care Zlín",
        segment: "B2B",
        company: "autocarezlin.cz",
        spend: "142 000 Kč",
        status: "Aktivní",
      },
      {
        name: "MK Studio",
        segment: "Interní",
        company: "mkdigital.cz",
        spend: "21 900 Kč",
        status: "Interní",
      },
      {
        name: "Jan K.",
        segment: "Retail",
        company: "—",
        spend: "7 400 Kč",
        status: "Lead",
      },
    ],
  });
}
